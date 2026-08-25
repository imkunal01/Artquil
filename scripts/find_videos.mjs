import https from 'https';
import fs from 'fs';

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const req = https.request({
        protocol: u.protocol,
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Range': 'bytes=0-1024'
        }
      }, (res) => {
        resolve({ url, status: res.statusCode, contentType: res.headers['content-type'] });
      });
      req.on('error', (e) => resolve({ url, error: e.message }));
      req.setTimeout(5000, () => { req.destroy(); resolve({ url, error: 'timeout' }); });
      req.end();
    } catch(e) {
      resolve({ url, error: e.message });
    }
  });
}

async function searchPixabay(category) {
  const html = await fetchPage(`https://pixabay.com/videos/search/${encodeURIComponent(category)}/`);
  const regex = /https:\/\/cdn\.pixabay\.com\/video\/[^\s"'>]+?\.mp4/g;
  const matches = html.match(regex) || [];
  const unique = Array.from(new Set(matches));
  return unique;
}

(async () => {
  const categories = ['cinematic', 'technology', 'cyberpunk', 'nature', 'abstract', 'waterfall', 'city', 'space', 'fluid', 'robot'];
  const results = {};
  for (const cat of categories) {
    console.log(`Searching category: ${cat}...`);
    try {
      const urls = await searchPixabay(cat);
      console.log(`Found ${urls.length} URLs for ${cat}`);
      const validUrls = [];
      for (const u of urls.slice(0, 5)) {
        const check = await checkUrl(u);
        if (check.status === 200 || check.status === 206) {
          validUrls.push(u);
        }
      }
      results[cat] = validUrls;
      console.log(`Valid URLs for ${cat}:`, validUrls);
    } catch(e) {
      console.error(e.message);
    }
  }
  fs.writeFileSync('scripts/video_results.json', JSON.stringify(results, null, 2));
  console.log('Saved results to scripts/video_results.json');
})();
