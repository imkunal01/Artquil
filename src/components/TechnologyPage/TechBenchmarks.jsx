import React from 'react';
import './TechBenchmarks.css';
import { Gauge, CheckCircle2, XCircle, Zap, Shield, Sparkles } from 'lucide-react';

const BENCHMARKS = [
  {
    metric: "4K 60FPS Video First Preview Latency",
    cognexa: "0.85 seconds",
    traditional: "3.40 seconds",
    competitor: "4.20 seconds",
    winner: "cognexa",
    gain: "4.0x Faster"
  },
  {
    metric: "Cross-Frame Temporal Consistency (SSIM Score)",
    cognexa: "0.968 (Zero flicker)",
    traditional: "0.812 (Jitter artifacts)",
    competitor: "0.874 (Frame drift)",
    winner: "cognexa",
    gain: "+19.2% Consistency"
  },
  {
    metric: "Automated Audio & Voiceover Sync Drift",
    cognexa: "0.0ms (Sample-accurate)",
    traditional: "180ms (Phase latency)",
    competitor: "120ms (Desynced lips)",
    winner: "cognexa",
    gain: "Lossless Sync"
  },
  {
    metric: "AWS GPU Cluster VRAM & FLOP Footprint",
    cognexa: "14.2 GB (FP8 Quantized)",
    traditional: "24.0 GB (FP32 baseline)",
    competitor: "22.0 GB (Mixed)",
    winner: "cognexa",
    gain: "-40.8% Footprint"
  }
];

export default function TechBenchmarks() {
  return (
    <section className="tech-benchmarks-section">
      <div className="tech-benchmarks-container">
        
        <div className="benchmarks-header">
          <div className="benchmarks-badge">
            <span className="badge-text">BENCHMARKS &amp; PERFORMANCE</span>
          </div>
          <h2 className="benchmarks-title">Engineering Beyond Generic Video APIs</h2>
          <p className="benchmarks-subtitle">
            Measured against standard video diffusion pipelines on AWS GPU clusters under concurrent enterprise load.
          </p>
        </div>

        {/* Benchmarks Table */}
        <div className="benchmarks-table-wrapper">
          <table className="benchmarks-table">
            <thead>
              <tr>
                <th className="th-metric">Benchmark Dimension</th>
                <th className="th-cognexa">Artquil Multi-Model Engine</th>
                <th className="th-standard">Standard Video Diffusion</th>
                <th className="th-competitor">Generic Cloud APIs</th>
                <th className="th-gain">Engine Advantage</th>
              </tr>
            </thead>
            <tbody>
              {BENCHMARKS.map((row, idx) => (
                <tr key={idx}>
                  <td className="td-metric">
                    <span className="metric-name">{row.metric}</span>
                  </td>
                  <td className="td-cognexa">
                    <div className="val-cognexa-pill">
                      <Zap size={13} className="val-icon" />
                      <span>{row.cognexa}</span>
                    </div>
                  </td>
                  <td className="td-val">{row.traditional}</td>
                  <td className="td-val">{row.competitor}</td>
                  <td className="td-gain">
                    <span className="gain-badge">{row.gain}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
