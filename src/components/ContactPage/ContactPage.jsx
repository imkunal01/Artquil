import React, { useState, useEffect } from 'react';
import './ContactPage.css';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Clock, 
  Globe, Calendar, Sparkles, ChevronDown, ChevronUp, Bot, User, ArrowRight
} from 'lucide-react';
import CTABanner from '../CTABanner';

const AI_BOT_FAQS = [
  {
    q: "How do I get an Enterprise API Key?",
    a: "Enterprise API keys are provisioned with custom rate limits (up to 1,000 FPS) and dedicated H100 GPU clusters. You can fill out the form on this page or schedule a 15-minute onboarding call below."
  },
  {
    q: "Can we fine-tune custom character & brand LoRAs?",
    a: "Yes! Cognexa supports custom LoRA training on as few as 15 reference images or video clips with zero-shot style adaptation in under 20 minutes."
  },
  {
    q: "What is your GPU Cluster Uptime & SLA?",
    a: "We guarantee a 99.99% uptime SLA with automated multi-region failover across our 32 global edge clusters."
  }
];

const OFFICE_CLOCKS = [
  { city: "Prayagraj & Bengaluru", tz: "Asia/Kolkata", label: "India HQ (IST)" },
  { city: "San Francisco", tz: "America/Los_Angeles", label: "US Tech Hub (PST)" },
  { city: "London", tz: "Europe/London", label: "Europe Hub (GMT)" },
  { city: "Tokyo", tz: "Asia/Tokyo", label: "APAC Hub (JST)" }
];

const TIME_SLOTS = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "07:00 PM"];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    topic: 'enterprise_api',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Live Chat Simulator State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am Artquil Copilot. How can I help you accelerate your prompt-to-video generation pipelines today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Demo Booking State
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('02:00 PM');
  const [demoBooked, setDemoBooked] = useState(false);

  // Live Clocks
  const [currentTimes, setCurrentTimes] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Contact & Support — Cognexa / Artquil AI';

    const updateClocks = () => {
      const times = {};
      OFFICE_CLOCKS.forEach(office => {
        try {
          times[office.city] = new Intl.DateTimeFormat('en-US', {
            timeZone: office.tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }).format(new Date());
        } catch {
          times[office.city] = new Date().toLocaleTimeString();
        }
      });
      setCurrentTimes(times);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', company: '', topic: 'enterprise_api', message: '' });
      }, 4000);
    }, 900);
  };

  const handleSendChatMessage = (textToSend) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'user', text }];
    setChatMessages(newMsgs);
    setChatInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      setIsBotTyping(false);
      let reply = "Thank you! Our solutions architecture team has noted your query. You can also submit the enterprise contact form on the left for direct SLA guarantees.";
      
      const lower = text.toLowerCase();
      if (lower.includes('api') || lower.includes('key')) {
        reply = "You can generate sandbox keys directly on the Developers page, or submit this contact form for dedicated 1,000+ FPS enterprise capacity.";
      } else if (lower.includes('lora') || lower.includes('train') || lower.includes('fine-tune')) {
        reply = "We offer custom automated LoRA training pipelines that deliver specialized brand character models in under 20 minutes.";
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) {
        reply = "Standard pricing starts at $0.012 per 4K generation, with volume discounts available for monthly clusters exceeding 50,000 requests.";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 700);
  };

  const handleBookDemo = () => {
    setDemoBooked(true);
    setTimeout(() => {
      setDemoBooked(false);
    }, 4000);
  };

  return (
    <div className="contact-page-wrapper">
      
      {/* 1. Hero */}
      <section className="contact-hero-section">
        <div className="contact-hero-container">
          <div className="contact-badge-pill">
            <span className="contact-badge-text">GET IN TOUCH &amp; PARTNERSHIPS</span>
          </div>

          <h1 className="contact-hero-title">
            Let's build the future of<br />
            <span className="contact-accent">creative intelligence together.</span>
          </h1>

          <p className="contact-hero-subtitle">
            Have questions about custom model fine-tuning, dedicated enterprise clusters, or API integration?
            Our solution engineering team is ready to assist.
          </p>
        </div>
      </section>

      {/* 2. Global Offices Live Clocks Bar */}
      <section className="contact-clocks-section">
        <div className="contact-clocks-container">
          <div className="clocks-grid">
            {OFFICE_CLOCKS.map((office, idx) => (
              <div key={idx} className="office-clock-card">
                <div className="clock-left">
                  <span className="clock-city">{office.city}</span>
                  <span className="clock-label">{office.label}</span>
                </div>
                <div className="clock-time-val">{currentTimes[office.city] || "--:--:--"}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Main Form & Info Grid */}
      <section className="contact-main-section">
        <div className="contact-main-container">
          
          {/* Left: Contact Info */}
          <div className="contact-info-col">
            <h3 className="info-col-heading">Direct Contact &amp; HQ</h3>
            <p className="info-col-sub">Reach out directly or drop by our engineering hubs.</p>

            <div className="contact-card-list">
              <div className="contact-info-card">
                <div className="info-icon-wrapper">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="info-card-title">Global Headquarters</h4>
                  <p className="info-card-detail">23 Mig Flats, Shiv Shakti Colony, Prayagraj, UP, India</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="info-icon-wrapper">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="info-card-title">Phone &amp; WhatsApp</h4>
                  <p className="info-card-detail">+91 80816 37568</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="info-icon-wrapper">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="info-card-title">Enterprise Email</h4>
                  <p className="info-card-detail">contact@artquil.com</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="info-icon-wrapper">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="info-card-title">Support Response SLA</h4>
                  <p className="info-card-detail">&lt; 15 minutes for Enterprise / &lt; 2 hours Standard</p>
                </div>
              </div>
            </div>

            {/* Interactive Demo Scheduler Box */}
            <div className="demo-scheduler-box">
              <div className="scheduler-header">
                <Calendar size={16} className="sched-icon" />
                <h4>Schedule a 1-on-1 AI Architecture Demo</h4>
              </div>
              <p className="sched-sub">30-minute consultation with an AI Solution Architect.</p>

              {demoBooked ? (
                <div className="demo-booked-alert">
                  <CheckCircle size={18} className="text-green" />
                  <span>Demo confirmed for {selectedDate} at {selectedSlot}! Check your calendar invite.</span>
                </div>
              ) : (
                <div className="sched-picker">
                  <div className="sched-slots-row">
                    {TIME_SLOTS.map((slot, sIdx) => (
                      <button
                        key={sIdx}
                        className={`slot-chip ${selectedSlot === slot ? 'active' : ''}`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  <button className="btn-confirm-demo" onClick={handleBookDemo}>
                    <span>Reserve Time Slot</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <h3 className="form-card-title">Send an Enterprise Inquiry</h3>
              <p className="form-card-sub">Fill out your project details and an AI solutions architect will reply promptly.</p>

              {isSuccess ? (
                <div className="contact-success-box">
                  <CheckCircle size={32} className="success-icon" />
                  <h4>Message Dispatched Successfully!</h4>
                  <p>Thank you for reaching out. We've assigned a solution engineer to review your request.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-grid-2">
                    <div className="form-field">
                      <label className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Alex Rivera"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Work Email</label>
                      <input 
                        type="email" 
                        required 
                        className="form-input" 
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-field">
                      <label className="form-label">Company / Organization</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Acme Studios"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Topic of Inquiry</label>
                      <select 
                        className="form-input form-select"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      >
                        <option value="enterprise_api">Enterprise Dedicated GPU &amp; API</option>
                        <option value="custom_lora">Custom Model Fine-Tuning &amp; LoRAs</option>
                        <option value="billing">Billing &amp; High-Volume Credits</option>
                        <option value="partnership">Partnership &amp; Research Collaboration</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Project Requirements / Message</label>
                    <textarea 
                      required 
                      rows={4}
                      className="form-input form-textarea"
                      placeholder="Tell us about your expected monthly generation volume, resolution targets, or custom integration needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={`btn-contact-submit ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="contact-spinner"></span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Interactive AI Concierge Chat Box */}
            <div className="ai-concierge-card">
              <div className="concierge-top">
                <div className="concierge-badge">
                  <Bot size={15} className="bot-icon" />
                  <span>Artquil Copilot (AI Concierge)</span>
                </div>
                <span className="concierge-status">● Online</span>
              </div>

              <div className="concierge-chat-history">
                {chatMessages.map((msg, mIdx) => (
                  <div key={mIdx} className={`chat-bubble-row ${msg.sender}`}>
                    <div className={`chat-bubble ${msg.sender}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isBotTyping && (
                  <div className="chat-bubble-row bot">
                    <div className="chat-bubble bot typing">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick FAQ Prompts */}
              <div className="concierge-faq-chips">
                {AI_BOT_FAQS.map((faq, fIdx) => (
                  <button 
                    key={fIdx}
                    className="faq-quick-chip"
                    onClick={() => handleSendChatMessage(faq.q)}
                  >
                    {faq.q}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="concierge-input-row">
                <input 
                  type="text" 
                  className="concierge-input"
                  placeholder="Ask anything about models, APIs, SLAs..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSendChatMessage(); }}
                />
                <button 
                  className="btn-concierge-send"
                  onClick={() => handleSendChatMessage()}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTABanner */}
      <CTABanner />

    </div>
  );
}
