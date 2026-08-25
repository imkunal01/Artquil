import React, { useEffect, useState } from 'react';
import './AboutPage.css';
import { 
  Sparkles, Shield, Users, Target, Award, Heart, ArrowRight, 
  Globe, Zap, Cpu, CheckCircle2, Lock, Terminal, Compass, Briefcase, 
  ChevronRight, TrendingUp, Share2, Server
} from 'lucide-react';
import CTABanner from '../CTABanner';
import Images from '../../assets/images';

const STATS = [
  { value: "10M+", label: "Videos Generated", sub: "automated single pipeline", icon: Zap },
  { value: "99.99%", label: "AWS Cluster Uptime", sub: "fault-tolerant GPU failover", icon: Shield },
  { value: "< 1.2s", label: "Average 4K Latency", sub: "synchronized audio & video", icon: Cpu },
  { value: "6", label: "Core AI & MLOps Team", sub: "Prayagraj, Uttar Pradesh", icon: Users }
];

const MANIFESTO_TABS = [
  {
    id: "mission",
    title: "1. The Single-Pipeline Revolution",
    heading: "From Script to Finished Video in One Step",
    content: "Video production has traditionally been slow and expensive, requiring separate stages of scripting, filming, editing, and sound work, often involving different specialists at each step. Artquil compresses all of that into one step, making professional-quality video accessible to teams that don't have a dedicated production budget or crew.",
    highlight: "Single-Pipeline Automated Generation"
  },
  {
    id: "architecture",
    title: "2. AWS Cloud & GPU Infrastructure",
    heading: "Scalable Rendering and High-Throughput Delivery",
    content: "Behind the platform, Artquil runs on AWS, using high-performance GPU compute for model inference and cloud infrastructure to handle scalable rendering, real-time voiceover synthesis, and sub-second asset delivery across 32 global edge zones.",
    highlight: "AWS EC2 GPU Inference & Cloud Infrastructure"
  },
  {
    id: "industries",
    title: "3. Multi-Industry Creative Engine",
    heading: "Engineered for Marketing, E-Learning, Studios & Enterprise",
    content: "Marketing and advertising teams use Artquil to produce campaign creative at scale. E-learning providers generate course content. E-commerce brands create dynamic product videos. Media and entertainment studios prototype concepts quickly, and enterprises produce internal training material.",
    highlight: "Serving 5+ Major Global Industries"
  }
];

const TEAM = [
  {
    name: "Yogita Prajapati",
    role: "CEO / Founder",
    specialty: "Business & Company Vision",
    bio: "Leading Artquil's mission to make professional-grade AI video production accessible to creators and enterprises worldwide.",
    avatar: Images.avatarPriya,
    links: { twitter: "#", linkedin: "#", github: "#" }
  },
  {
    name: "Riya Solankar",
    role: "CTO / AI Research Lead",
    specialty: "AI/ML Strategy & Diffusion Models",
    bio: "Directing AI/ML research, multimodal diffusion architecture, and automated audio-video synchronization pipelines.",
    avatar: Images.avatarMeera,
    links: { twitter: "#", linkedin: "#", github: "#" }
  },
  {
    name: "Rohit Singh",
    role: "ML/AI Engineer",
    specialty: "Models, Inference & Motion Alignment",
    bio: "Engineering real-time video diffusion kernels, temporal frame consistency, and high-throughput inference optimization.",
    avatar: Images.avatarArjun,
    links: { twitter: "#", linkedin: "#", github: "#" }
  },
  {
    name: "Gaurav Kumar",
    role: "ML/AI Engineer",
    specialty: "Models & Experimentation",
    bio: "Focusing on diffusion model fine-tuning, audio-visual alignment, and zero-drift voiceover synchronization.",
    avatar: Images.avatarArjun,
    links: { twitter: "#", linkedin: "#", github: "#" }
  },
  {
    name: "Aman Yadav",
    role: "Full-Stack Engineer",
    specialty: "Product & Backend Systems",
    bio: "Architecting Artquil's responsive web platform, video rendering sandbox, and high-concurrency developer APIs.",
    avatar: Images.avatarMeera,
    links: { twitter: "#", linkedin: "#", github: "#" }
  },
  {
    name: "Ankesh Yadav",
    role: "MLOps / Cloud Engineer",
    specialty: "GPU & AWS Infrastructure",
    bio: "Managing scalable AWS GPU compute clusters, distributed Triton model servers, and low-latency CDN streaming.",
    avatar: Images.avatarPriya,
    links: { twitter: "#", linkedin: "#", github: "#" }
  }
];

const GLOBAL_REGIONS = [
  { name: "India Central (HQ)", city: "Prayagraj & Bengaluru", latency: "8ms", gpus: "4,800 AWS GPUs", status: "Optimal" },
  { name: "North America East", city: "Ashburn (us-east-1)", latency: "12ms", gpus: "4,096 AWS GPUs", status: "Optimal" },
  { name: "North America West", city: "Oregon (us-west-2)", latency: "18ms", gpus: "3,200 AWS GPUs", status: "Optimal" },
  { name: "Europe Central", city: "Frankfurt (eu-central-1)", latency: "24ms", gpus: "2,048 AWS GPUs", status: "Optimal" },
  { name: "Asia Pacific East", city: "Tokyo (ap-northeast-1)", latency: "29ms", gpus: "2,400 AWS GPUs", status: "Optimal" }
];

const PERKS = [
  { title: "AWS GPU Cluster Access", desc: "Our research and engineering teams have access to dedicated AWS GPU instances for model experimentation." },
  { title: "Headquartered in Prayagraj", desc: "Founded in 2026 and proudly based in Prayagraj, Uttar Pradesh, with distributed cloud teams." },
  { title: "End-to-End Multimodal Video", desc: "We solve the entire video pipeline — prompt parsing, visual diffusion, voiceover, and sound design in one step." },
  { title: "Creator & Enterprise Focus", desc: "Empowering marketing agencies, e-learning creators, e-commerce brands, and film studios worldwide." }
];

export default function AboutPage({ onOpenAuth }) {
  const [activeTab, setActiveTab] = useState('mission');
  const [activeRegion, setActiveRegion] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'About Us — Artquil AI Prompt-to-Video Generation Platform';
  }, []);

  return (
    <div className="about-page-wrapper">
      
      {/* 1. Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-glow"></div>
        <div className="about-hero-container">
          <div className="about-badge-pill">
            <span className="about-badge-text">ABOUT ARTQUIL PRIVATE LIMITED</span>
          </div>

          <h1 className="about-hero-title">
            Empowering human creativity with<br />
            <span className="about-accent">automated prompt-to-video AI.</span>
          </h1>

          <p className="about-hero-subtitle">
            Artquil Private Limited is an AI company founded in 2026 and headquartered in Prayagraj, Uttar Pradesh.
            We build a single automated pipeline that turns plain-language prompts into finished 4K videos complete with
            synchronized voiceover, background score, and sound effects.
          </p>

          {/* Quick CTA row */}
          <div className="about-hero-actions">
            <button className="about-btn-primary" onClick={() => onOpenAuth && onOpenAuth('signup')}>
              <span>Start Free with Artquil</span>
              <ArrowRight size={16} />
            </button>
            <a href="#team" className="about-btn-secondary">
              <span>Meet the Core Team</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Interactive Live Metrics Grid */}
      <section className="about-metrics-section">
        <div className="about-metrics-container">
          <div className="metrics-grid">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="metric-card-box">
                  <div className="metric-icon-circle">
                    <Icon size={18} />
                  </div>
                  <div className="metric-number-bold">{stat.value}</div>
                  <div className="metric-label-title">{stat.label}</div>
                  <div className="metric-sub-detail">{stat.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Interactive Manifesto & Architectural Vision */}
      <section className="about-manifesto-section">
        <div className="about-manifesto-container">
          <div className="manifesto-header">
            <span className="section-kicker">OUR FOUNDATIONAL MISSION</span>
            <h2 className="section-title">The Artquil Video Platform</h2>
            <p className="section-subtitle">How we compress multi-stage video production into a single, instant step.</p>
          </div>

          <div className="manifesto-card-layout">
            {/* Tabs Sidebar */}
            <div className="manifesto-tabs-col">
              {MANIFESTO_TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={`manifesto-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-title-text">{tab.title}</span>
                  <ChevronRight size={16} className="tab-chevron" />
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div className="manifesto-content-display">
              {(() => {
                const current = MANIFESTO_TABS.find(t => t.id === activeTab) || MANIFESTO_TABS[0];
                return (
                  <div className="manifesto-body-wrapper" key={current.id}>
                    <div className="manifesto-highlight-badge">
                      <Zap size={14} className="zap-icon" />
                      <span>{current.highlight}</span>
                    </div>
                    <h3 className="manifesto-display-heading">{current.heading}</h3>
                    <p className="manifesto-display-p">{current.content}</p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Global AWS GPU Infrastructure Map */}
      <section className="about-infra-section">
        <div className="about-infra-container">
          <div className="infra-header">
            <span className="section-kicker">AWS CLOUD INFRASTRUCTURE</span>
            <h2 className="section-title">High-Performance AWS GPU Compute</h2>
            <p className="section-subtitle">Scalable rendering and delivery across multi-region AWS cloud clusters.</p>
          </div>

          <div className="regions-interactive-grid">
            <div className="regions-list-col">
              {GLOBAL_REGIONS.map((region, idx) => (
                <div 
                  key={idx}
                  className={`region-item-row ${activeRegion === idx ? 'active' : ''}`}
                  onClick={() => setActiveRegion(idx)}
                >
                  <div className="region-status-dot"></div>
                  <div className="region-name-group">
                    <span className="region-name">{region.name}</span>
                    <span className="region-city">{region.city}</span>
                  </div>
                  <div className="region-stats-group">
                    <span className="region-latency">{region.latency}</span>
                    <span className="region-gpus">{region.gpus}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Node Graph Preview */}
            <div className="region-visual-card">
              <div className="radar-animation-wrapper">
                <div className="radar-circle circle-1"></div>
                <div className="radar-circle circle-2"></div>
                <div className="radar-circle circle-3"></div>
                <div className="radar-sweep"></div>
                
                {/* Active Cluster HUD Card */}
                <div className="active-cluster-hud">
                  <div className="hud-top-status">
                    <Globe size={15} className="globe-icon" />
                    <span>Active AWS Cluster: <strong>{GLOBAL_REGIONS[activeRegion].city}</strong></span>
                  </div>
                  <div className="hud-metric-row">
                    <span>Inference Ping: <strong>{GLOBAL_REGIONS[activeRegion].latency}</strong></span>
                    <span>AWS Compute: <strong>{GLOBAL_REGIONS[activeRegion].gpus}</strong></span>
                    <span className="text-green">● {GLOBAL_REGIONS[activeRegion].status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core 6-Person Team */}
      <section className="about-team-section" id="team">
        <div className="about-team-container">
          <div className="team-header">
            <span className="section-kicker">CORE TEAM</span>
            <h2 className="section-title">The Artquil Engineering &amp; Research Team</h2>
            <p className="section-subtitle">A six-person core team spanning AI research, full-stack engineering, and AWS MLOps.</p>
          </div>

          <div className="team-grid team-grid-6">
            {TEAM.map((member, idx) => (
              <div key={idx} className="team-card-enhanced">
                <div className="team-avatar-container">
                  <img src={member.avatar} alt={member.name} className="team-avatar-img" />
                  <div className="team-avatar-glow"></div>
                </div>

                <h4 className="team-member-name">{member.name}</h4>
                <div className="team-member-role">{member.role}</div>
                <div className="team-specialty-badge">{member.specialty}</div>
                <p className="team-member-bio">{member.bio}</p>

                <div className="team-social-links">
                  <a href={member.links.twitter} className="team-social-btn" aria-label="Twitter">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href={member.links.linkedin} className="team-social-btn" aria-label="LinkedIn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                  <a href={member.links.github} className="team-social-btn" aria-label="GitHub">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Company Pillars & Focus */}
      <section className="about-culture-section">
        <div className="about-culture-container">
          <div className="culture-header">
            <span className="section-kicker">COMPANY INFORMATION</span>
            <h2 className="section-title">Built in Prayagraj for the World</h2>
            <p className="section-subtitle">Founded in 2026, Artquil Private Limited is transforming video production through AI.</p>
          </div>

          <div className="perks-grid">
            {PERKS.map((perk, idx) => (
              <div key={idx} className="perk-card">
                <div className="perk-number">0{idx + 1}</div>
                <h4 className="perk-title">{perk.title}</h4>
                <p className="perk-desc">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Conversion CTA Banner */}
      <CTABanner />

    </div>
  );
}
