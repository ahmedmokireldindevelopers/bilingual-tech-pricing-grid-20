[CmdletBinding()]
param(
    [string]$RepoName,
    [string]$Owner,
    [ValidateSet("public", "private")]
    [string]$Visibility = "private",
    [string]$Description = "",
    [string]$CommitMessage = "Initial commit",
    [switch]$ReplaceOrigin,
    [switch]$UseExistingRemote,
    [switch]$DryRun,
    [switch]$NoPrompt
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Step {
    param([string]$Message)

    Write-Host "==> $Message" -ForegroundColor Cyan
}

function Write-Note {
    param([string]$Message)

    Write-Host "    $Message" -ForegroundColor DarkGray
}

function Test-CommandAvailable {
    param([string]$Name)

    return $null -ne (Get-Command $Name -ErrorAction SilentlyContinue)
}

function Format-CommandDisplay {
    param(
        [string]$FilePath,
        [string[]]$Arguments
    )

    $escapedArguments = foreach ($argument in $Arguments) {
        if ($argument -match "\s") {
            '"' + $argument.Replace('"', '\"') + '"'
        }
        else {
            $argument
        }
    }

    return ((@($FilePath) + $escapedArguments) -join " ").Trim()
}

function Get-CommandOutput {
    param(
        [string]$FilePath,
        [string[]]$Arguments,
        [switch]$IgnoreErrors
    )

    $output = & $FilePath @Arguments 2>&1
    $exitCode = $LASTEXITCODE

    if ($exitCode -ne 0 -and -not $IgnoreErrors) {
        $message = ($output -join [Environment]::NewLine).Trim()
        throw "Command failed ($exitCode): $(Format-CommandDisplay -FilePath $FilePath -Arguments $Arguments)`n$message"
    }

    return ($output -join [Environment]::NewLine).Trim()
}

function Test-CommandSuccess {
    param(
        [string]$FilePath,
        [string[]]$Arguments
    )

    & $FilePath @Arguments *> $null
    return $LASTEXITCODE -eq 0
}

function Invoke-WriteCommand {
    param(
        [string]$FilePath,
        [string[]]$Arguments
    )

    $display = Format-CommandDisplay -FilePath $FilePath -Arguments $Arguments

    if ($DryRun) {
        Write-Host "[dry-run] $display" -ForegroundColor Yellow
        return
    }

    & $FilePath @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed ($LASTEXITCODE): $display"
    }
}

function Prompt-WithDefault {
    param(
        [string]$Prompt,
        [string]$DefaultValue
    )

    if ($NoPrompt) {
        return $DefaultValue
    }

    $value = Read-Host "$Prompt [$DefaultValue]"
    if ([string]::IsNullOrWhiteSpace($value)) {
        return $DefaultValue
    }

    return $value.Trim()
}

function Ensure-GitIgnore {
    if (Test-Path ".gitignore") {
        return
    }

    Write-Step "Creating a default .gitignore"

    if ($DryRun) {
        Write-Host "[dry-run] create .gitignore" -ForegroundColor Yellow
        return
    }

    @"
# Dependencies
node_modules/

# Build output
dist/
dist-ssr/

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# Environment files
.env
.env.*
!.env.example

# Editor and OS files
.DS_Store
Thumbs.db
.idea/
.vscode/
"@ | Set-Content -Path ".gitignore" -Encoding ascii
}

function Ensure-GitIdentity {
    $userName = Get-CommandOutput -FilePath "git" -Arguments @("config", "--get", "user.name") -IgnoreErrors
    if ([string]::IsNullOrWhiteSpace($userName)) {
        if ($NoPrompt) {
            throw "Git user.name is not configured. Run: git config --global user.name `"Your Name`""
        }

        $userName = Read-Host "Git author name"
        if ([string]::IsNullOrWhiteSpace($userName)) {
            throw "Git author name is required."
        }

        Invoke-WriteCommand -FilePath "git" -Arguments @("config", "user.name", $userName.Trim())
    }

    $userEmail = Get-CommandOutput -FilePath "git" -Arguments @("config", "--get", "user.email") -IgnoreErrors
    if ([string]::IsNullOrWhiteSpace($userEmail)) {
        if ($NoPrompt) {
            throw "Git user.email is not configured. Run: git config --global user.email `"you@example.com`""
        }

        $userEmail = Read-Host "Git author email"
        if ([string]::IsNullOrWhiteSpace($userEmail)) {
            throw "Git author email is required."
        }

        Invoke-WriteCommand -FilePath "git" -Arguments @("config", "user.email", $userEmail.Trim())
    }
}

function Get-CurrentBranch {
    $branch = Get-CommandOutput -FilePath "git" -Arguments @("branch", "--show-current") -IgnoreErrors
    if (-not [string]::IsNullOrWhiteSpace($branch)) {
        return $branch.Trim()
    }

    return "main"
}

function Get-RemoteNames {
    $output = Get-CommandOutput -FilePath "git" -Arguments @("remote") -IgnoreErrors
    if ([string]::IsNullOrWhiteSpace($output)) {
        return @()
    }

    return $output -split "\r?\n" | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
}

function Get-UniqueRemoteName {
    param([string]$BaseName)

    $existingNames = Get-RemoteNames
    $candidate = $BaseName
    $index = 1

    while ($existingNames -contains $candidate) {
        $candidate = "$BaseName-$index"
        $index++
    }

    return $candidate
}

function Ensure-GitRepository {
    $isGitRepo = (Get-CommandOutput -FilePath "git" -Arguments @("rev-parse", "--is-inside-work-tree") -IgnoreErrors) -eq "true"
    if ($isGitRepo) {
        return
    }

    Write-Step "Initializing a Git repository"
    Invoke-WriteCommand -FilePath "git" -Arguments @("init", "-b", "main")
}

function Ensure-Commit {
    Ensure-GitIgnore

    $hasHead = Test-CommandSuccess -FilePath "git" -Arguments @("rev-parse", "--verify", "HEAD")
    $status = Get-CommandOutput -FilePath "git" -Arguments @("status", "--porcelain") -IgnoreErrors
    $hasChanges = -not [string]::IsNullOrWhiteSpace($status)

    if (-not $hasHead -or $hasChanges) {
        Ensure-GitIdentity

        Write-Step "Staging project files"
        Invoke-WriteCommand -FilePath "git" -Arguments @("add", "-A")

        Write-Step "Creating commit"
        Invoke-WriteCommand -FilePath "git" -Arguments @("commit", "-m", $CommitMessage)
        return
    }

    Write-Note "No uncommitted changes found."
}

function Ensure-GitHubCli {
    if (Test-CommandAvailable -Name "gh") {
        return
    }

    throw "GitHub CLI is required to create a repository. Install it from https://cli.github.com/ and run the script again."
}

function Ensure-GitHubAuth {
    if ($DryRun) {
        Write-Host "[dry-run] gh auth status" -ForegroundColor Yellow
        return
    }

    if (Test-CommandSuccess -FilePath "gh" -Arguments @("auth", "status")) {
        return
    }

    if ($NoPrompt) {
        throw "GitHub CLI is not authenticated. Run: gh auth login"
    }

    Write-Step "Starting GitHub CLI login"
    Invoke-WriteCommand -FilePath "gh" -Arguments @("auth", "login")
}

function New-GitHubRepository {
    param(
        [string]$RepositoryName,
        [string]$RepositoryOwner,
        [string]$RepositoryVisibility,
        [string]$RepositoryDescription,
        [string]$ExistingOriginUrl
    )

    Ensure-GitHubCli
    Ensure-GitHubAuth

    if (-not [string]::IsNullOrWhiteSpace($ExistingOriginUrl)) {
        $backupRemoteName = Get-UniqueRemoteName -BaseName "origin-backup"
        Write-Step "Renaming existing origin remote to $backupRemoteName"
        Invoke-WriteCommand -FilePath "git" -Arguments @("remote", "rename", "origin", $backupRemoteName)
    }

    $targetRepo = $RepositoryName
    if (-not [string]::IsNullOrWhiteSpace($RepositoryOwner)) {
        $targetRepo = "$RepositoryOwner/$RepositoryName"
    }

    $arguments = @("repo", "create", $targetRepo, "--$RepositoryVisibility", "--source", ".", "--remote", "origin")
    if (-not [string]::IsNullOrWhiteSpace($RepositoryDescription)) {
        $arguments += @("--description", $RepositoryDescription)
    }

    Write-Step "Creating GitHub repository $targetRepo"
    Invoke-WriteCommand -FilePath "gh" -Arguments $arguments
}

if ($ReplaceOrigin -and $UseExistingRemote) {
    throw "Use either -ReplaceOrigin or -UseExistingRemote, not both."
}

if (-not (Test-CommandAvailable -Name "git")) {
    throw "Git is required. Install Git and run the script again."
}

$projectRoot = Get-Location
$defaultRepoName = Split-Path -Leaf $projectRoot.Path

if ([string]::IsNullOrWhiteSpace($RepoName)) {
    $RepoName = Prompt-WithDefault -Prompt "GitHub repository name" -DefaultValue $defaultRepoName
}

Ensure-GitRepository

$branch = Get-CurrentBranch
$originUrl = Get-CommandOutput -FilePath "git" -Arguments @("remote", "get-url", "origin") -IgnoreErrors
$remoteAction = "Create"

if (-not [string]::IsNullOrWhiteSpace($originUrl)) {
    Write-Note "Existing origin remote: $originUrl"

    if ($UseExistingRemote) {
        $remoteAction = "UseExisting"
    }
    elseif ($ReplaceOrigin) {
        $remoteAction = "Replace"
    }
    elseif ($NoPrompt) {
        $remoteAction = "UseExisting"
    }
    else {
        $choice = Read-Host "Keep existing origin and push to it? Enter Y to keep, N to create a new GitHub repo"
        if ($choice -match "^(y|yes)$") {
            $remoteAction = "UseExisting"
        }
        else {
            $remoteAction = "Replace"
        }
    }
}

Ensure-Commit

switch ($remoteAction) {
    "UseExisting" {
        Write-Step "Using existing origin remote"
    }
    "Replace" {
        New-GitHubRepository -RepositoryName $RepoName -RepositoryOwner $Owner -RepositoryVisibility $Visibility -RepositoryDescription $Description -ExistingOriginUrl $originUrl
        $originUrl = Get-CommandOutput -FilePath "git" -Arguments @("remote", "get-url", "origin") -IgnoreErrors
    }
    default {
        New-GitHubRepository -RepositoryName $RepoName -RepositoryOwner $Owner -RepositoryVisibility $Visibility -RepositoryDescription $Description -ExistingOriginUrl $null
        $originUrl = Get-CommandOutput -FilePath "git" -Arguments @("remote", "get-url", "origin") -IgnoreErrors
    }
}

Write-Step "Pushing branch $branch to GitHub"
Invoke-WriteCommand -FilePath "git" -Arguments @("push", "--set-upstream", "origin", $branch)

Write-Host ""
Write-Host "GitHub upload workflow completed." -ForegroundColor Green
if (-not [string]::IsNullOrWhiteSpace($originUrl)) {
    Write-Host "Origin remote: $originUrl" -ForegroundColor Green
}
Write-Host "Branch: $branch" -ForegroundColor Green
