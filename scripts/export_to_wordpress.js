
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '../src/data/n8n_templates.json');
const OUTPUT_FILE = path.join(__dirname, '../wordpress_n8n_import.json');

async function exportForWordPress() {
  try {
    const rawData = fs.readFileSync(INPUT_FILE, 'utf-8');
    const templates = JSON.parse(rawData);

    // Transform for WordPress Import (e.g., WP All Import or generic JSON importer)
    const wpData = templates.map(t => ({
      post_title: t.title,
      post_content: t.description, // Main description
      post_status: 'publish',
      post_type: 'n8n_template', // Suggested Custom Post Type slug
      // Custom Fields (Meta Data) which Elementor Pro can read dynamically
      meta: {
        n8n_id: t.id,
        n8n_slug: t.slug,
        n8n_thumbnail: t.thumbnail,
        n8n_author: t.author,
        n8n_complexity: t.complexity,
        n8n_price: t.price,
        n8n_date: t.date,
        n8n_views: t.views,
        n8n_downloads: t.downloads,
        n8n_source_url: t.source_url
      },
      // Taxonomies
      taxonomies: {
        category: t.categories.join(',')
      }
    }));

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(wpData, null, 2));
    console.log(`Successfully exported ${wpData.length} templates to ${OUTPUT_FILE}`);
    console.log(`You can import this file using 'WP All Import' or similar plugins into a 'n8n_template' Custom Post Type.`);

  } catch (error) {
    console.error('Error exporting data at:', new Date().toISOString());
    console.error(error);
  }
}

exportForWordPress();
