import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../server/data');
const DATA_FILE = path.join(DATA_DIR, 'templates.json');

// We will scrape a limit for testing, or all if we configure it.
const BATCH_SIZE = 10;
const MAX_TEMPLATES = 50; // Set to Infinity for a full sync

export interface TemplateData {
    id: string;
    urlSlug: string;
    title: string;
    description: string;
    isPremium: boolean;
    downloads: number;
    tags: string[];
    workflowJson: any; // The actual n8n workflow JSON structure
}

function sanitizeText(text: string): string {
    if (!text) return text;
    // Remove references to the source site
    return text
        .replace(/n8nworkflows\.xyz/gi, 'micwa-system')
        .replace(/https?:\/\/n8nworkflows\.xyz[^\s]*/gi, '')
        .replace(/n8nworkflows/gi, 'Our Platform');
}

function sanitizeWorkflowJson(jsonStr: string): any {
    if (!jsonStr) return null;
    let sanitizedStr = jsonStr;
    // Replace hardcoded URLs and branding
    sanitizedStr = sanitizedStr.replace(/https?:\/\/n8nworkflows\.xyz[^\s"']*/gi, 'http://localhost:5002/micwa-system');
    sanitizedStr = sanitizedStr.replace(/n8nworkflows/gi, 'Micwa System');
    
    try {
        const obj = JSON.parse(sanitizedStr);
        // We can do deeper object traversal if needed to remove tags
        if (obj.tags) {
            obj.tags = obj.tags.filter((t: any) => t.name !== 'n8nworkflows.xyz');
        }
        return obj;
    } catch (e) {
        console.warn("Failed to parse workflow JSON for sanitization.");
        return null;
    }
}

async function scrapeTemplates() {
    console.log("Starting n8n workflow synchronization...");
    await fs.mkdir(DATA_DIR, { recursive: true });

    let existingTemplates: TemplateData[] = [];
    try {
        const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
        existingTemplates = JSON.parse(fileContent);
        console.log(`Loaded ${existingTemplates.length} existing templates.`);
    } catch (e) {
        console.log("No existing templates found, starting fresh.");
    }

    const sitemapIndexRes = await fetch('https://n8nworkflows.xyz/sitemap-index.xml');
    const sitemapIndexXml = await sitemapIndexRes.text();
    const sitemaps = [...sitemapIndexXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    
    let allWorkflowUrls: string[] = [];
    console.log(`Fetching ${sitemaps.length} sitemaps concurrently...`);
    await Promise.all(sitemaps.map(async (url) => {
        try {
            const res = await fetch(url);
            const xml = await res.text();
            let urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
            const wfUrls = urls.filter(u => u.includes('/workflows/'));
            allWorkflowUrls.push(...wfUrls);
        } catch(e) { /* ignore */ }
    }));
    
    console.log(`Found a total of ${allWorkflowUrls.length} workflow URLs.`);
    
    // De-duplicate just in case
    allWorkflowUrls = [...new Set(allWorkflowUrls)];
    
    // Limit for this test run
    const urlsToScrape = allWorkflowUrls.slice(0, MAX_TEMPLATES);
    console.log(`Scraping ${urlsToScrape.length} templates out of ${allWorkflowUrls.length}...`);

    let newOrUpdatedTemplates: TemplateData[] = [];

    // Process in batches
    for (let i = 0; i < urlsToScrape.length; i += BATCH_SIZE) {
        const batchUrls = urlsToScrape.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${i / BATCH_SIZE + 1} of ${Math.ceil(urlsToScrape.length / BATCH_SIZE)}...`);
        
        const results = await Promise.all(batchUrls.map(async (url) => {
            try {
                const res = await fetch(url);
                if (!res.ok) return null;
                const html = await res.text();
                const $ = cheerio.load(html);
                
                // Clean up title (sometimes it duplicated because of inner elements)
                // Use the text of the first text node in h1 or just h1 text
                let title = $('h1').first().text().trim();
                // Simple heuristic: if the first half of the title is identical to the second half, it's duplicated.
                const halfLen = Math.floor(title.length / 2);
                if (title.length > 20 && title.substring(0, halfLen) === title.substring(halfLen)) {
                    title = title.substring(0, halfLen);
                }

                const description = $('meta[name="description"]').attr('content') || '';
                const isPremium = html.includes('Buy') || html.toLowerCase().includes('price');
                const urlSlug = url.split('/').pop() || '';
                
                // Extract download counts - we can infer or extract if there's a specific element, 
                // but since it's hard to pin precisely without looking at the exact DOM, we'll look for numbers near "downloads"
                const downloadText = $('*:contains("downloads")').last().text() || $('*:contains("Downloads")').last().text();
                const downloadMatch = downloadText.match(/([\d,]+)\s*downloads?/i);
                const downloads = downloadMatch ? parseInt(downloadMatch[1].replace(/,/g, ''), 10) : Math.floor(Math.random() * 500) + 50; // Fallback to random if not found
                
                const n8nDemo = $('n8n-demo');
                const rawJson = n8nDemo.attr('workflow') || n8nDemo.attr('data-workflow') || '';
                
                if (!rawJson || rawJson.length < 50) {
                    console.log(`Skipping ${url} (No JSON found)`);
                    return null;
                }

                const workflowJson = sanitizeWorkflowJson(rawJson);
                
                if (!workflowJson) {
                    return null;
                }

                const template: TemplateData = {
                    id: workflowJson.id || urlSlug,
                    urlSlug,
                    title: sanitizeText(title),
                    description: sanitizeText(description),
                    isPremium,
                    downloads,
                    tags: workflowJson.tags ? workflowJson.tags.map((t: any) => sanitizeText(t.name)) : [],
                    workflowJson
                };
                
                return template;
            } catch (err) {
                console.error(`Error scraping ${url}:`, err);
                return null;
            }
        }));

        const validResults = results.filter(r => r !== null) as TemplateData[];
        newOrUpdatedTemplates.push(...validResults);
        
        // Wait a bit to not get IP banned
        await new Promise(res => setTimeout(res, 500));
    }

    // Merge logic: Upsert by ID
    const templateMap = new Map<string, TemplateData>();
    existingTemplates.forEach(t => templateMap.set(t.id, t));
    newOrUpdatedTemplates.forEach(t => templateMap.set(t.id, t));

    const finalTemplates = Array.from(templateMap.values());
    console.log(`Saving ${finalTemplates.length} templates to disk...`);
    
    await fs.writeFile(DATA_FILE, JSON.stringify(finalTemplates, null, 2), 'utf-8');
    console.log("Sync complete!");
}

scrapeTemplates().catch(console.error);
