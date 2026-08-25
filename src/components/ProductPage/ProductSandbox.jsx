import React, { useState } from 'react';
import './ProductSandbox.css';
import { 
  Sparkles, 
  Layers, 
  Wand2, 
  Copy, 
  Code2, 
  Eye, 
  Play, 
  Check, 
  Terminal, 
  Sliders, 
  UploadCloud, 
  Volume2, 
  RefreshCw,
  Cpu,
  Download,
  Share2
} from 'lucide-react';

import heroSneaker from '../../assets/images/hero_sneaker_1787660674902.jpg';
import heroMascot from '../../assets/images/hero_mascot_1787660719388.jpg';
import galleryWatch from '../../assets/images/gallery_watch_1787660744791.jpg';
import heroCyberpunk from '../../assets/images/hero_cyberpunk_chase.jpg';
import bannerSupercar from '../../assets/images/banner_supercar_drift.jpg';
import videoPerfume from '../../assets/images/video_perfume_1787660953928.jpg';
import { Videos } from '../../assets/videos';

const SANDBOX_TOOLS = [
  {
    id: 'studio',
    name: 'Artquil Studio',
    tag: 'Flagship Studio',
    icon: Sparkles,
    badge: 'Text-to-Video Engine',
    headline: 'Single-Prompt Cinematic Video & 4K Generation',
    desc: 'Type natural language instructions, adjust motion physics, and trigger real-time AI rendering with synchronized sound.',
    presetPrompts: [
      'Anamorphic 35mm film shot of a futuristic cyberpunk racer drifting through neon rain, reflections, cinematic lighting, 4k 60fps',
      'Hyper-realistic macro commercial for luxury sapphire timepiece, water splash caustics, slow motion 120fps, studio lighting',
      'Dynamic drone sweep across alpine mountain peaks with morning mist, golden hour volumetric rays, photorealistic 8k'
    ],
    sampleImage: heroCyberpunk,
    sampleVideo: Videos.sceneCyber,
    controls: ['Motion Strength: 85%', 'Camera: Orbit Left 45°', 'Soundtrack: Electronic Synthwave', 'FPS: 60 UHD']
  },
  {
    id: 'brand-engine',
    name: 'Brand Engine',
    tag: 'Enterprise Brand Lock',
    icon: Layers,
    badge: 'LoRA Custom Weights',
    headline: 'Zero Brand Drift for Marketing & Product Creative',
    desc: 'Lock logo geometry, exact Pantone color codes, and 3D product meshes to maintain 100% brand consistency across thousands of assets.',
    presetPrompts: [
      'Brand Lock: NeoSneakers Aurora Edition on neon podium with floating holographic UI and kinetic lighting',
      'E-commerce campaign banner featuring exact brand mascot celebrating summer discount event with confetti',
      'Corporate 3D product reveal video with official hex #8B5CF6 glow accents and laser etching'
    ],
    sampleImage: heroSneaker,
    sampleVideo: Videos.supercar,
    controls: ['Brand Lock: 100% Strict', 'LoRA Weights: #09a1f-custom', 'Hex Compliance: #8B5CF6 / #06B6D4', 'Team Workspace: Marketing HQ']
  },
  {
    id: 'smart-editor',
    name: 'Smart Editor',
    tag: 'Pro Canvas Tools',
    icon: Wand2,
    badge: 'AI Inpainting & Erase',
    headline: 'Generative Inpainting, Background Swap & Object Erase',
    desc: 'Brush over unwanted elements, replace backdrops with exotic locales, and automatically extend aspect ratios without pixel stretch.',
    presetPrompts: [
      'Select background → Replace with futuristic Tokyo skyline at twilight with soft bokeh depth of field',
      'Erase foreground microphone boom and restore natural wood grain table texture seamlessly',
      'Outpaint 16:9 vertical frame to 21:9 cinematic ultra-wide without loss of edge consistency'
    ],
    sampleImage: videoPerfume,
    sampleVideo: Videos.flowerTimelapse,
    controls: ['Brush Mode: Smart Inpaint', 'Edge Blend: 99.4%', 'Lighting Match: Auto HDR', 'Aspect Extender: 21:9']
  },
  {
    id: 'batch-generator',
    name: 'Batch Generator',
    tag: 'High-Volume Production',
    icon: Copy,
    badge: 'CSV-to-Video Engine',
    headline: 'Turn Spreadsheets into 1,000s of Targeted Variations',
    desc: 'Feed a CSV spreadsheet with custom text, target languages, and product SKUs to render personalized video ads at scale.',
    presetPrompts: [
      'Batch Job #4102: 120 Regional variations for 18 countries with localized currency and AI voiceover',
      'E-commerce Catalog: 500 Product showcase videos generated from Shopify product catalog feed',
      'Dynamic Social Ads: 240 A/B split-tested hooks and background soundtracks for TikTok and Instagram'
    ],
    sampleImage: galleryWatch,
    sampleVideo: Videos.cldMotion,
    controls: ['Batch Count: 500 Videos', 'Queue: AWS GPU Parallel', 'Export Format: MP4 + MOV + ProRes', 'Delivery: S3 Bucket Webhook']
  },
  {
    id: 'developer-api',
    name: 'Developer API',
    tag: 'Cloud REST & Webhooks',
    icon: Code2,
    badge: 'Real-Time Streaming SDK',
    headline: 'Sub-200ms REST API & Multi-Language SDKs',
    desc: 'Integrate text-to-video, inpainting, and upscaling directly into your React, Python, or Go stack with streaming websocket events.',
    presetPrompts: [
      'POST /v1/video/generate — Stream token progress with realtime frame chunks and webhook completion callbacks',
      'POST /v1/upscale/4k — Batch process low-res thumbnails into master 4K ProRes deliverables',
      'POST /v1/voice/sync — Generate 100% lip-synced neural voiceover from plain text transcript'
    ],
    sampleImage: bannerSupercar,
    sampleVideo: Videos.finishLine,
    controls: ['Latency: 180ms TTFB', 'Uptime: 99.99%', 'SDKs: Node.js, Python, Go, cURL', 'Webhooks: HMAC SHA-256']
  },
  {
    id: 'vision-multimodal',
    name: 'Artquil Vision',
    tag: 'Multimodal AI Model',
    icon: Eye,
    badge: 'Voice & Vision Intelligence',
    headline: 'Multimodal Video Captioning, OCR & Audio Synthesis',
    desc: 'Automatically analyze video frames, extract text and objects, generate synchronized audio voiceovers, and verify brand safety.',
    presetPrompts: [
      'Scene Breakdown: Detected 3 subjects in motion, 85% golden ratio composition, mood: cinematic inspirational',
      'Neural Voiceover: Synthesized friendly narrator audio in English, Spanish, and Hindi with custom pitch',
      'Safety Verification: 0 violations, safe for broad commercial distribution and paid advertising'
    ],
    sampleImage: heroMascot,
    sampleVideo: Videos.sceneQuantum,
    controls: ['Safety Score: 100% Pass', 'Multimodal OCR: Active', 'Synced Audio: True', 'Lip Sync: Ultra Precision']
  }
];

const CODE_EXAMPLES = {
  curl: `curl -X POST "https://api.artquil.ai/v1/video/generate" \\
  -H "Authorization: Bearer artquil_live_key_9942a" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Cinematic 4K drone shot of golden hour mountain ridge, 60fps",
    "style": "cinematic_anamorphic",
    "resolution": "3840x2160",
    "audio": {
      "voiceover": "Natural ambient narration",
      "sound_fx": true
    },
    "webhook_url": "https://myapp.com/webhooks/video-ready"
  }'`,
  python: `import artquil

client = artquil.Client(api_key="artquil_live_key_9942a")

# Trigger asynchronous video & audio generation
job = client.video.generate(
    prompt="Cinematic 4K drone shot of golden hour mountain ridge, 60fps",
    style="cinematic_anamorphic",
    resolution="4K_UHD",
    fps=60,
    audio_sync=True
)

print(f"Video job dispatched: {job.id}")
# Stream realtime frames
for frame in job.stream_frames():
    print(f"Rendering frame {frame.index}/180")`,
  javascript: `import { Artquil } from '@artquil/sdk';

const artquil = new Artquil({ apiKey: process.env.ARTQUIL_KEY });

const video = await artquil.video.create({
  prompt: 'Cinematic 4K drone shot of golden hour mountain ridge, 60fps',
  style: 'cinematic_anamorphic',
  resolution: '3840x2160',
  fps: 60,
  audio: { syncSoundtrack: true }
});

console.log('Video ready at:', video.outputUrl);`
};

export default function ProductSandbox({ selectedToolId = 'studio' }) {
  const [activeToolId, setActiveToolId] = useState(selectedToolId);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [activeCodeTab, setActiveCodeTab] = useState('curl');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const currentTool = SANDBOX_TOOLS.find(t => t.id === activeToolId) || SANDBOX_TOOLS[0];

  const handleSimulate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(CODE_EXAMPLES[activeCodeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="sandbox-section" id="interactive-sandbox">
      <div className="sandbox-container">
        
        {/* Header */}
        <div className="sandbox-header">
          <div className="section-pill-tag">
            <Sparkles size={13} className="pill-icon" />
            <span>INTERACTIVE TOOL PLAYGROUND</span>
          </div>

          <h2 className="sandbox-title">
            Test the entire suite in <span className="font-serif-accent text-gradient-purple-cyan">action.</span>
          </h2>

          <p className="sandbox-subtitle">
            Switch between the 6 products in the Artquil suite to test prompts, inspect pipeline controls, and preview developer SDK integration.
          </p>
        </div>

        {/* 6-Tool Navigation Tabs */}
        <div className="sandbox-tool-tabs">
          {SANDBOX_TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive = tool.id === activeToolId;

            return (
              <button
                key={tool.id}
                className={`tool-nav-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveToolId(tool.id);
                  setSelectedPromptIndex(0);
                }}
              >
                <Icon size={16} className="tool-nav-icon" />
                <span className="tool-nav-name">{tool.name}</span>
                {tool.id === 'vision-multimodal' && <span className="beta-chip">BETA</span>}
              </button>
            );
          })}
        </div>

        {/* Interactive Workspace Container */}
        <div className="sandbox-workspace-card">
          
          {/* Left Panel: Prompt & Controls */}
          <div className="sandbox-control-panel">
            <div className="panel-badge-row">
              <span className="panel-tag">{currentTool.tag}</span>
              <span className="panel-badge-pill">{currentTool.badge}</span>
            </div>

            <h3 className="panel-headline">{currentTool.headline}</h3>
            <p className="panel-desc">{currentTool.desc}</p>

            {/* Presets selector */}
            <div className="prompt-selector-group">
              <label className="input-label">Sample Prompt & Pipeline Instruction</label>
              <div className="prompt-cards-list">
                {currentTool.presetPrompts.map((prompt, idx) => (
                  <div
                    key={idx}
                    className={`prompt-card-option ${idx === selectedPromptIndex ? 'active' : ''}`}
                    onClick={() => setSelectedPromptIndex(idx)}
                  >
                    <div className="prompt-dot-check">
                      {idx === selectedPromptIndex ? <Check size={12} /> : null}
                    </div>
                    <p className="prompt-option-text">{prompt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline Active Controls */}
            <div className="pipeline-controls-wrap">
              <label className="input-label">Engine Execution Matrix</label>
              <div className="controls-chips-grid">
                {currentTool.controls.map((ctrl, cIdx) => (
                  <span key={cIdx} className="control-chip">
                    <Sliders size={12} className="chip-icon" />
                    {ctrl}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sandbox-actions-row">
              <button 
                className={`btn-simulate-run ${isGenerating ? 'generating' : ''}`}
                onClick={handleSimulate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} className="spin-icon" />
                    <span>Rendering on AWS GPU...</span>
                  </>
                ) : (
                  <>
                    <Play size={16} fill="currentColor" />
                    <span>Simulate Pipeline Pass</span>
                  </>
                )}
              </button>

              <span className="sim-meta-text">
                <Cpu size={14} /> Sub-second inference pass
              </span>
            </div>
          </div>

          {/* Right Panel: Live Visual Output or Code Sandbox */}
          <div className="sandbox-output-panel">
            {activeToolId === 'developer-api' ? (
              /* Code API Sandbox */
              <div className="code-sandbox-wrapper">
                <div className="code-header">
                  <div className="code-tabs">
                    {['curl', 'python', 'javascript'].map((lang) => (
                      <button
                        key={lang}
                        className={`code-lang-btn ${activeCodeTab === lang ? 'active' : ''}`}
                        onClick={() => setActiveCodeTab(lang)}
                      >
                        {lang === 'javascript' ? 'Node.js' : lang.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <button className="btn-copy-code" onClick={handleCopyCode}>
                    {copiedCode ? (
                      <>
                        <Check size={14} className="copied-check" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Terminal size={14} />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="code-editor-body">
                  <pre>
                    <code>{CODE_EXAMPLES[activeCodeTab]}</code>
                  </pre>
                </div>

                <div className="api-badge-footer">
                  <span>⚡ 99.99% Availability</span>
                  <span>🔒 End-to-End Encrypted</span>
                  <span>📦 Full TypeScript Types</span>
                </div>
              </div>
            ) : (
              /* Live Preview Render Window */
              <div className="live-preview-window">
                <div className="preview-top-bar">
                  <div className="window-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <span className="window-title-tag">
                    {currentTool.name} — Live Render Preview (4K UHD)
                  </span>
                  <div className="window-action-icons">
                    <Download size={14} className="win-icon" />
                    <Share2 size={14} className="win-icon" />
                  </div>
                </div>

                <div className="preview-image-container">
                  {typeof currentTool.sampleVideo === 'string' && (currentTool.sampleVideo.endsWith('.mp4') || currentTool.sampleVideo.endsWith('.webm')) ? (
                    <video 
                      key={currentTool.id}
                      src={currentTool.sampleVideo} 
                      poster={currentTool.sampleImage}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={`preview-img ${isGenerating ? 'is-rendering' : ''}`}
                    />
                  ) : (
                    <img 
                      key={currentTool.id}
                      src={currentTool.sampleVideo || currentTool.sampleImage} 
                      alt="Tool Output Preview" 
                      className={`preview-img ${isGenerating ? 'is-rendering' : ''}`}
                    />
                  )}

                  {/* Rendering Overlay */}
                  {isGenerating && (
                    <div className="rendering-overlay">
                      <div className="render-pulse-loader">
                        <RefreshCw size={28} className="spin-icon" />
                        <span>Generating Neural Keyframes...</span>
                      </div>
                    </div>
                  )}

                  {/* Live HUD Badges */}
                  <div className="hud-badge hud-top-left">
                    <span className="hud-dot"></span>
                    <span>AWS G5.12xlarge GPU Cluster</span>
                  </div>

                  <div className="hud-badge hud-bottom-right">
                    <span>4K UHD • 60 FPS • Synced Audio</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
