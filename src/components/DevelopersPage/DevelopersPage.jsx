import React, { useState, useEffect } from 'react';
import './DevelopersPage.css';
import { 
  Terminal, Code2, Copy, Check, Key, Zap, Shield, BookOpen, 
  ExternalLink, Play, ArrowRight, Sliders, Activity, Radio, Database,
  Cpu, Layers, CheckCircle2
} from 'lucide-react';
import CTABanner from '../CTABanner';

const CODE_EXAMPLES = {
  python: `import artquil
from artquil import ArtquilClient

client = ArtquilClient(api_key="artq_live_98f417a8c3d9")

# Generate 4K video with synchronized voiceover & audio
generation = client.video.generate(
    prompt="Cinematic drone shot soaring through neon cyberpunk canyon in rain",
    style="cinematic_sci_fi",
    resolution="4k",
    camera_motion="dynamic_fpv_roll",
    audio_sync=True,
    webhook_url="https://api.yourdomain.com/v1/webhook"
)

print(f"Task Queued: {generation.id} | Status: {generation.status}")
# Stream real-time generation progress
for event in generation.stream_progress():
    print(f"Progress: {event.progress}% - Latent Step: {event.step}")`,

  javascript: `import { ArtquilClient } from '@artquil/sdk';

const client = new ArtquilClient({
  apiKey: process.env.ARTQUIL_API_KEY
});

// Dispatch multi-model prompt-to-video generation task
const response = await client.video.create({
  prompt: 'Cinematic drone shot soaring through neon cyberpunk canyon in rain',
  aspectRatio: '16:9',
  quality: '4k',
  audio: {
    generateVoiceover: true,
    backgroundScore: 'cyberpunk_synthwave'
  }
});

console.log('Video Generated URL:', response.outputUrl);`,

  curl: `curl -X POST https://api.artquil.com/v1/generate \\
  -H "Authorization: Bearer artq_live_98f417a8c3d9" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Cinematic drone shot soaring through neon cyberpunk canyon in rain",
    "resolution": "3840x2160",
    "fps": 60,
    "audio_sync": true
  }'`
};

const ENDPOINTS = [
  { method: 'POST', path: '/v1/generate', desc: 'Trigger prompt-to-video multi-model generation pipeline.' },
  { method: 'POST', path: '/v1/upscale', desc: 'Enhance and upscale existing video to native 4K 60FPS.' },
  { method: 'GET', path: '/v1/task/{id}', desc: 'Fetch real-time inference status and presigned AWS S3 stream URL.' },
  { method: 'POST', path: '/v1/audio/sync', desc: 'Generate multi-track voiceover and sound effects for video.' }
];

const PACKAGES = [
  { lang: "Python", cmd: "pip install artquil-ai", icon: "🐍" },
  { lang: "TypeScript / Node", cmd: "npm install @artquil/sdk", icon: "⚡" },
  { lang: "Rust", cmd: "cargo add artquil-rs", icon: "🦀" },
  { lang: "Go", cmd: "go get github.com/artquil/go-sdk", icon: "🔷" }
];

export default function DevelopersPage({ onOpenAuth }) {
  const [activeLang, setActiveLang] = useState('python');
  const [copied, setCopied] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('cgx_live_7a3d9284f601bce8');
  const [isKeyCopied, setIsKeyCopied] = useState(false);

  // Live API Sandbox state
  const [testPrompt, setTestPrompt] = useState('Anamorphic 35mm lens tracking shot of a robotic cheetah sprinting through desert dunes');
  const [testQuality, setTestQuality] = useState('4k');
  const [testFps, setTestFps] = useState('60fps');
  const [isApiTesting, setIsApiTesting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  // Live WebSocket stream simulator
  const [streamEvents, setStreamEvents] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);

  // Rate limit / volume calculator
  const [monthlyVolume, setMonthlyVolume] = useState(25000);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Developers & REST API Docs — Cognexa / Artquil';
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_EXAMPLES[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateKey = () => {
    const chars = '0123456789abcdef';
    let rand = 'cgx_live_';
    for (let i = 0; i < 16; i++) {
      rand += chars[Math.floor(Math.random() * chars.length)];
    }
    setGeneratedKey(rand);
  };

  const handleSendApiTest = () => {
    setIsApiTesting(true);
    setApiResponse(null);

    setTimeout(() => {
      setIsApiTesting(false);
      setApiResponse({
        status: 200,
        id: "gen_task_8f39b1a09d",
        model: "artquil-flux-video-v3",
        resolution: testQuality === '4k' ? "3840x2160" : "1920x1080",
        fps: parseInt(testFps),
        latency_ms: 842,
        tokens_processed: 42,
        output_url: "https://cdn.artquil.com/renders/gen_task_8f39b1a09d.mp4",
        c2pa_signature: "0x892a74ff8910bca78291..."
      });
    }, 850);
  };

  const handleStartWebSocketStream = () => {
    setIsStreaming(true);
    setStreamEvents([
      { time: "0.00s", event: "ws.connected", payload: '{"client_id": "usr_9984", "edge_node": "iad-1"}' }
    ]);

    setTimeout(() => {
      setStreamEvents(prev => [...prev, { time: "0.14s", event: "pipeline.model_routed", payload: '{"model": "flux_cinematic_v2", "vram_allocated": "14.2GB"}' }]);
    }, 300);

    setTimeout(() => {
      setStreamEvents(prev => [...prev, { time: "0.58s", event: "diffusion.denoise_step", payload: '{"step": 28, "eta": "0.3s", "ssim_preview": 0.94}' }]);
    }, 650);

    setTimeout(() => {
      setStreamEvents(prev => [...prev, { time: "1.12s", event: "video.render_complete", payload: '{"url": "https://cdn.cognexa.ai/v/8f39b1.mp4", "status": "ready"}' }]);
      setIsStreaming(false);
    }, 1000);
  };

  // Calculator helpers
  const calculatedCost = Math.round(monthlyVolume * 0.012);
  const concurrencyTier = monthlyVolume > 100000 ? "128 Streams" : monthlyVolume > 20000 ? "32 Streams" : "8 Streams";

  return (
    <div className="developers-page-wrapper">
      
      {/* 1. Dev Hero */}
      <section className="dev-hero-section">
        <div className="dev-hero-container">
          <div className="dev-badge-pill">
            <span className="dev-badge-text">DEVELOPER PLATFORM &amp; API</span>
          </div>

          <h1 className="dev-hero-title">
            Build with the world's fastest<br />
            <span className="dev-accent">multi-model video engine.</span>
          </h1>

          <p className="dev-hero-subtitle">
            Integrate Hollywood-grade prompt-to-video generation, 4K upscaling, and voiceover synchronization
            into your apps with simple REST endpoints and SDKs.
          </p>

          <div className="dev-key-generator-card">
            <div className="dev-key-info">
              <Key size={16} className="dev-key-icon" />
              <span className="dev-key-label">Sandbox API Key:</span>
              <code className="dev-key-code">{generatedKey}</code>
            </div>
            <div className="dev-key-actions">
              <button 
                className="btn-dev-subtle"
                onClick={() => {
                  navigator.clipboard.writeText(generatedKey);
                  setIsKeyCopied(true);
                  setTimeout(() => setIsKeyCopied(false), 2000);
                }}
              >
                {isKeyCopied ? <Check size={14} /> : <Copy size={14} />}
                <span>{isKeyCopied ? 'Copied' : 'Copy Key'}</span>
              </button>
              <button className="btn-dev-regen" onClick={handleGenerateKey}>
                Generate New
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Package Manager Quick Installs */}
      <section className="dev-packages-section">
        <div className="dev-packages-container">
          <div className="packages-grid">
            {PACKAGES.map((pkg, idx) => (
              <div key={idx} className="package-card" onClick={() => navigator.clipboard.writeText(pkg.cmd)}>
                <div className="pkg-left">
                  <span className="pkg-icon">{pkg.icon}</span>
                  <div className="pkg-info">
                    <span className="pkg-lang">{pkg.lang}</span>
                    <code className="pkg-cmd">{pkg.cmd}</code>
                  </div>
                </div>
                <button className="pkg-copy-btn" title="Click to copy install command">
                  <Copy size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Code Sandbox / SDK Explorer */}
      <section className="dev-code-section">
        <div className="dev-code-container">
          <div className="code-browser-card">
            
            {/* Header / Tabs */}
            <div className="code-browser-header">
              <div className="code-lang-tabs">
                <button 
                  className={`lang-tab ${activeLang === 'python' ? 'active' : ''}`}
                  onClick={() => setActiveLang('python')}
                >
                  Python SDK
                </button>
                <button 
                  className={`lang-tab ${activeLang === 'javascript' ? 'active' : ''}`}
                  onClick={() => setActiveLang('javascript')}
                >
                  TypeScript / Node.js
                </button>
                <button 
                  className={`lang-tab ${activeLang === 'curl' ? 'active' : ''}`}
                  onClick={() => setActiveLang('curl')}
                >
                  cURL CLI
                </button>
              </div>

              <button className="btn-copy-code" onClick={handleCopyCode}>
                {copied ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
                <span>{copied ? 'Copied to clipboard!' : 'Copy snippet'}</span>
              </button>
            </div>

            {/* Code Body */}
            <pre className="code-content-block">
              <code>{CODE_EXAMPLES[activeLang]}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* 4. Interactive Live REST API Workbench */}
      <section className="dev-workbench-section">
        <div className="dev-workbench-container">
          <div className="workbench-header">
            <span className="dev-kicker">LIVE API TESTBENCH</span>
            <h2 className="dev-section-title">Interactive API Request Studio</h2>
            <p className="dev-section-sub">Configure generation parameters and trigger a live test request to test latency and schema responses.</p>
          </div>

          <div className="workbench-grid">
            {/* Request Builder */}
            <div className="workbench-req-card">
              <div className="req-card-top">
                <span className="method-tag post">POST</span>
                <span className="req-url">https://api.artquil.com/v1/generate</span>
              </div>

              <div className="req-form">
                <div className="req-field">
                  <label className="req-label">Prompt Input</label>
                  <input 
                    type="text"
                    className="req-input"
                    value={testPrompt}
                    onChange={(e) => setTestPrompt(e.target.value)}
                  />
                </div>

                <div className="req-grid-2">
                  <div className="req-field">
                    <label className="req-label">Resolution Target</label>
                    <select 
                      className="req-select"
                      value={testQuality}
                      onChange={(e) => setTestQuality(e.target.value)}
                    >
                      <option value="4k">4K UHD (3840 × 2160)</option>
                      <option value="1080p">1080p FHD (1920 × 1080)</option>
                    </select>
                  </div>

                  <div className="req-field">
                    <label className="req-label">Frame Rate</label>
                    <select 
                      className="req-select"
                      value={testFps}
                      onChange={(e) => setTestFps(e.target.value)}
                    >
                      <option value="60fps">60 FPS Ultra Smooth</option>
                      <option value="30fps">30 FPS Cinematic</option>
                      <option value="24fps">24 FPS Motion Film</option>
                    </select>
                  </div>
                </div>

                <button 
                  className={`btn-send-req ${isApiTesting ? 'loading' : ''}`}
                  onClick={handleSendApiTest}
                  disabled={isApiTesting}
                >
                  <Play size={14} />
                  <span>{isApiTesting ? 'Executing Inference...' : 'Send API Request'}</span>
                </button>
              </div>
            </div>

            {/* Response Console */}
            <div className="workbench-res-card">
              <div className="res-card-top">
                <span className="res-title">HTTP 200 OK — JSON Response</span>
                {apiResponse && <span className="res-latency">{apiResponse.latency_ms}ms</span>}
              </div>

              <pre className="res-code-view">
                {apiResponse ? (
                  <code>{JSON.stringify(apiResponse, null, 2)}</code>
                ) : (
                  <code className="res-placeholder">
                    {`// Click "Send API Request" to test inference schema and headers...
{
  "status": "ready",
  "endpoint": "https://api.cognexa.ai/v1/generate"
}`}
                  </code>
                )}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WebSocket Event Streamer Simulation */}
      <section className="dev-stream-section">
        <div className="dev-stream-container">
          <div className="stream-header-row">
            <div>
              <span className="dev-kicker">STREAMING WEBSOCKETS</span>
              <h3 className="stream-title">Real-Time Event Tracing (wss://)</h3>
            </div>
            <button 
              className="btn-trigger-stream"
              onClick={handleStartWebSocketStream}
              disabled={isStreaming}
            >
              <Radio size={14} className={isStreaming ? 'pulse-icon' : ''} />
              <span>{isStreaming ? 'Streaming Events...' : 'Simulate WebSocket Event Stream'}</span>
            </button>
          </div>

          <div className="stream-events-box">
            {streamEvents.length > 0 ? (
              streamEvents.map((evt, idx) => (
                <div key={idx} className="stream-event-row">
                  <span className="evt-time">[{evt.time}]</span>
                  <span className="evt-name">{evt.event}</span>
                  <code className="evt-payload">{evt.payload}</code>
                </div>
              ))
            ) : (
              <div className="stream-empty">
                Click "Simulate WebSocket Event Stream" to listen to real-time progressive diffusion step updates.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Volume & Cost Calculator */}
      <section className="dev-calc-section">
        <div className="dev-calc-container">
          <div className="calc-header">
            <span className="dev-kicker">INFRASTRUCTURE CALCULATOR</span>
            <h2 className="dev-section-title">Scale Estimation &amp; Concurrent Throughput</h2>
          </div>

          <div className="calc-card">
            <div className="calc-slider-col">
              <div className="calc-label-row">
                <span className="calc-label">Monthly Generation Volume</span>
                <span className="calc-val-badge">{monthlyVolume.toLocaleString()} Generations</span>
              </div>
              <input 
                type="range"
                min="1000"
                max="200000"
                step="1000"
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                className="calc-range-slider"
              />
              <div className="calc-range-ticks">
                <span>1K</span>
                <span>50K</span>
                <span>100K</span>
                <span>200K+</span>
              </div>
            </div>

            <div className="calc-results-col">
              <div className="calc-result-metric">
                <span className="result-label">Estimated Monthly Cost</span>
                <span className="result-val">${calculatedCost.toLocaleString()} <small>/mo</small></span>
              </div>
              <div className="calc-result-metric">
                <span className="result-label">Concurrency Limit</span>
                <span className="result-val text-purple">{concurrencyTier}</span>
              </div>
              <div className="calc-result-metric">
                <span className="result-label">Dedicated SLA</span>
                <span className="result-val text-green">&lt; 15 min Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTABanner */}
      <CTABanner />

    </div>
  );
}
