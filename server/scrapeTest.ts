import * as cheerio from 'cheerio';

async function testFetch() {
    console.log("Fetching sitemap index...");
    const sitemapIndexRes = await fetch('https://n8nworkflows.xyz/sitemap-index.xml');
    const sitemapIndexXml = await sitemapIndexRes.text();
    
    const sitemaps = [...sitemapIndexXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    console.log(`Found ${sitemaps.length} sitemaps. Fetching them...`);
    
    let allWorkflowUrls: string[] = [];
    
    // We can fetch them in parallel
    await Promise.all(sitemaps.map(async (url) => {
        try {
            const res = await fetch(url);
            const xml = await res.text();
            let urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
            const wfUrls = urls.filter(u => u.includes('/workflows/'));
            allWorkflowUrls.push(...wfUrls);
        } catch(e) { /* ignore */ }
    }));
    
    console.log(`Found total ${allWorkflowUrls.length} workflow URLs.`);
    
    if (allWorkflowUrls.length > 0) {
        console.log("Testing extraction on first workflow:", allWorkflowUrls[0]);
        const wfRes = await fetch(allWorkflowUrls[0]);
        const wfHtml = await wfRes.text();
        const $ = cheerio.load(wfHtml);
        
        const title = $('h1').text().trim();
        const description = $('meta[name="description"]').attr('content') || '';
        const hasPremiumButton = wfHtml.includes('Buy') || wfHtml.includes('Price');
        
        const n8nDemo = $('n8n-demo');
        const workflowJson = n8nDemo.attr('workflow') || n8nDemo.attr('data-workflow') || '';
        
        console.log("Extraction Results:");
        console.log({
            title,
            description,
            hasPremiumButton,
            hasJson: !!workflowJson,
            jsonLength: workflowJson.length,
            jsonPreview: workflowJson.substring(0, 50)
        });
        
        if (!workflowJson) {
            console.log("Trying to find the JSON inside a script tag...");
            const scripts = $('script');
            scripts.each((i, el) => {
                const text = $(el).text();
                // look for '{"meta":' or '"nodes":' etc
                if (text.includes('"nodes":[') || text.includes('{"meta":{"templateId"')) {
                    console.log(`Found potential JSON in script tag ${i}, length ${text.length}`);
                }
            });
        }
    }
}

testFetch().catch(console.error);
