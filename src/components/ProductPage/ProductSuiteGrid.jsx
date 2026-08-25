import React, { useState } from 'react';
import './ProductSuiteGrid.css';
import { 
  Sparkles, 
  Layers, 
  Wand2, 
  Copy, 
  Code2, 
  Eye, 
  ArrowUpRight, 
  Check, 
  Play
} from 'lucide-react';

export const SUITE_PRODUCTS = [
  {
    id: 'studio',
    tag: 'FLAGSHIP',
    tagVariant: 'purple',
    title: 'Artquil Studio',
    icon: Sparkles,
    description: 'Our flagship text-to-image and video workspace — write a prompt, pick a style, ship studio-quality visuals in seconds.',
    pills: [
      '4K output',
      '30+ styles',
      'Negative prompts',
      'Seed control',
      'Aspect presets',
      'Prompt history'
    ],
    highlight: 'Single-prompt generation pipeline'
  },
  {
    id: 'brand-engine',
    tag: 'ENTERPRISE',
    tagVariant: 'blue',
    title: 'Brand Engine',
    icon: Layers,
    description: 'Fine-tune Artquil on your brand identity from as few as 12 reference images, so every render stays on-brand.',
    pills: [
      'LoRA fine-tuning',
      'Brand lock',
      'Asset library',
      'Team workspaces',
      'Approvals',
      'Version history'
    ],
    highlight: 'Zero brand drift guarantee'
  },
  {
    id: 'smart-editor',
    tag: 'PRO',
    tagVariant: 'purple-soft',
    title: 'Smart Editor',
    icon: Wand2,
    description: 'Inpaint, outpaint, swap backgrounds and remove objects with a click — no Photoshop required.',
    pills: [
      'AI Inpainting',
      'Outpainting',
      'Background swap',
      'Object removal',
      'Magic eraser',
      'Layer history'
    ],
    highlight: 'Non-destructive canvas'
  },
  {
    id: 'batch-generator',
    tag: 'SCALE',
    tagVariant: 'cyan',
    title: 'Batch Generator',
    icon: Copy,
    description: 'Hundreds of variations from one prompt. Upload a CSV and get ready-to-publish creatives at scale.',
    pills: [
      'CSV imports',
      'Variable templating',
      'Variation grids',
      'Bulk ZIP',
      'Webhook delivery',
      'Scheduled runs'
    ],
    highlight: '10,000+ renders per hour'
  },
  {
    id: 'developer-api',
    tag: 'BUILD',
    tagVariant: 'indigo',
    title: 'Developer API',
    icon: Code2,
    description: 'A clean REST API with SDKs, streaming responses and webhooks to drop generation into any product.',
    pills: [
      'REST + webhooks',
      'JS / Python / Go',
      'Streaming',
      '99.9% SLA',
      'Free tier',
      'Pay-as-you-go'
    ],
    highlight: '<200ms initial response'
  },
  {
    id: 'vision-multimodal',
    tag: 'NEW · BETA',
    tagVariant: 'pink-gradient',
    title: 'Artquil Vision',
    icon: Eye,
    description: 'Beyond generation — caption, describe, moderate and analyze visual content with our multimodal model.',
    pills: [
      'Captioning',
      'Object detection',
      'Moderation',
      'OCR',
      'Visual search',
      'Alt-text'
    ],
    highlight: 'Multimodal analysis model'
  }
];

export default function ProductSuiteGrid({ onSelectProduct }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="suite-grid-section" id="products-grid">
      <div className="suite-grid-container">
        
        {/* Section Header (Matching Screenshot 1) */}
        <div className="suite-header">
          <span className="suite-top-tag">OUR PRODUCTS</span>
          
          <h2 className="suite-title">
            A complete generative imaging <span className="font-serif-accent text-gradient-purple-cyan">suite.</span>
          </h2>

          <p className="suite-subtitle">
            Six products. One platform. Built from the ground up by Artquil AI.
          </p>
        </div>

        {/* 6 Cards 3x2 Grid (Matching Screenshot 1) */}
        <div className="suite-cards-grid">
          {SUITE_PRODUCTS.map((product) => {
            const Icon = product.icon;
            const isHovered = hoveredCard === product.id;

            return (
              <div 
                key={product.id}
                className={`suite-card tag-theme-${product.tagVariant} ${isHovered ? 'card-hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onSelectProduct && onSelectProduct(product.id)}
              >
                {/* Ambient glow in card background */}
                <div className="card-ambient-glow"></div>

                <div className="suite-card-inner">
                  {/* Top Row: Tag + Icon */}
                  <div className="card-top-row">
                    <span className={`product-badge badge-${product.tagVariant}`}>
                      {product.tag}
                    </span>
                    <div className="card-icon-bubble">
                      <Icon size={16} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="card-product-title">{product.title}</h3>
                  <p className="card-product-desc">{product.description}</p>

                  {/* Feature Badges / Pills (Matching Screenshot 1) */}
                  <div className="card-pills-wrap">
                    {product.pills.map((pill, pIdx) => (
                      <span key={pIdx} className="pill-badge">
                        {pill}
                      </span>
                    ))}
                  </div>

                  {/* Card Footer Micro Highlight */}
                  <div className="card-footer-meta">
                    <span className="meta-highlight-text">
                      <Check size={13} className="meta-check-icon" />
                      {product.highlight}
                    </span>
                    <span className="meta-action-link">
                      Explore <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
