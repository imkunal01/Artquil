import React from 'react';
import './ProductTechSpecs.css';
import { Cpu, Zap, ShieldCheck, Cloud, RefreshCw, Film, Server, Database } from 'lucide-react';

const SPECS_LIST = [
  {
    icon: Cloud,
    label: 'Cloud Infrastructure',
    value: 'AWS G5 & P4d GPU Clusters',
    desc: 'High-throughput autoscaling GPU fleet for parallel batch rendering and zero queue delay.'
  },
  {
    icon: Film,
    label: 'Resolution & Frame Rate',
    value: 'Native 4K UHD @ 60 FPS',
    desc: 'Uncompressed ProRes 422, H.265/HEVC, and WebM exports with HDR10 color profiles.'
  },
  {
    icon: Zap,
    label: 'Inference Latency',
    value: '< 180ms Time-to-First-Frame',
    desc: 'Sub-second real-time streaming preview pipeline with websocket token chunking.'
  },
  {
    icon: Database,
    label: 'LoRA Model Fine-Tuning',
    value: '10-12 Asset Reference Pass',
    desc: 'Brand lock engine trains custom weights in under 4 minutes with zero visual drift.'
  },
  {
    icon: RefreshCw,
    label: 'Audio Synchronization',
    value: 'Integrated Voice & SFX Pass',
    desc: 'Single pipeline produces neural speech, lip-sync, and contextual background soundtrack.'
  },
  {
    icon: ShieldCheck,
    label: 'Enterprise Security',
    value: 'SOC2 Type II & Brand Safe',
    desc: 'Automated multimodal guardrails, copyright screening, and dedicated VPC isolation.'
  }
];

export default function ProductTechSpecs() {
  return (
    <section className="tech-specs-section">
      <div className="tech-specs-container">
        
        <div className="specs-header">
          <span className="specs-pill-tag">ARCHITECTURE & INFRASTRUCTURE</span>
          <h2 className="specs-title">
            Built for enterprise-grade <span className="font-serif-accent text-gradient-purple-cyan">performance.</span>
          </h2>
          <p className="specs-subtitle">
            Artquil's unified rendering stack combines custom foundation diffusion models with high-density GPU computing on AWS.
          </p>
        </div>

        <div className="specs-grid">
          {SPECS_LIST.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <div key={idx} className="spec-card">
                <div className="spec-icon-box">
                  <Icon size={20} />
                </div>
                <div className="spec-content">
                  <span className="spec-label">{spec.label}</span>
                  <h3 className="spec-value">{spec.value}</h3>
                  <p className="spec-desc">{spec.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
