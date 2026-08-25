import https from 'https';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'AiVideoDemo/1.0 (contact@example.com)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function searchWikimedia(keyword) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=filetype:video+${encodeURIComponent(keyword)}&gsrlimit=10&prop=imageinfo&iiprop=url|mime|size|mediatype`;
  const data = await fetchJson(url);
  const pages = data.query?.pages || {};
  const urls = [];
  for (const p of Object.values(pages)) {
    const info = p.imageinfo?.[0];
    if (info && (info.url.endsWith('.mp4') || info.url.endsWith('.webm'))) {
      urls.push({ title: p.title, url: info.url, mime: info.mime });
    }
  }
  return urls;
}

(async () => {
  const keywords = ['ocean wave', 'drone landscape', 'city timelapse', 'fluid ink', 'northern lights'];
  for (const kw of keywords) {
    const results = await searchWikimedia(kw);
    console.log(`Results for ${kw}:`, results.length);
    for (const r of results) {
      console.log(' - ', r.title, r.url);
    }
  }
})();
