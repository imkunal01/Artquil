import React, { useState } from 'react';
import './MultiModelPipeline.css';
import { Cpu, Zap, Layers, Sparkles, Server, ShieldCheck, Activity, Gauge } from 'lucide-react';
import Images from '../../assets/images';

export default function MultiModelPipeline() {
  const [activePipelineTab, setActivePipelineTab] = useState('routing');
  const [activeMetricHover, setActiveMetricHover] = useState(null);

  return (
    <section className="pipeline-section" id="architecture">
      <div className="pipeline-container">

        {/* Section 1: Multi-Model Pipeline (Left Text, Right Visual) */}
        <div className="pipeline-row pipeline-row-1">
          {/* Left Text Column */}
          <div className="pipeline-text-col">
            <div className="pipeline-badge">
              <span className="pipeline-badge-text">PIPELINE</span>
            </div>

            <h2 className="pipeline-title">
              The right model for every prompt
            </h2>

            <p className="pipeline-desc">
              Artquil runs a multi-model pipeline that routes each request to specialized video diffusion &amp; audio synthesis models,
              refines composition, motion, and detail, and returns a clean, high-quality 4K video you can ship — complete with synchronized voiceover and score.
            </p>

            {/* Metric Pills (Matching Screenshot 2) */}
            <div className="pipeline-metrics-row">
              <div 
                className={`pipeline-metric-chip ${activeMetricHover === '4k' ? 'hovered' : ''}`}
                onMouseEnter={() => setActiveMetricHover('4k')}
                onMouseLeave={() => setActiveMetricHover(null)}
              >
                <span className="metric-chip-value">4K output</span>
              </div>

              <div 
                className={`pipeline-metric-chip ${activeMetricHover === 'preview' ? 'hovered' : ''}`}
                onMouseEnter={() => setActiveMetricHover('preview')}
                onMouseLeave={() => setActiveMetricHover(null)}
              >
                <span className="metric-chip-value">&lt;1s first preview</span>
              </div>

              <div 
                className={`pipeline-metric-chip ${activeMetricHover === 'render' ? 'hovered' : ''}`}
                onMouseEnter={() => setActiveMetricHover('render')}
                onMouseLeave={() => setActiveMetricHover(null)}
              >
                <span className="metric-chip-value">&lt;8s final render</span>
              </div>

              <div 
                className={`pipeline-metric-chip ${activeMetricHover === 'styles' ? 'hovered' : ''}`}
                onMouseEnter={() => setActiveMetricHover('styles')}
                onMouseLeave={() => setActiveMetricHover(null)}
              >
                <span className="metric-chip-value">30+ styles</span>
              </div>
            </div>

            {/* Feature List Details */}
            <div className="pipeline-subfeatures">
              <div className="pipeline-subfeature-item">
                <div className="subfeature-icon-wrapper">
                  <Layers size={16} />
                </div>
                <div>
                  <h4 className="subfeature-title">Intelligent Semantic Routing</h4>
                  <p className="subfeature-text">Dissects prompt syntax, lighting, and composition to select between Flux, SDXL, and custom LoRAs in &lt;15ms.</p>
                </div>
              </div>

              <div className="pipeline-subfeature-item">
                <div className="subfeature-icon-wrapper">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="subfeature-title">Automated Latent Upscaling</h4>
                  <p className="subfeature-text">High-frequency detail refinement synthesizes skin pores, cloth weaves, and ray-traced reflections losslessly.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Column (Screenshot 2 Match) */}
          <div className="pipeline-visual-col">
            <div className="pipeline-visual-card">
              <div className="pipeline-card-glow-bg"></div>
              
              <div className="pipeline-img-frame">
                <img 
                  src={Images.techPipelineFlow} 
                  alt="Multi-Model AI Workflow Pipeline" 
                  className="pipeline-main-img"
                />

                {/* Floating Interactive HUD Tags */}
                <div className="pipeline-hud-tag tag-input">
                  <div className="hud-pulse-dot"></div>
                  <span>Input Prompts &amp; Embeddings</span>
                </div>

                <div className="pipeline-hud-tag tag-models">
                  <div className="hud-pulse-dot purple"></div>
                  <span>Multi-Model Selection Hub</span>
                </div>

                <div className="pipeline-hud-tag tag-output">
                  <div className="hud-pulse-dot cyan"></div>
                  <span>Production 4K Master</span>
                </div>
              </div>

              <div className="pipeline-card-footer-bar">
                <div className="pipeline-status-indicator">
                  <Activity size={13} className="indicator-live-icon" />
                  <span>Pipeline Latency: <strong>1.12s avg</strong></span>
                </div>
                <div className="pipeline-model-count">
                  <span>Routing Pool: <strong>14 Dynamic Weights</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Rendering Pipeline (Left Visual, Right Text) */}
        <div className="pipeline-row pipeline-row-2">
          {/* Left Visual Column: GPU Matrix (Screenshot 2 Match) */}
          <div className="pipeline-visual-col">
            <div className="pipeline-visual-card gpu-card">
              <div className="pipeline-card-glow-bg purple"></div>
              
              <div className="pipeline-img-frame">
                <img 
                  src={Images.techGpuMatrix} 
                  alt="High-Throughput GPU Inference Matrix" 
                  className="pipeline-main-img"
                />

                {/* Floating Telemetry Stats */}
                <div className="gpu-telemetry-overlay">
                  <div className="telemetry-item">
                    <span className="telemetry-label">CUDA Cores Active</span>
                    <span className="telemetry-val">128,400</span>
                  </div>
                  <div className="telemetry-item">
                    <span className="telemetry-label">Tensor Parallelism</span>
                    <span className="telemetry-val">8-Way NVLink</span>
                  </div>
                  <div className="telemetry-item">
                    <span className="telemetry-label">FP8 Throughput</span>
                    <span className="telemetry-val">1.8 PFLOPS</span>
                  </div>
                </div>
              </div>

              <div className="pipeline-card-footer-bar">
                <div className="pipeline-status-indicator">
                  <Server size={13} className="indicator-live-icon" />
                  <span>Fleet Health: <strong>100% Operational</strong></span>
                </div>
                <div className="pipeline-model-count">
                  <span>Edge Clusters: <strong>32 Global Regions</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Column: Fast renders without losing detail */}
          <div className="pipeline-text-col">
            <div className="pipeline-badge rendering">
              <span className="pipeline-badge-text">RENDERING PIPELINE</span>
            </div>

            <h2 className="pipeline-title">
              Fast renders without losing detail
            </h2>

            <p className="pipeline-desc">
              Sub-second latency pipeline with adaptive resolution sampling, distributed tensor parallel
              inference, and lossless upscale quantization. Built on custom CUDA 12 kernels optimized for
              peak FLOP efficiency.
            </p>

            {/* Metric Pills (Matching Screenshot 2 Bottom) */}
            <div className="pipeline-metrics-row">
              <div className="pipeline-metric-chip">
                <span className="metric-chip-value">Zero cold starts</span>
              </div>

              <div className="pipeline-metric-chip">
                <span className="metric-chip-value">99.99% uptime</span>
              </div>

              <div className="pipeline-metric-chip">
                <span className="metric-chip-value">Global edge nodes</span>
              </div>

              <div className="pipeline-metric-chip">
                <span className="metric-chip-value">FP8 acceleration</span>
              </div>
            </div>

            {/* Subfeature items */}
            <div className="pipeline-subfeatures">
              <div className="pipeline-subfeature-item">
                <div className="subfeature-icon-wrapper">
                  <Zap size={16} />
                </div>
                <div>
                  <h4 className="subfeature-title">Kernel-Fused Attention (FlashAttn-3)</h4>
                  <p className="subfeature-text">Eliminates memory bandwidth bottlenecks in cross-attention layers, reducing generation latency by 4.2x.</p>
                </div>
              </div>

              <div className="pipeline-subfeature-item">
                <div className="subfeature-icon-wrapper">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="subfeature-title">Real-Time In-Flight Batching</h4>
                  <p className="subfeature-text">Dynamic token queueing automatically consolidates concurrent requests without adding latency spikes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
