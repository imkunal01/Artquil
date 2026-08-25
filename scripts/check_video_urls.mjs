import https from 'https';

const testUrls = [
  'https://res.cloudinary.com/demo/video/upload/dog.mp4',
  'https://res.cloudinary.com/demo/video/upload/elephants.mp4',
  'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4',
  'https://res.cloudinary.com/demo/video/upload/rooster.mp4',
  'https://res.cloudinary.com/demo/video/upload/kitten_fighting.mp4',
  'https://res.cloudinary.com/demo/video/upload/snow_horses.mp4',
  'https://res.cloudinary.com/demo/video/upload/finish_line.mp4',
  'https://vjs.zencdn.net/v/oceans.mp4',
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  'https://github.com/intel-iot-devkit/sample-videos/raw/master/car-detection.mp4',
  'https://github.com/intel-iot-devkit/sample-videos/raw/master/face-demographics-walking.mp4',
  'https://github.com/intel-iot-devkit/sample-videos/raw/master/head-pose-face-detection-female.mp4'
];

async function check(url) {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const req = https.request({
        protocol: u.protocol,
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Range': 'bytes=0-100'
        }
      }, (res) => {
        resolve({ url, status: res.statusCode, type: res.headers['content-type'] });
      });
      req.on('error', (e) => resolve({ url, error: e.message }));
      req.setTimeout(4000, () => { req.destroy(); resolve({ url, error: 'timeout' }); });
      req.end();
    } catch(e) {
      resolve({ url, error: e.message });
    }
  });
}

(async () => {
  for (const u of testUrls) {
    const res = await check(u);
    console.log(res.status, res.type, u);
  }
})();
