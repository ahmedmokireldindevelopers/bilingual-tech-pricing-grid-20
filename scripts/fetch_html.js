
import fs from 'fs';
import https from 'https';

const url = 'https://n8nworkflows.xyz';
const outputFile = 'n8n_raw.html';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync(outputFile, data);
    console.log(`Saved HTML to ${outputFile}`);
  });
}).on('error', (err) => {
  console.error('Error fetching URL:', err);
});
