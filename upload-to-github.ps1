[CmdletBinding()]
param(
    [string]$RepoName,
    [string]$Owner,
    [string]$Token,
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

    throw "GitHub CLI is required for this path."
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

function Get-GitHubToken {
    if ($DryRun) {
        return "dry-run-token"
    }

    if (-not [string]::IsNullOrWhiteSpace($Token)) {
        return $Token.Trim()
    }

    if (-not [string]::IsNullOrWhiteSpace($env:GH_TOKEN)) {
        return $env:GH_TOKEN.Trim()
    }

    if (-not [string]::IsNullOrWhiteSpace($env:GITHUB_TOKEN)) {
        return $env:GITHUB_TOKEN.Trim()
    }

    if ($NoPrompt) {
        throw "A GitHub token is required. Pass -Token or set GH_TOKEN or GITHUB_TOKEN."
    }

    $secureToken = Read-Host "GitHub personal access token" -AsSecureString
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken)
    try {
        $plainToken = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
    }
    finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
    }

    if ([string]::IsNullOrWhiteSpace($plainToken)) {
        throw "A GitHub token is required."
    }

    return $plainToken.Trim()
}

function Get-GitHubHeaders {
    param([string]$AuthToken)

    return @{
        Accept                 = "application/vnd.github+json"
        Authorization          = "Bearer $AuthToken"
        "X-GitHub-Api-Version" = "2022-11-28"
        "User-Agent"           = "upload-to-github-script"
    }
}

function Invoke-GitHubApi {
    param(
        [string]$Method,
        [string]$Uri,
        [string]$AuthToken,
        [object]$Body
    )

    if ($DryRun) {
        Write-Host "[dry-run] $Method $Uri" -ForegroundColor Yellow
        return $null
    }

    $request = @{
        Method      = $Method
        Uri         = $Uri
        Headers     = Get-GitHubHeaders -AuthToken $AuthToken
        ErrorAction = "Stop"
    }

    if ($null -ne $Body) {
        $request.Body = ($Body | ConvertTo-Json -Depth 10)
        $request.ContentType = "application/json"
    }

    try {
        return Invoke-RestMethod @request
    }
    catch {
        $response = $_.Exception.Response
        if ($null -ne $response) {
            $reader = New-Object System.IO.StreamReader($response.GetResponseStream())
            $errorBody = $reader.ReadToEnd()
            $reader.Dispose()
            throw "GitHub API request failed: $Method $Uri`n$errorBody"
        }

        throw
    }
}

function Get-AuthenticatedGitHubLogin {
    param([string]$AuthToken)

    if ($DryRun) {
        if (-not [string]::IsNullOrWhiteSpace($Owner)) {
            return $Owner
        }

        return "dry-run-user"
    }

    $user = Invoke-GitHubApi -Method "GET" -Uri "https://api.github.com/user" -AuthToken $AuthToken
    if ([string]::IsNullOrWhiteSpace($user.login)) {
        throw "Unable to determine the authenticated GitHub username."
    }

    return $user.login
}

function Test-GitHubOrganization {
    param(
        [string]$Organization,
        [string]$AuthToken
    )

    if ($DryRun) {
        return $true
    }

    try {
        Invoke-GitHubApi -Method "GET" -Uri "https://api.github.com/orgs/$Organization" -AuthToken $AuthToken | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

function New-GitHubRepositoryViaApi {
    param(
        [string]$RepositoryName,
        [string]$RepositoryOwner,
        [string]$RepositoryVisibility,
        [string]$RepositoryDescription,
        [string]$ExistingOriginUrl
    )

    $authToken = Get-GitHubToken
    $authenticatedLogin = Get-AuthenticatedGitHubLogin -AuthToken $authToken

    if (-not [string]::IsNullOrWhiteSpace($ExistingOriginUrl)) {
        $backupRemoteName = Get-UniqueRemoteName -BaseName "origin-backup"
        Write-Step "Renaming existing origin remote to $backupRemoteName"
        Invoke-WriteCommand -FilePath "git" -Arguments @("remote", "rename", "origin", $backupRemoteName)
    }

    $targetOwner = $RepositoryOwner
    if ([string]::IsNullOrWhiteSpace($targetOwner)) {
        $targetOwner = $authenticatedLogin
    }

    $body = @{
        name        = $RepositoryName
        description = $RepositoryDescription
        private     = $RepositoryVisibility -eq "private"
    }

    if ($targetOwner -eq $authenticatedLogin) {
        $uri = "https://api.github.com/user/repos"
    }
    else {
        if (-not (Test-GitHubOrganization -Organization $targetOwner -AuthToken $authToken)) {
            throw "Owner '$targetOwner' is not the authenticated user and was not found as an organization. Omit -Owner for a personal repo or pass an organization you can create repos in."
        }

        $uri = "https://api.github.com/orgs/$targetOwner/repos"
    }

    Write-Step "Creating GitHub repository $targetOwner/$RepositoryName"
    Invoke-GitHubApi -Method "POST" -Uri $uri -AuthToken $authToken -Body $body | Out-Null

    $remoteUrl = "https://github.com/$targetOwner/$RepositoryName.git"
    Write-Step "Adding origin remote"
    Invoke-WriteCommand -FilePath "git" -Arguments @("remote", "add", "origin", $remoteUrl)
}

function New-GitHubRepository {
    param(
        [string]$RepositoryName,
        [string]$RepositoryOwner,
        [string]$RepositoryVisibility,
        [string]$RepositoryDescription,
        [string]$ExistingOriginUrl
    )

    if (Test-CommandAvailable -Name "gh") {
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
        return
    }

    New-GitHubRepositoryViaApi -RepositoryName $RepositoryName -RepositoryOwner $RepositoryOwner -RepositoryVisibility $RepositoryVisibility -RepositoryDescription $RepositoryDescription -ExistingOriginUrl $ExistingOriginUrl
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
