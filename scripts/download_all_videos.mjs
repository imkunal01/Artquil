import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const videosToDownload = [
  {
    name: 'coastal_drone.mp4',
    url: 'https://res.cloudinary.com/demo/video/upload/glide-over-coastal-beach.mp4'
  },
  {
    name: 'snow_horses_cinematic.mp4',
    url: 'https://res.cloudinary.com/demo/video/upload/snow_horses.mp4'
  },
  {
    name: 'sea_turtle_ocean.mp4',
    url: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4'
  },
  {
    name: 'finish_line_action.mp4',
    url: 'https://res.cloudinary.com/demo/video/upload/finish_line.mp4'
  },
  {
    name: 'deep_oceans.mp4',
    url: 'https://vjs.zencdn.net/v/oceans.mp4'
  },
  {
    name: 'cld_sample_motion.mp4',
    url: 'https://res.cloudinary.com/demo/video/upload/samples/cld-sample-video.mp4'
  },
  {
    name: 'flower_timelapse.mp4',
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
  },
  {
    name: 'supercar_traffic.mp4',
    url: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/car-detection.mp4'
  },
  {
    name: 'walking_pedestrians.mp4',
    url: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/face-demographics-walking.mp4'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const mod = parsed.protocol === 'https:' ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200 && res.statusCode !== 206) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(dest);
          console.log(`Saved ${dest} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
          resolve(dest);
        });
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

(async () => {
  const targetDir = path.resolve('src/assets/video');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const item of videosToDownload) {
    const dest = path.join(targetDir, item.name);
    console.log(`Downloading ${item.name} from ${item.url}...`);
    try {
      await download(item.url, dest);
    } catch(e) {
      console.error(`Failed ${item.name}: ${e.message}`);
    }
  }
  console.log('All downloads completed!');
})();
