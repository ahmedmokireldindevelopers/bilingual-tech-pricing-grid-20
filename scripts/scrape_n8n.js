
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BASE_URL = "https://n8nworkflows.xyz";
const API_ENDPOINT = "/api/load-more-workflows.json";
const OUTPUT_FILE = path.join(__dirname, '../src/data/n8n_templates.json');
const BATCH_SIZE = 20; // Fetch 20 at a time
const MAX_TEMPLATES = 200; // Limit

async function scrapeN8n() {
    console.log(`Starting N8N Scraper...`);
    console.log(`Target: ${BASE_URL}${API_ENDPOINT}`);
    console.log(`Output: ${OUTPUT_FILE}`);
    console.log(`Limit: ${MAX_TEMPLATES} templates`);

    let allWorkflows = [];
    let offset = 0;
    let keepFetching = true;

    while (keepFetching && allWorkflows.length < MAX_TEMPLATES) {
        const remaining = MAX_TEMPLATES - allWorkflows.length;
        const limit = Math.min(BATCH_SIZE, remaining);
        
        // params: type=all&sort=date-desc&time=all&price=all&offset=0&limit=12
        const url = `${BASE_URL}${API_ENDPOINT}?type=all&sort=date-desc&time=all&price=all&offset=${offset}&limit=${limit}`;
        
        console.log(`Fetching offset ${offset}...`);
        
        try {
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            if (!response.ok) {
                console.error(`Failed to fetch page: ${response.status} ${response.statusText}`);
                break;
            }

            const data = await response.json();
            const workflows = data.workflows || [];

            if (workflows.length === 0) {
                console.log("No more workflows returned.");
                keepFetching = false;
            } else {
                // Process and add workflows
                workflows.forEach(wf => {
                    allWorkflows.push({
                        id: wf.id || wf.slug, 
                        title: wf.title,
                        description: wf.metadescription || wf.description,
                        slug: wf.slug,
                        thumbnail: wf.thumbnail,
                        categories: wf.categories || [],
                        author: typeof wf.author === 'object' ? wf.author.name : wf.author,
                        complexity: wf.complexityLevel,
                        price: (wf.price === 0 || !wf.price) ? 'Free' : 'Paid',
                        date: wf.date,
                        views: wf.visitors || 0,
                        downloads: wf.inserters || 0,
                        source_url: `${BASE_URL}/workflows/${wf.slug}`
                    });
                });

                console.log(`Fetched ${workflows.length} workflows. Total: ${allWorkflows.length}`);
                offset += workflows.length;

                // Small delay to be nice
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        } catch (error) {
            console.error("Error during scraping:", error);
            keepFetching = false;
        }
    }

    // Ensure directory exists
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allWorkflows, null, 2));
    console.log(`\nScraping complete! Saved ${allWorkflows.length} templates to ${OUTPUT_FILE}`);
}

scrapeN8n();
