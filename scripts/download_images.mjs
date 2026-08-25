import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_TO_FETCH = [
  // 1. Hero Section
  {
    name: 'hero_drone_waterfall.jpg',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'hero_cyberpunk_chase.jpg',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'hero_luxury_commercial.jpg',
    url: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'hero_architectural_tour.jpg',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
  },

  // 2. Video Feature Banner / Interactive Ripple Engine
  {
    name: 'banner_scifi_singularity.jpg',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'banner_supercar_drift.jpg',
    url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'banner_bioluminescent_ocean.jpg',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'banner_cyber_cyborg.jpg',
    url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'banner_enchanted_forest.jpg',
    url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'banner_liquid_splash.jpg',
    url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1600&q=85'
  },

  // 3. How It Works Pipeline
  {
    name: 'how_step1_storyboard.jpg',
    url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'how_step2_camera_hud.jpg',
    url: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'how_step3_synced_video.jpg',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=85'
  },

  // 4. Video Styles Showcase
  {
    name: 'style_cinema_action.jpg',
    url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'style_product_commercial.jpg',
    url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'style_typography_motion.jpg',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'style_3d_character.jpg',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'style_food_slowmo.jpg',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'style_nature_wildlife.jpg',
    url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'style_anime_action.jpg',
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'style_vhs_synthwave.jpg',
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=85'
  },

  // 5. Audience & Use Cases Grid
  {
    name: 'audience_creator_studio.jpg',
    url: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'audience_marketing_team.jpg',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'audience_agency_pitch.jpg',
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'audience_ecommerce_fashion.jpg',
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'audience_education_explainer.jpg',
    url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'audience_enterprise_studio.jpg',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85'
  },

  // 6. Real Results & Testimonials
  {
    name: 'results_brand_commercial.jpg',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'results_film_studio.jpg',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'avatar_priya.jpg',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85'
  },
  {
    name: 'avatar_arjun.jpg',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=85'
  },
  {
    name: 'avatar_meera.jpg',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=85'
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
  console.log(`Downloading ${IMAGES_TO_FETCH.length} images to ${targetDir}...`);
  for (const item of IMAGES_TO_FETCH) {
    const dest = path.join(targetDir, item.name);
    try {
      await downloadFile(item.url, dest);
      console.log(`✓ Downloaded ${item.name}`);
    } catch (err) {
      console.error(`✗ Error downloading ${item.name}: ${err.message}`);
    }
  }
  console.log('All downloads completed successfully!');
}

run();
