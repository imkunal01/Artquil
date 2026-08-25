import React, { useState } from 'react';
import './TechStackSection.css';
import { Layers, Server, Cpu, Database, Activity, Check, ExternalLink, Info } from 'lucide-react';

const STACK_DATA = [
  {
    category: "Frontend",
    description: "Ultra-responsive client interface with sub-100ms first input delay and zero CLS.",
    items: [
      { name: "React 19", highlight: true, note: "Server Actions & Concurrent Transitions" },
      { name: "TanStack Start", highlight: false, note: "Type-Safe Fullstack SSR & Streaming" },
      { name: "Tailwind v4", highlight: false, note: "Zero-runtime CSS engine" }
    ]
  },
  {
    category: "API Gateway",
    description: "Distributed edge routing with DDoS mitigation, JWT auth, and &lt;10ms cold start latency.",
    items: [
      { name: "Cloudflare Workers", highlight: true, note: "300+ Edge Data Centers globally" },
      { name: "Edge runtime", highlight: false, note: "V8 Isolate micro-containers" }
    ]
  },
  {
    category: "Inference",
    description: "High-throughput GPU inference cluster with custom CUDA kernels and FP8 tensor parallelization.",
    items: [
      { name: "PyTorch", highlight: false, note: "TorchDynamo + Inductor 2.5 compile" },
      { name: "Triton", highlight: true, note: "Custom FlashAttention-3 GPU kernels" },
      { name: "CUDA 12", highlight: false, note: "Tensor Core FP8/FP16 quantization" }
    ]
  },
  {
    category: "Storage",
    description: "Multi-region distributed database and high-speed object storage for generated 4K video assets.",
    items: [
      { name: "Postgres", highlight: false, note: "Distributed multi-tenant ACID state" },
      { name: "R2", highlight: true, note: "Zero-egress multi-region asset bucket" },
      { name: "Vector DB", highlight: false, note: "1536-dim semantic prompt embeddings" }
    ]
  },
  {
    category: "Observability",
    description: "Real-time telemetry, GPU node health tracking, tracing, and automated failure self-healing.",
    items: [
      { name: "OpenTelemetry", highlight: false, note: "Distributed end-to-end tracing" },
      { name: "Grafana", highlight: true, note: "Live GPU temperature & VRAM dashboards" },
      { name: "Sentry", highlight: false, note: "Automated real-time error triaging" }
    ]
  }
];

export default function TechStackSection() {
  const [selectedTech, setSelectedTech] = useState(null);

  const handleTechClick = (item, category) => {
    if (selectedTech?.name === item.name) {
      setSelectedTech(null);
    } else {
      setSelectedTech({ ...item, category });
    }
  };

  return (
    <section className="tech-stack-section" id="stack">
      <div className="tech-stack-container">
        
        {/* Header (Screenshot 3 Match) */}
        <div className="tech-stack-header">
          <div className="tech-stack-badge">
            <span className="badge-text">STACK</span>
          </div>

          <h2 className="tech-stack-title">
            Built for speed, scale <span className="tech-stack-accent">and trust.</span>
          </h2>

          <p className="tech-stack-subtitle">
            Modern, fast and reliable — from edge to inference.
          </p>
        </div>

        {/* Tech Stack Matrix Table Container (Screenshot 3 Match) */}
        <div className="tech-stack-card">
          <div className="tech-stack-table">
            {STACK_DATA.map((row, idx) => (
              <div key={idx} className="tech-stack-row">
                {/* Category Column (Left) */}
                <div className="tech-stack-cat-col">
                  <span className="cat-name">{row.category}</span>
                </div>

                {/* Pill Badges (Right) */}
                <div className="tech-stack-pills-col">
                  {row.items.map((item, itemIdx) => {
                    const isSelected = selectedTech?.name === item.name;
                    return (
                      <button
                        key={itemIdx}
                        className={`tech-pill-badge ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleTechClick(item, row.category)}
                        title={`Click to view details for ${item.name}`}
                      >
                        <span className="pill-title">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Tech Inspector Detail Drawer */}
          {selectedTech && (
            <div className="tech-inspector-drawer">
              <div className="inspector-header">
                <div className="inspector-tag-group">
                  <span className="inspector-cat">{selectedTech.category}</span>
                  <span className="inspector-name">{selectedTech.name}</span>
                </div>
                <button 
                  className="inspector-close-btn"
                  onClick={() => setSelectedTech(null)}
                >
                  ✕
                </button>
              </div>
              <p className="inspector-note">
                <Info size={14} className="inspector-icon" />
                <strong>Architecture Role:</strong> {selectedTech.note}
              </p>
            </div>
          )}
        </div>

        {/* Infrastructure Highlights Grid */}
        <div className="tech-infra-grid">
          <div className="infra-card">
            <div className="infra-metric">&lt; 15ms</div>
            <div className="infra-title">Edge Model Routing</div>
            <p className="infra-desc">Smart LLM intent classifier routes to specialized diffusion checkpoints instantly.</p>
          </div>

          <div className="infra-card">
            <div className="infra-metric">99.99%</div>
            <div className="infra-title">Global Inference Uptime</div>
            <p className="infra-desc">Multi-region GPU node failover with automatic load balancing across 32 zones.</p>
          </div>

          <div className="infra-card">
            <div className="infra-metric">0 Egress</div>
            <div className="infra-title">High-Speed CDN Delivery</div>
            <p className="infra-desc">Direct Cloudflare R2 presigned streaming for sub-second 4K video playback.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
