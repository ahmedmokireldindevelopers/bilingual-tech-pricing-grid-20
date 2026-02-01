
import * as fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('n8n_raw.html', 'utf8');
const $ = cheerio.load(html);

const templates = [];

// Based on the raw HTML I saw earlier:
// The grid has `data-astro-cid-fvc36acy` but I need to find the card container.
// I will look for elements that have a Title and "Try for free" button or similar structure.
// I'll search for typical card classes or use a recursive search for the text "Extract insights from LinkedIn" to find the parent.

// Strategy: Find all anchor tags that look like workflow links detailed in the grep search.
// Since I can't see the exact class names easily, I'll log the first few links to see if they match expected patterns.

// However, looking at line 53-60 in view_file earlier, I saw:
// <a href="https://s.n8nworkflows.xyz/..." ... class="group block rounded-lg border ...">
// These were ADS (Bright Data, etc).
// I need to find the real content.
// Infinite scroll sugggests it might be in a different container or loaded via JSON in a script tag.
// I'll look for <script type="application/json"> or similar too.

// Let's try to find the "Extract insights..." text and traverse up.
const targetText = "Extract insights from LinkedIn";
const element = $(`*:contains("${targetText}")`).last();
if (element.length) {
    console.log("Found element with text:", element.prop('tagName'), element.attr('class'));
    const card = element.closest('a'); // Assuming cards are links
    if (card.length) {
        console.log("Card Parent:", card.prop('tagName'), card.attr('class'));
        console.log("Card HTML:", card.html().substring(0, 200) + "...");
    } else {
        console.log("No anchor parent found, checking div parent.");
         const divCard = element.closest('div.group'); // 'group' class used in ads, maybe commonly used
         console.log("Div Parent:", divCard.attr('class'));
    }
} else {
    console.log("Could not find text 'Extract insights from LinkedIn' in loaded HTML. It might be JS rendered or missing.");
}

// Also check if there's a __NEXT_DATA__ or Astro props in a script tag.
$('script').each((i, el) => {
    const content = $(el).html();
    if (content && content.includes('Extract insights from LinkedIn')) {
        console.log("Found data in script tag index:", i);
        console.log("Script snippet:", content.substring(0, 200));
    }
});
