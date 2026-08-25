import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIX_IMAGES = [
  {
    name: 'banner_enchanted_forest.jpg',
    url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'style_nature_wildlife.jpg',
    url: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1600&q=85'
  }
];

const targetDir = path.resolve(__dirname, '../src/assets/images');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  for (const item of FIX_IMAGES) {
    const dest = path.join(targetDir, item.name);
    try {
      await downloadFile(item.url, dest);
      console.log(`✓ Fixed and downloaded ${item.name}`);
    } catch (err) {
      console.error(`✗ Error downloading ${item.name}: ${err.message}`);
    }
  }
}

run();
