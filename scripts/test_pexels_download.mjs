import https from 'https';
import http from 'http';
import fs from 'fs';

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const mod = parsed.protocol === 'https:' ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': '*/*'
      }
    }, (res) => {
      console.log('Status:', res.statusCode, res.headers.location || '');
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log('Redirecting to:', res.headers.location);
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200 && res.statusCode !== 206) {
        return reject(new Error(`Failed with status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(destPath);
          console.log(`Downloaded ${destPath}: ${stats.size} bytes`);
          resolve(stats.size);
        });
      });
    });
    req.on('error', reject);
  });
}

(async () => {
  try {
    // Let's test with a Pexels video ID (e.g. 3129671 or 854697 or 857251)
    await downloadFile('https://www.pexels.com/video/3129671/download/', 'scripts/test_download.mp4');
  } catch(e) {
    console.error('Error:', e.message);
  }
})();
