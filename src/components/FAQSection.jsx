import React, { useState } from 'react';
import './FAQSection.css';
import { 
  Menu, 
  Hexagon, 
  Plus, 
  Clock, 
  Lock, 
  CreditCard, 
  Code, 
  Star,
  ChevronDown
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const FAQS = [
  {
    id: 1,
    icon: <Menu size={16} />,
    question: 'What does Artquil AI do?',
    answer: 'We turn simple text prompts into broadcast-ready, high-definition videos in seconds with synchronized voiceover, sound effects, and background music through a single automated pipeline.',
  },
  {
    id: 2,
    icon: <Hexagon size={16} />,
    question: 'Who is Artquil for?',
    answer: 'Marketing & ad teams, e-commerce brands, e-learning creators, entertainment studios, content creators, and enterprises seeking scalable video generation.',
  },
  {
    id: 3,
    icon: <Plus size={16} />,
    question: 'Do I need video editing or design skills?',
    answer: 'None at all. Guided camera presets, prompt templates, and automated audio mixing handle all the technical stages for you.',
  },
  {
    id: 4,
    icon: <Clock size={16} />,
    question: 'How fast is video generation?',
    answer: 'Most full cinematic scenes generate in under 10 seconds on our scalable cloud GPU inference infrastructure.',
  },
  {
    id: 5,
    icon: <Lock size={16} />,
    question: 'Can I use generated videos commercially?',
    answer: 'Yes! All videos generated on Creator and Business plans include full commercial licensing and royalty-free audio for ads and distribution.',
  },
  {
    id: 6,
    icon: <CreditCard size={16} />,
    question: 'What plans are available?',
    answer: 'We offer a Free Starter tier to explore, a Creator plan at ₹999/mo for professionals, and custom Business plans for unlimited generations and API access.',
  },
  {
    id: 7,
    icon: <Code size={16} />,
    question: 'Do you offer a Developer API?',
    answer: 'Yes, we offer REST APIs and SDKs to integrate generative video rendering and audio synchronization directly into your apps and workflows.',
  },
  {
    id: 8,
    icon: <Star size={16} />,
    question: 'What makes Artquil different?',
    answer: 'Unlike traditional tools that only generate silent video clips or require separate editing, Artquil generates video, sound effects, and voiceover in one synchronized pipeline.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="faq-section" id="faq" ref={sectionRef}>
      <div className="faq-container">
        
        {/* Left Column: Heading */}
        <div className={`faq-header-col reveal-init reveal-left ${isVisible ? 'reveal-visible' : ''}`}>
          <span className="faq-eyebrow">QUESTIONS, ANSWERED</span>
          <h2 className="faq-headline">
            Frequently<br />
            <span className="highlight-script">asked</span>
          </h2>
          <p className="faq-subtitle">
            Everything visitors usually need to know before starting with Artquil AI video generation.
          </p>
        </div>

        {/* Right Column: Accordion List */}
        <div className={`faq-accordion-col reveal-init reveal-right delay-200 ${isVisible ? 'reveal-visible' : ''}`}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={faq.id} 
                className={`faq-item ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question-row">
                  <div className="faq-icon-box">
                    {faq.icon}
                  </div>
                  <span className="faq-question-text">{faq.question}</span>
                  <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
                </div>

                {isOpen && (
                  <div className="faq-answer-box">
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
