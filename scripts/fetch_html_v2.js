
const fs = require('fs');

async function main() {
  try {
    console.log('Fetching...');
    const res = await fetch('https://n8nworkflows.xyz');
    if (!res.ok) {
        console.error('Failed to fetch:', res.status, res.statusText);
        return;
    }
    const html = await res.text();
    fs.writeFileSync('n8n_raw.html', html);
    console.log('Successfully saved to n8n_raw.html');
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
