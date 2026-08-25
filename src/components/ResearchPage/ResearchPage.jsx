import React, { useEffect, useState } from 'react';
import './ResearchPage.css';
import { 
  BookOpen, FileText, Download, Sparkles, ExternalLink, ArrowRight, 
  CheckCircle, Copy, Sliders, Layers, Cpu, Compass, GitBranch, Terminal
} from 'lucide-react';
import CTABanner from '../CTABanner';
import Images from '../../assets/images';

const PAPERS = [
  {
    id: "semantic-routing-2026",
    title: "Multi-Model Semantic Routing via Latent Vector Disentanglement",
    conference: "CVPR 2026 (Oral Presentation)",
    authors: "R. Solankar, R. Singh, G. Kumar, Y. Prajapati",
    abstract: "We introduce a high-throughput routing layer that maps unstructured natural language prompts into low-dimensional semantic manifold projections, dispatching generation tokens across specialized diffusion backbones with 99.4% intent fidelity and sub-15ms overhead.",
    pdfSize: "2.4 MB PDF",
    tags: ["Latent Spaces", "Semantic Routing", "Multi-Model AI"],
    bibtex: `@inproceedings{solankar2026multimodel,
  title={Multi-Model Semantic Routing via Latent Vector Disentanglement},
  author={Solankar, Riya and Singh, Rohit and Kumar, Gaurav and Prajapati, Yogita},
  booktitle={IEEE Conference on Computer Vision and Pattern Recognition (CVPR)},
  year={2026}
}`
  },
  {
    id: "flashattn-diffusion-2025",
    title: "FlashAttn-Diffusion: Sub-Second 4K Video Generation on Distributed FP8 Clusters",
    conference: "NeurIPS 2025",
    authors: "R. Singh, R. Solankar, A. Yadav, A. Yadav",
    abstract: "A novel kernel-fused cross-attention architecture eliminating memory bandwidth saturation in high-resolution video diffusion models. Demonstrates 4.2x latency speedup while maintaining strict frame-to-frame temporal consistency.",
    pdfSize: "1.8 MB PDF",
    tags: ["CUDA 12", "FlashAttention", "FP8 Quantization"],
    bibtex: `@article{singh2025flashattn,
  title={FlashAttn-Diffusion: Sub-Second 4K Video Generation on Distributed FP8 Clusters},
  author={Singh, Rohit and Solankar, Riya and Yadav, Aman and Yadav, Ankesh},
  journal={Advances in Neural Information Processing Systems (NeurIPS)},
  year={2025}
}`
  },
  {
    id: "temporal-audio-sync-2025",
    title: "Temporal Cross-Frame Audio & Lip Synchronization in Latent Video Diffusion",
    conference: "ICML 2025",
    authors: "G. Kumar, R. Solankar, R. Singh, Y. Prajapati",
    abstract: "End-to-end multimodal joint training framework enabling automated phoneme-to-motion alignment and dynamic acoustic ambience generation directly within diffusion latent passes.",
    pdfSize: "3.1 MB PDF",
    tags: ["Audio-Video Sync", "Multimodal", "LipSync"],
    bibtex: `@inproceedings{kumar2025temporal,
  title={Temporal Cross-Frame Audio & Lip Synchronization in Latent Video Diffusion},
  author={Kumar, Gaurav and Solankar, Riya and Singh, Rohit and Prajapati, Yogita},
  booktitle={International Conference on Machine Learning (ICML)},
  year={2025}
}`
  }
];

const OPEN_MODELS = [
  {
    name: "Artquil-Flux-FP8-v1.1",
    desc: "Lossless FP8 quantized weights for ultra-fast 4K single-step video previews.",
    downloads: "240k+",
    license: "Apache 2.0",
    size: "11.4 GB",
    repo: "huggingface.co/artquil/artquil-flux-fp8"
  },
  {
    name: "Latent-AudioSync-Pro",
    desc: "Zero-drift lip synchronization and ambient sound generation model.",
    downloads: "185k+",
    license: "OpenRAIL-M",
    size: "4.8 GB",
    repo: "huggingface.co/artquil/latent-audiosync"
  },
  {
    name: "Artquil-Router-Embeddings",
    desc: "1536-dimensional semantic intent classifier for multi-model video diffusion dispatch.",
    downloads: "92k+",
    license: "MIT",
    size: "1.2 GB",
    repo: "huggingface.co/artquil/semantic-router"
  }
];

export default function ResearchPage() {
  const [downloadingIdx, setDownloadingIdx] = useState(null);
  const [activeBibtexPaper, setActiveBibtexPaper] = useState(null);
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  // Latent Space Interpolation Slider
  const [latentAlpha, setLatentAlpha] = useState(40);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Research & AI Lab Publications — Artquil AI Prompt-to-Video Platform';
  }, []);

  const handleDownload = (idx) => {
    setDownloadingIdx(idx);
    setTimeout(() => {
      setDownloadingIdx(null);
    }, 1200);
  };

  const handleCopyBibtex = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  return (
    <div className="research-page-wrapper">
      
      {/* 1. Hero */}
      <section className="research-hero-section">
        <div className="research-hero-glow"></div>
        <div className="research-hero-container">
          <div className="research-badge-pill">
            <span className="research-badge-text">AI RESEARCH &amp; FOUNDATION LABS</span>
          </div>

          <h1 className="research-hero-title">
            Pushing the frontiers of<br />
            <span className="research-accent">generative intelligence.</span>
          </h1>

          <p className="research-hero-subtitle">
            Our research team publishes open science benchmarks, develops novel diffusion architectures,
            and releases foundational model weights for high-fidelity video synthesis.
          </p>
        </div>
      </section>

      {/* 2. Interactive Latent Space Interpolation Playground */}
      <section className="research-latent-section">
        <div className="research-latent-container">
          <div className="latent-header">
            <span className="research-kicker">INTERACTIVE RESEARCH DEMO</span>
            <h2 className="research-section-title">Latent Space Manifold Interpolation</h2>
            <p className="research-section-sub">
              Explore smooth linear interpolation between two orthogonal latent vectors: Oriental Aesthetic vs Cyberpunk Sci-Fi.
            </p>
          </div>

          <div className="latent-canvas-card">
            {/* Interpolated Visual Frame */}
            <div className="latent-images-comparison">
              <div className="latent-frame-box">
                <img 
                  src={latentAlpha < 50 ? Images.techFujiArtwork : Images.bannerScifiSingularity} 
                  alt="Latent Vector A / B" 
                  className="latent-visual-img"
                  style={{
                    filter: `hue-rotate(${latentAlpha * 1.8}deg) saturate(${1 + latentAlpha / 100})`
                  }}
                />
                
                <div className="latent-hud-badge top-left">
                  <span>Vector A: <strong>Oriental Landscape (α = {100 - latentAlpha}%)</strong></span>
                </div>
                <div className="latent-hud-badge top-right">
                  <span>Vector B: <strong>Cyberpunk Matrix (β = {latentAlpha}%)</strong></span>
                </div>
              </div>

              {/* Slider Control */}
              <div className="latent-controls-bar">
                <div className="latent-slider-row">
                  <span className="latent-end-label">Vector A (Nature)</span>
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={latentAlpha}
                    onChange={(e) => setLatentAlpha(Number(e.target.value))}
                    className="latent-slider"
                  />
                  <span className="latent-end-label">Vector B (Sci-Fi)</span>
                </div>

                <div className="latent-telemetry-row">
                  <span>Cosine Similarity: <strong>{(0.842 - (latentAlpha / 400)).toFixed(3)}</strong></span>
                  <span>Latent Dimensions: <strong>1,536-D SVD</strong></span>
                  <span>Cross-Attention Entropy: <strong>{(1.24 + (latentAlpha / 250)).toFixed(2)}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Published Papers List */}
      <section className="research-papers-section">
        <div className="research-papers-container">
          <div className="papers-header-row">
            <div>
              <span className="research-kicker">PEER-REVIEWED RESEARCH</span>
              <h2 className="research-section-title">Selected Publications</h2>
            </div>
          </div>
          
          <div className="papers-list">
            {PAPERS.map((paper, idx) => (
              <div key={idx} className="paper-card">
                <div className="paper-header">
                  <span className="paper-conf">{paper.conference}</span>
                  <div className="paper-tags">
                    {paper.tags.map((t, tIdx) => (
                      <span key={tIdx} className="paper-tag-chip">{t}</span>
                    ))}
                  </div>
                </div>

                <h3 className="paper-title">{paper.title}</h3>
                <p className="paper-authors">{paper.authors}</p>
                <p className="paper-abstract">{paper.abstract}</p>

                <div className="paper-footer">
                  <button 
                    className="btn-download-pdf"
                    onClick={() => handleDownload(idx)}
                  >
                    {downloadingIdx === idx ? (
                      <>
                        <CheckCircle size={14} className="text-green" />
                        <span>Downloaded PDF</span>
                      </>
                    ) : (
                      <>
                        <Download size={14} />
                        <span>Download Paper ({paper.pdfSize})</span>
                      </>
                    )}
                  </button>

                  <button 
                    className="paper-bibtex-btn"
                    onClick={() => setActiveBibtexPaper(paper)}
                  >
                    <BookOpen size={14} />
                    <span>View BibTeX</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Open Source Model Weights Hub */}
      <section className="research-models-section">
        <div className="research-models-container">
          <div className="models-header">
            <span className="research-kicker">COMMUNITY &amp; OPEN WEIGHTS</span>
            <h2 className="research-section-title">Hugging Face Checkpoints</h2>
            <p className="research-section-sub">Download production model weights for local inference or academic experimentation.</p>
          </div>

          <div className="models-grid">
            {OPEN_MODELS.map((model, idx) => (
              <div key={idx} className="model-weight-card">
                <div className="model-card-top">
                  <GitBranch size={16} className="git-icon" />
                  <span className="model-license">{model.license}</span>
                </div>
                <h4 className="model-name">{model.name}</h4>
                <p className="model-desc">{model.desc}</p>
                <div className="model-meta-row">
                  <span>Downloads: <strong>{model.downloads}</strong></span>
                  <span>Size: <strong>{model.size}</strong></span>
                </div>
                <div className="model-clone-box">
                  <code>{model.repo}</code>
                  <button 
                    className="btn-copy-repo"
                    onClick={() => navigator.clipboard.writeText(`git clone https://${model.repo}`)}
                    title="Copy Git URL"
                  >
                    <Copy size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BibTeX Modal Drawer */}
      {activeBibtexPaper && (
        <div className="bibtex-modal-overlay" onClick={() => setActiveBibtexPaper(null)}>
          <div className="bibtex-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="bibtex-modal-header">
              <h3>BibTeX Citation</h3>
              <button className="bibtex-close" onClick={() => setActiveBibtexPaper(null)}>✕</button>
            </div>
            <pre className="bibtex-code-block">
              <code>{activeBibtexPaper.bibtex}</code>
            </pre>
            <div className="bibtex-actions">
              <button 
                className="btn-copy-bibtex"
                onClick={() => handleCopyBibtex(activeBibtexPaper.bibtex)}
              >
                {copiedBibtex ? <CheckCircle size={14} className="text-green" /> : <Copy size={14} />}
                <span>{copiedBibtex ? 'Copied to Clipboard' : 'Copy Citation'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTABanner */}
      <CTABanner />

    </div>
  );
}
