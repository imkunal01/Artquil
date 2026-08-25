import React, { useState } from 'react';
import './ModelRouterPlayground.css';
import { Cpu, Terminal, Play, CheckCircle2, Sliders, Zap, Sparkles, Layers } from 'lucide-react';
import Images from '../../assets/images';

const ROUTING_PRESETS = [
  {
    id: 'cinematic',
    title: 'Cinematic Action 4K',
    prompt: 'High-speed camera tracking a neon cyberpunk hypercar drifting through rain-soaked streets with anamorphic lens flare',
    detectedGenre: 'Cinematic Sci-Fi',
    chosenModel: 'Artquil-Flux Pro 1.1 + SDXL Cinematic LoRA',
    vram: '14.2 GB',
    latency: '1.24s',
    steps: 28,
    guidance: 6.5,
    previewImg: Images.bannerSupercarDrift,
    confidence: '99.4%'
  },
  {
    id: 'photoreal',
    title: 'Hyperreal Commercial Portrait',
    prompt: 'Macro studio portrait of a woman with bioluminescent freckles and glass jewelry, 85mm f/1.2 soft octabox studio lighting',
    detectedGenre: 'Photorealism & Fashion',
    chosenModel: 'Photoreal-Tensor 8K (Custom Diffusion)',
    vram: '18.6 GB',
    latency: '1.48s',
    steps: 32,
    guidance: 7.0,
    previewImg: Images.bannerCyberCyborg,
    confidence: '98.9%'
  },
  {
    id: 'nature',
    title: 'Ethereal Underwater Ecosystem',
    prompt: 'Bioluminescent deep ocean reef with glowing jellyfish swarms, caustic light rays refracting through crystal clear waters',
    detectedGenre: 'Nature & Organic Flow',
    chosenModel: 'CogVideo-Diffusion v2 + Oceanic Latent Engine',
    vram: '12.8 GB',
    latency: '0.98s',
    steps: 24,
    guidance: 5.5,
    previewImg: Images.bannerBioluminescentOcean,
    confidence: '99.7%'
  }
];

export default function ModelRouterPlayground() {
  const [selectedPresetId, setSelectedPresetId] = useState('cinematic');
  const [customPrompt, setCustomPrompt] = useState(ROUTING_PRESETS[0].prompt);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState([]);

  const currentPreset = ROUTING_PRESETS.find(p => p.id === selectedPresetId) || ROUTING_PRESETS[0];

  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setCustomPrompt(preset.prompt);
  };

  const handleRunRouting = () => {
    setIsSimulating(true);
    setSimulationLogs(['[0.00ms] Tokenizing prompt embeddings (CLIP-ViT-L/14)...']);

    setTimeout(() => {
      setSimulationLogs(prev => [...prev, '[12.4ms] Intent extracted: ' + currentPreset.detectedGenre]);
    }, 200);

    setTimeout(() => {
      setSimulationLogs(prev => [...prev, `[24.1ms] Routing score: ${currentPreset.chosenModel} (Confidence: ${currentPreset.confidence})`]);
    }, 450);

    setTimeout(() => {
      setSimulationLogs(prev => [...prev, `[58.0ms] Dynamic VRAM allocated: ${currentPreset.vram} across 8x H100 GPUs`]);
      setSimulationLogs(prev => [...prev, `[1.24s] Generation complete. Lossless 4K upscale ready.`]);
      setIsSimulating(false);
    }, 800);
  };

  return (
    <section className="router-playground-section" id="router-demo">
      <div className="router-playground-container">
        
        <div className="router-header">
          <div className="router-badge">
            <span className="badge-text">LIVE MODEL ROUTER SIMULATOR</span>
          </div>
          <h2 className="router-title">Test the Dynamic Semantic Router</h2>
          <p className="router-subtitle">
            Observe how our inference coordinator parses linguistic context and routes to the ideal neural weights in real time.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="router-presets-bar">
          {ROUTING_PRESETS.map((preset) => (
            <button
              key={preset.id}
              className={`router-preset-btn ${selectedPresetId === preset.id ? 'active' : ''}`}
              onClick={() => handleSelectPreset(preset)}
            >
              <Zap size={14} className="preset-icon" />
              <span>{preset.title}</span>
            </button>
          ))}
        </div>

        {/* Playground Grid */}
        <div className="router-grid">
          
          {/* Left Column: Input & Terminal Output */}
          <div className="router-control-col">
            <div className="router-input-box">
              <label className="router-input-label">Prompt Input</label>
              <textarea 
                className="router-textarea"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={3}
              />
              <div className="router-input-actions">
                <span className="token-count">{customPrompt.split(' ').length} words | 38 tokens</span>
                <button 
                  className={`btn-route-exec ${isSimulating ? 'loading' : ''}`}
                  onClick={handleRunRouting}
                  disabled={isSimulating}
                >
                  <Play size={14} />
                  <span>{isSimulating ? 'Routing Inference...' : 'Simulate Routing'}</span>
                </button>
              </div>
            </div>

            {/* Live Model Decision telemetry cards */}
            <div className="router-telemetry-cards">
              <div className="telemetry-box">
                <span className="telemetry-dim">Target Model</span>
                <span className="telemetry-bold">{currentPreset.chosenModel}</span>
              </div>
              <div className="telemetry-box">
                <span className="telemetry-dim">Confidence</span>
                <span className="telemetry-bold text-green">{currentPreset.confidence}</span>
              </div>
              <div className="telemetry-box">
                <span className="telemetry-dim">VRAM Footprint</span>
                <span className="telemetry-bold text-purple">{currentPreset.vram}</span>
              </div>
              <div className="telemetry-box">
                <span className="telemetry-dim">Est. Latency</span>
                <span className="telemetry-bold text-cyan">{currentPreset.latency}</span>
              </div>
            </div>

            {/* Terminal Log Console */}
            <div className="router-terminal">
              <div className="terminal-top">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="terminal-title">Inference Engine Log</span>
              </div>
              <div className="terminal-body">
                {simulationLogs.length > 0 ? (
                  simulationLogs.map((log, idx) => (
                    <div key={idx} className="terminal-line">{log}</div>
                  ))
                ) : (
                  <div className="terminal-line placeholder">
                    Click "Simulate Routing" to trace token dispatch and memory allocation...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Output Visualization */}
          <div className="router-output-col">
            <div className="router-preview-card">
              <div className="preview-media-wrapper">
                <img 
                  src={currentPreset.previewImg} 
                  alt={currentPreset.title}
                  className={`router-preview-img ${isSimulating ? 'blur-pulse' : ''}`}
                />
                <div className="preview-top-badge">
                  <CheckCircle2 size={13} className="check-icon" />
                  <span>4K Lossless Quantized Output</span>
                </div>
                <div className="preview-bottom-stats">
                  <span>Steps: {currentPreset.steps}</span>
                  <span>CFG Scale: {currentPreset.guidance}</span>
                  <span>Sampler: Euler-A FLOP8</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
