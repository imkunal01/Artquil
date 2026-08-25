import fs from 'fs';
import path from 'path';

const dir = path.resolve('src/assets/video');
const files = fs.readdirSync(dir);

console.log('Current files:', files);

// Map of target clean filename -> timestamped or existing file
const mapping = {
  '165817-833532183.mp4': '1787687190154_165817-833532183.mp4',
  '180523-864532673.mp4': '1787687190155_180523-864532673.mp4',
  'deep_oceans.mp4': '1787687190150_deep_oceans.mp4',
  'finish_line_action.mp4': files.includes('finish_line_action.mp4') ? 'finish_line_action.mp4' : '1787687190152_finish_line_action.mp4',
  'flower_timelapse.mp4': '1787687190153_flower_timelapse.mp4',
  'sea_turtle_ocean.mp4': files.includes('sea_turtle_ocean.mp4') ? 'sea_turtle_ocean.mp4' : '1787687190153_sea_turtle_ocean.mp4',
  'snow_horses_cinematic.mp4': files.includes('snow_horses_cinematic.mp4') ? 'snow_horses_cinematic.mp4' : '1787687190153_snow_horses_cinematic.mp4',
  'supercar_traffic.mp4': '1787687190154_supercar_traffic.mp4',
  'walking_pedestrians.mp4': '1787687190154_walking_pedestrians.mp4',
  'cld_sample_motion.mp4': files.includes('cld_sample_motion.mp4') ? 'cld_sample_motion.mp4' : '1787687190155_cld_sample_motion.mp4',
  'coastal_drone.mp4': files.includes('coastal_drone.mp4') ? 'coastal_drone.mp4' : '1787687190155_coastal_drone.mp4',
};

for (const [targetName, sourceName] of Object.entries(mapping)) {
  const targetPath = path.join(dir, targetName);
  const sourcePath = path.join(dir, sourceName);

  if (fs.existsSync(sourcePath)) {
    if (sourcePath !== targetPath) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied ${sourceName} -> ${targetName}`);
    } else {
      console.log(`Already present: ${targetName}`);
    }
  } else {
    console.error(`Source not found: ${sourceName}`);
  }
}

// Clean up duplicate timestamped files
const finalFiles = fs.readdirSync(dir);
for (const f of finalFiles) {
  if (/^\d{13}_/.test(f)) {
    fs.unlinkSync(path.join(dir, f));
    console.log(`Removed temporary file: ${f}`);
  }
}

console.log('Final cleaned files in src/assets/video:', fs.readdirSync(dir));
