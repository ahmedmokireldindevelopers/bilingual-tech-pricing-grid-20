
const fs = require('fs');

async function testApi() {
    // URL from the HTML analysis
    const url = "https://n8nworkflows.xyz/api/load-more-workflows.json?type=all&sort=date-desc&time=all&price=all&offset=0&limit=5";
    console.log(`Fetching ${url}...`);
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        console.log("Response status:", response.status);
        
        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error("Response body:", text.substring(0, 500));
            return;
        }
        
        const data = await response.json();
        console.log("Success! Data preview:");
        if (data.workflows && data.workflows.length > 0) {
            console.log(JSON.stringify(data.workflows[0], null, 2));
            console.log(`Total workflows returned: ${data.workflows.length}`);
            // Save to file to inspect fully
            fs.writeFileSync('scripts/api_response_sample.json', JSON.stringify(data, null, 2));
            console.log("Saved full response to scripts/api_response_sample.json");
        } else {
            console.log("No workflows found in response:", data);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

testApi();
