import Navbar from "./Navbar";
import React, { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { submitToWebhookOrEmail } from "../utils/formSubmit";
import defaultLogo from "../assets/logo.jpeg";
import heroDashboard from "../assets/hero-messscale.png";
import howItWorksPerson from "../assets/how_it_works_person.jpg";
import chooseUsWoman from "../assets/messwoman.png";
import messbeeText from "../assets/messbee_text.png";
import reviewerRajesh from "../assets/reviewer_rajesh.png";
import reviewerPriya from "../assets/reviewer_priya.png";
import reviewerAmit from "../assets/reviewer_amit.png";
import indianAvatar from "../assets/indian_avatar.jpg";



/* ═══════════════════════════════════════════════════════════════
   MessBee Marketing Landing Page
   - Navbar with Login / Start Free
   - Hero Section with dashboard preview
   - Features, Stats, Pricing, Testimonials, CTA
   ═══════════════════════════════════════════════════════════════ */

/* ── Animated Counter ── */
const Counter = ({ target, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 1800;
        const step = (target / duration) * 16;
        const interval = setInterval(() => {
          start = Math.min(start + step, target);
          setCount(Math.floor(start));
          if (start >= target) clearInterval(interval);
        }, 16);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const VideoBanner = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", boxShadow: "0 16px 36px rgba(0,0,0,0.08)", marginBottom: 32, background: "#000", cursor: isPlaying ? "default" : "pointer" }} onClick={!isPlaying ? handlePlay : undefined}>
      <video 
        ref={videoRef}
        className="lp-video-player"
        src="/testimonial_video.mp4" 
        controls={isPlaying}
        style={{ width: "100%", height: 360, objectFit: "cover", display: "block" }}
        poster="/videomess.png"
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        Your browser does not support the video tag.
      </video>

      {!isPlaying && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.15)", transition: "background 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.25)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.15)"}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", boxShadow: "0 12px 40px rgba(0,0,0,0.2)", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" color="#16A34A" style={{ marginLeft: 4 }}>
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};


const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePlan, setActivePlan] = useState("annual");
  const [activeFaq, setActiveFaq] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  const testimonialsList = [
    {
      name: "Rajesh Sharma",
      role: "Founder, KiranaFresh",
      rating: "5.0",
      image: reviewerRajesh,
      review: "MessBee's WhatsApp API changed the game for our daily orders! Automated broadcasts & payment links helped us scale smoothly."
    },
    {
      name: "Priya Patel",
      role: "Owner, StyleBoutique Jaipur",
      rating: "5.0",
      image: reviewerPriya,
      review: "Instant customer lead capture and automated catalog sharing on WhatsApp helped us convert inquiries into real sales effortlessly."
    },
    {
      name: "Amit Verma",
      role: "Director, Apex Health Clinic",
      rating: "5.0",
      image: reviewerAmit,
      review: "Sending report updates & appointment reminders on WhatsApp reduced no-shows by 80%. Super easy to manage for our team."
    },
    {
      name: "Vikram Malhotra",
      role: "Co-Founder, Malhotra Electronics",
      rating: "5.0",
      image: indianAvatar,
      review: "The WhatsApp broadcasting tool helped us announce festival sales with a 98% open rate. Website lead generation went 3x higher!"
    },
    {
      name: "Sneha Gupta",
      role: "Founder, Organic Bites D2C",
      rating: "5.0",
      image: reviewerPriya,
      review: "MessBee's automated cart recovery brought back 30% of lost shoppers on WhatsApp. It's like an extra sales rep working 24/7."
    },
    {
      name: "Rohan Desai",
      role: "Operations Head, QuickRetail",
      rating: "5.0",
      image: reviewerRajesh,
      review: "Instant WhatsApp order confirmation and UPI payment collection doubled our customer satisfaction score within weeks."
    }
  ];

  useEffect(() => {
    if (isTestimonialHovered) return;
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonialsList.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isTestimonialHovered, testimonialsList.length]);

  const handleNewsletterSubmit = async () => {
    if (!newsletterEmail) return;
    setNewsletterLoading(true);
    try {
      await submitToWebhookOrEmail("newsletter", { email: newsletterEmail });
      setNewsletterStatus({ type: "success", message: "Thank you for subscribing! You're now on our mailing list." });
      setNewsletterEmail("");
    } catch {
      setNewsletterStatus({ type: "success", message: "Thank you for subscribing! You're now on our mailing list." });
      setNewsletterEmail("");
    } finally {
      setNewsletterLoading(false);
    }
    setTimeout(() => setNewsletterStatus(null), 4000);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const plans = [
    {
      name: "Starter",
      monthly: 999,
      annual: 799,
      color: "#6366F1",
      badge: null,
      features: ["5,000 messages/month", "1 WhatsApp Number", "Basic Analytics", "Email Support", "API Access"],
    },
    {
      name: "Growth",
      monthly: 2999,
      annual: 2399,
      color: "#16A34A",
      badge: "Most Popular",
      features: ["50,000 messages/month", "3 WhatsApp Numbers", "Advanced Analytics", "Priority Support", "Team Inbox", "Chatbot Builder", "CRM Integration"],
    },
    {
      name: "Enterprise",
      monthly: 7999,
      annual: 6399,
      color: "#F59E0B",
      badge: "Best Value",
      features: ["Unlimited messages", "10+ WhatsApp Numbers", "Custom Analytics", "Dedicated Manager", "White Label", "Custom Integrations", "SLA Guarantee", "Onboarding Support"],
    },
  ];

  const faqs = [
    { q: "What is MessBee?", a: "MessBee is India's leading WhatsApp Business automation platform that helps businesses sell, market, support, and grow via WhatsApp." },
    { q: "Is there a free trial?", a: "Yes! We offer a 14-day free trial with full access to all features. No credit card required." },
    { q: "How many WhatsApp numbers can I connect?", a: "Depending on your plan, you can connect 1 to 10+ verified WhatsApp Business API numbers." },
    { q: "Do I need technical knowledge?", a: "Not at all. MessBee is designed for non-technical users with a drag-and-drop chatbot builder and no-code integrations." },
    { q: "Is my data secure?", a: "Absolutely. We use enterprise-grade encryption, are GDPR compliant, and store all data on Indian servers." },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0F172A", overflowX: "hidden", width: "100%", maxWidth: "100vw", position: "relative" }}>
      {/* ═══════════════ NAVBAR ═══════════════ */}
      <Navbar />

      {/* ═══════════════ RESPONSIVE CSS ═══════════════ */}
      <style>{`
        html, body, #root {
          overflow-x: hidden !important;
          max-width: 100vw !important;
          width: 100% !important;
          position: relative;
          touch-action: pan-y !important;
        }
        * { box-sizing: border-box !important; }
        section { max-width: 100% !important; overflow: hidden !important; box-sizing: border-box !important; }
        .lp-hero-row { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 4vw; width: 100%; max-width: 1280px; margin: 0 auto; box-sizing: border-box; }
        .lp-hero-left { flex: 1 1 500px; min-width: 300px; max-width: 100%; }
        @keyframes badgeFloat1 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
        @keyframes badgeFloat2 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(6px); } }
        .lp-hero-badge { position: absolute; background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(12px); border-radius: 30px; padding: 6px 14px; display: flex; align-items: center; gap: 7px; box-shadow: 0 12px 28px -4px rgba(15, 23, 42, 0.12), 0 4px 10px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(241, 245, 249, 0.9); border: 1px solid rgba(255, 255, 255, 0.9); z-index: 10; white-space: nowrap; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .lp-hero-badge:hover { transform: scale(1.06) translateY(-2px) !important; box-shadow: 0 16px 36px -4px rgba(22, 163, 74, 0.2), 0 0 0 1px rgba(22, 163, 74, 0.3) !important; }
        
        .lp-float-badge { position: absolute; background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(12px); border-radius: 30px; padding: 8px 18px; display: flex; align-items: center; gap: 8px; box-shadow: 0 14px 32px -4px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(241, 245, 249, 0.9); border: 1px solid rgba(255, 255, 255, 0.9); z-index: 10; white-space: nowrap; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .lp-float-badge:hover { transform: scale(1.08) translateY(-3px) !important; box-shadow: 0 18px 36px -4px rgba(22, 163, 74, 0.22), 0 0 0 1px rgba(22, 163, 74, 0.35) !important; }
        
        @media (max-width: 1200px) and (min-width: 769px) {
          .lp-fbadge-wa { left: -10px !important; }
          .lp-fbadge-api { left: -16px !important; }
          .lp-fbadge-rzp { left: -8px !important; }
          .lp-fbadge-ship { right: -10px !important; }
          .lp-fbadge-goog { right: -16px !important; }
          .lp-fbadge-ondc { right: -8px !important; }
          .lp-float-badge { padding: 6px 14px !important; font-size: 11px !important; }
        }
        @media (max-width: 768px) {
          .lp-float-badge { display: none !important; }
        }
        .lp-hiw-badge { position: absolute; background: #FFFFFF; padding: 8px 14px; border-radius: 24px; font-size: 11px; font-weight: 600; color: #1E293B; box-shadow: 0 4px 15px rgba(0,0,0,0.08); z-index: 11; }
        .lp-compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; text-align: left; max-width: 1200px; margin: 0 auto; }
        .lp-ai-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: stretch; }
        .lp-hiw-grid { max-width: 1280px; margin: 0 auto; padding: 0 6%; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .lp-choose-grid { max-width: 1280px; margin: 0 auto; padding: 0 6%; display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; position: relative; z-index: 1; align-items: flex-end; }
        .lp-choose-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 24px; margin-bottom: 30px; }
        .lp-testimonial-grid { display: grid; grid-template-columns: 1fr 1.15fr 1fr; gap: 16px; align-items: center; }
        .lp-industry-flex { display: flex; flex-wrap: wrap; gap: 16px; }
        .lp-meta-badge { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .lp-meta-badge span { font-size: 14px; }
        .lp-hero-btns { display: flex; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
        .lp-nav-arrow-left { position: absolute; left: -24px; }
        .lp-nav-arrow-right { position: absolute; right: -24px; }
        .lp-hiw-img-col { position: relative; width: 65%; margin: 0 auto; }
        .lp-features-grid { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; align-items: stretch; }
        .lp-category-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 48px; }
        .lp-ai-pill-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

        @media (max-width: 900px) {
          .lp-hero-row { flex-direction: column; gap: 24px; }
          .lp-hero-left { flex: 1 1 100%; min-width: unset; }
          .lp-hero-right { flex: 1 1 100%; min-width: unset; }
          .lp-hero-badge { display: none !important; }
          .lp-ai-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .lp-compare-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .lp-hiw-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .lp-hiw-img-col { width: 80% !important; }
          .lp-choose-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .lp-choose-deco { display: none !important; }
          .lp-testimonial-grid { grid-template-columns: 1fr !important; }
          .lp-testimonial-side { display: none !important; }
          .lp-nav-arrow-left { left: 4px !important; }
          .lp-nav-arrow-right { right: 4px !important; }
        }

        @media (max-width: 768px) {
          .lp-hero-section { padding: 90px 4% 32px !important; overflow: hidden !important; }
          .lp-hero-h1 { font-size: 28px !important; line-height: 1.15 !important; margin-bottom: 10px !important; }
          .lp-hero-tagline { font-size: 14px !important; margin-bottom: 16px !important; }
          .lp-hero-desc { font-size: 11.5px !important; line-height: 1.55 !important; margin-bottom: 24px !important; max-width: 100% !important; }
          .lp-hero-right { display: flex !important; width: 100% !important; max-width: 100% !important; margin-top: 24px !important; align-items: center !important; justify-content: center !important; padding: 0 !important; box-sizing: border-box !important; overflow: hidden !important; }
          .lp-hero-mockup-wrap { width: 95% !important; max-width: 95% !important; transform: none !important; margin: 0 auto !important; padding: 0 !important; overflow: hidden !important; }
          .lp-hero-badge { display: none !important; }
          .lp-hero-pill { display: none !important; }
          .lp-dash-sidebar { width: 22px !important; padding: 6px 2px !important; gap: 5px !important; border-radius: 8px !important; }
          .lp-dash-sidebar svg { width: 8px !important; height: 8px !important; }
          .lp-dash-sidebar > div:first-child { width: 16px !important; height: 16px !important; border-radius: 4px !important; }
          .lp-dash-body { padding: 6px !important; gap: 6px !important; }
          .lp-dash-canvas { gap: 5px !important; }
          .lp-dash-kpi-row { grid-template-columns: 1fr 1fr 1fr !important; gap: 3px !important; width: 100% !important; }
          .lp-dash-kpi-card { padding: 5px 3px !important; border-radius: 6px !important; gap: 3px !important; min-width: 0 !important; overflow: hidden !important; }
          .lp-dash-kpi-icon { width: 18px !important; height: 18px !important; border-radius: 5px !important; flex-shrink: 0 !important; }
          .lp-dash-kpi-icon svg { width: 9px !important; height: 9px !important; }
          .lp-dash-kpi-label { font-size: 5px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
          .lp-dash-kpi-title { font-size: 7px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
          .lp-dash-kpi-sub { font-size: 5px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
          .lp-dash-funnel-box { padding: 4px 6px !important; gap: 3px !important; }
          .lp-dash-funnel-svg { height: 16px !important; }
          .lp-dash-bottom-grid { grid-template-columns: 1fr 1fr !important; gap: 4px !important; width: 100% !important; overflow: hidden !important; }
          .lp-dash-bottom-card { padding: 5px 4px !important; gap: 3px !important; border-radius: 6px !important; min-width: 0 !important; overflow: hidden !important; }
          .lp-lead-item-time { display: none !important; }
          .lp-lead-item-arrow { display: none !important; }
          .lp-lead-item-badge { font-size: 4.5px !important; padding: 1px 3px !important; border-radius: 2px !important; }
          .lp-lead-item-title { font-size: 5.5px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
          .lp-ai-bubble { padding: 3px 4px !important; font-size: 5px !important; border-radius: 4px !important; line-height: 1.2 !important; }
          .lp-ai-input { padding: 2px 4px !important; font-size: 4.8px !important; }
          .lp-ai-btn { width: 12px !important; height: 12px !important; }
          .lp-meta-box { padding: 6px 12px !important; gap: 8px !important; }
          .lp-meta-box span { font-size: 11px !important; }
          .lp-meta-box svg { width: 18px !important; height: 18px !important; }
          .lp-meta-box div { width: 16px !important; height: 16px !important; }
          
          .lp-features-strip { padding: 28px 16px !important; }
          .lp-features-heading { font-size: 20px !important; margin-bottom: 18px !important; }
          .lp-features-grid { display: flex !important; flex-wrap: wrap !important; gap: 10px !important; justify-content: center !important; }
          .lp-feature-card { padding: 10px 14px !important; min-width: 140px !important; flex: 1 1 140px !important; }
          .lp-feature-title { font-size: 12px !important; white-space: normal !important; }
          .lp-feature-desc { font-size: 9.5px !important; white-space: normal !important; }

          .lp-preview-section { padding: 32px 4% 20px !important; }
          .lp-preview-heading { font-size: 24px !important; line-height: 1.25 !important; margin-bottom: 10px !important; }
          .lp-preview-desc { font-size: 13px !important; margin-bottom: 24px !important; }
          .lp-preview-img-wrap { width: 95% !important; max-width: 95% !important; margin: 0 auto !important; }
          .lp-preview-img { width: 100% !important; max-width: 100% !important; border-radius: 12px !important; }

          .lp-compare-section { padding: 16px 4% 40px !important; }
          .lp-compare-heading { font-size: 24px !important; }
          .lp-compare-card-pad { padding: 24px 18px !important; border-radius: 18px !important; }
          .lp-compare-item-text { font-size: 11.5px !important; }
          .lp-compare-card-title { font-size: 18px !important; margin-bottom: 18px !important; }

          .lp-ai-section { padding: 30px 4% !important; }
          .lp-ai-card { padding: 22px 18px !important; border-radius: 18px !important; }
          .lp-ai-robot-card { width: 100% !important; height: auto !important; min-height: 260px !important; max-height: 360px !important; border-radius: 18px !important; overflow: hidden !important; }
          .lp-ai-robot-card img { width: 100% !important; height: 100% !important; object-fit: cover !important; object-position: center !important; }

          .lp-category-section { padding: 32px 4% 40px !important; }
          .lp-category-heading { font-size: 24px !important; }
          .lp-category-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; margin-bottom: 28px !important; }
          .lp-category-card { padding: 14px 12px !important; border-radius: 12px !important; gap: 8px !important; }
          .lp-category-card h3 { font-size: 11.5px !important; margin-bottom: 4px !important; }
          .lp-category-card p { font-size: 9.5px !important; line-height: 1.4 !important; }

          .lp-hiw-section { padding: 0 0 36px !important; }
          .lp-hiw-badge { font-size: 9px !important; padding: 4px 8px !important; }
          .lp-hiw-badge-1 { top: 8% !important; left: 0% !important; }
          .lp-hiw-badge-2 { top: 20% !important; right: 0% !important; }
          .lp-hiw-badge-3 { top: 65% !important; left: 4% !important; }
          .lp-hiw-steps-col { padding-top: 16px !important; }

          .lp-choose-section { padding: 24px 0 !important; }
          .lp-choose-inner { grid-template-columns: 1fr 1fr !important; gap: 14px 10px !important; }
          .lp-choose-img { max-height: none; overflow: visible; justify-content: center !important; margin-top: 10px; }
          .lp-choose-img img { max-height: 290px; object-fit: contain; width: auto !important; transform: none !important; }

          .lp-industry-section { padding: 30px 4% 40px !important; }
          .lp-industry-header { margin-bottom: 24px !important; }
          .lp-industry-heading { font-size: 24px !important; }
          .lp-industry-desc { font-size: 12.5px !important; }
          .lp-industry-dark-box { padding: 8px !important; border-radius: 14px !important; }
          .lp-industry-flex { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
          .lp-industry-item { width: 100% !important; height: 160px !important; border-radius: 12px !important; }
          .lp-industry-content { padding: 12px !important; }
          .lp-industry-icon { width: 28px !important; height: 28px !important; margin-bottom: 8px !important; border-radius: 6px !important; }
          .lp-industry-icon svg { width: 16px !important; height: 16px !important; }
          .lp-industry-card-title { font-size: 13.5px !important; margin-bottom: 4px !important; }
          .lp-industry-card-desc { font-size: 10px !important; line-height: 1.35 !important; max-width: 100% !important; }
          .lp-meta-badge span { font-size: 12px !important; }
          .lp-hero-btns { gap: 10px; }

          .lp-testimonial-section { padding: 20px 4% 40px !important; }
          .lp-testimonial-card-active { transform: none !important; padding: 22px 18px !important; border-radius: 18px !important; min-height: auto !important; }
          .lp-video-player { height: 220px !important; }

          .lp-newsletter-section { padding: 50px 4% !important; }
        }

        @media (max-width: 480px) {
          .lp-hero-section { padding: 80px 3% 20px !important; overflow: hidden !important; }
          .lp-meta-box { padding: 5px 10px !important; gap: 6px !important; }
          .lp-meta-box span { font-size: 10px !important; }
          .lp-meta-box svg { width: 15px !important; height: 15px !important; }
          .lp-meta-box div { width: 14px !important; height: 14px !important; }
          .lp-hero-h1 { font-size: 24px !important; line-height: 1.18 !important; }
          .lp-hero-right { padding: 0 !important; width: 100% !important; max-width: 100% !important; overflow: hidden !important; }
          .lp-hero-mockup-wrap { width: 92% !important; max-width: 92% !important; margin: 0 auto !important; padding: 0 !important; overflow: hidden !important; }
          .lp-hero-badge { display: none !important; }
          .lp-dash-sidebar { width: 20px !important; padding: 5px 2px !important; gap: 4px !important; border-radius: 6px !important; }
          .lp-dash-sidebar svg { width: 7.5px !important; height: 7.5px !important; }
          .lp-dash-sidebar > div:first-child { width: 14px !important; height: 14px !important; border-radius: 3px !important; }
          .lp-dash-body { padding: 5px !important; gap: 5px !important; }
          .lp-dash-canvas { gap: 4px !important; }
          .lp-dash-kpi-row { grid-template-columns: 1fr 1fr 1fr !important; gap: 2.5px !important; width: 100% !important; }
          .lp-dash-kpi-card { padding: 4px 2.5px !important; border-radius: 5px !important; gap: 2.5px !important; min-width: 0 !important; overflow: hidden !important; }
          .lp-dash-kpi-icon { width: 16px !important; height: 16px !important; border-radius: 4px !important; flex-shrink: 0 !important; }
          .lp-dash-kpi-icon svg { width: 8px !important; height: 8px !important; }
          .lp-dash-kpi-label { font-size: 4.5px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
          .lp-dash-kpi-title { font-size: 6.5px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
          .lp-dash-kpi-sub { font-size: 4.5px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
          .lp-dash-funnel-box { padding: 3px 5px !important; gap: 2px !important; }
          .lp-dash-funnel-svg { height: 14px !important; }
          .lp-dash-bottom-grid { grid-template-columns: 1fr 1fr !important; gap: 3px !important; width: 100% !important; overflow: hidden !important; }
          .lp-dash-bottom-card { padding: 4px 3px !important; gap: 2.5px !important; border-radius: 5px !important; min-width: 0 !important; overflow: hidden !important; }
          .lp-lead-item-time { display: none !important; }
          .lp-lead-item-arrow { display: none !important; }
          .lp-lead-item-badge { font-size: 4px !important; padding: 1px 2.5px !important; border-radius: 2px !important; }
          .lp-lead-item-title { font-size: 4.8px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
          .lp-ai-bubble { padding: 2.5px 3.5px !important; font-size: 4.5px !important; border-radius: 3px !important; line-height: 1.18 !important; }
          .lp-ai-input { padding: 2px 3px !important; font-size: 4.2px !important; }
          .lp-ai-btn { width: 10px !important; height: 10px !important; }
          .lp-preview-img-wrap { width: 92% !important; max-width: 92% !important; margin: 0 auto !important; }
          .lp-preview-img { width: 100% !important; max-width: 100% !important; border-radius: 10px !important; }

          .lp-features-grid { display: flex !important; flex-wrap: wrap !important; gap: 8px !important; justify-content: center !important; }
          .lp-feature-card { padding: 8px 10px !important; gap: 8px !important; min-width: 130px !important; flex: 1 1 130px !important; }
          .lp-feature-title { font-size: 11px !important; }
          .lp-feature-desc { font-size: 8.5px !important; }

          .lp-compare-item-text { font-size: 10.5px !important; }
          .lp-compare-card-title { font-size: 15px !important; margin-bottom: 14px !important; }

          .lp-ai-pill-grid { grid-template-columns: 1fr 1fr !important; gap: 6px !important; }
          .lp-ai-pill-item { padding: 7px 8px !important; font-size: 10.5px !important; }
          .lp-ai-robot-card { height: 200px !important; max-height: 200px !important; }

          .lp-category-grid { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
          .lp-category-card { padding: 10px 8px !important; border-radius: 10px !important; }
          .lp-category-card h3 { font-size: 10.5px !important; }
          .lp-category-card p { font-size: 8.5px !important; }

          .lp-choose-inner { grid-template-columns: 1fr 1fr !important; gap: 10px 6px !important; }
          .lp-choose-inner h4 { font-size: 11px !important; }
          .lp-choose-inner p { font-size: 8.5px !important; }

          .lp-industry-section { padding: 24px 3% 36px !important; }
          .lp-industry-header { margin-bottom: 20px !important; }
          .lp-industry-heading { font-size: 22px !important; }
          .lp-industry-desc { font-size: 12px !important; }
          .lp-industry-dark-box { padding: 6px !important; border-radius: 12px !important; }
          .lp-industry-flex { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 6px !important; }
          .lp-industry-item { width: 100% !important; height: 150px !important; border-radius: 10px !important; }
          .lp-industry-content { padding: 10px !important; }
          .lp-industry-icon { width: 26px !important; height: 26px !important; margin-bottom: 6px !important; border-radius: 6px !important; }
          .lp-industry-icon svg { width: 14px !important; height: 14px !important; }
          .lp-industry-card-title { font-size: 12px !important; margin-bottom: 3px !important; }
          .lp-industry-card-desc { font-size: 9px !important; line-height: 1.3 !important; }

          .lp-testimonial-grid { gap: 0 !important; }
          .lp-video-player { height: 190px !important; }
          .lp-nav-arrow-left { left: -4px !important; width: 34px !important; height: 34px !important; }
          .lp-nav-arrow-right { right: -4px !important; width: 34px !important; height: 34px !important; }

          .lp-newsletter-section { padding: 36px 3% !important; }
          .lp-newsletter-section h2 { font-size: 22px !important; }
          .lp-newsletter-section p { font-size: 12px !important; padding: 0 !important; margin-bottom: 24px !important; }
        }

        @media (max-width: 360px) {
          .lp-hero-right { padding: 0 !important; overflow: visible !important; }
          .lp-hero-mockup-wrap { max-width: 100% !important; }
          .lp-compare-item-text { font-size: 10.5px !important; }
          .lp-compare-card-title { font-size: 14px !important; }
          .lp-features-grid { grid-template-columns: 1fr !important; }
          .lp-ai-pill-grid { grid-template-columns: 1fr !important; }
          .lp-category-grid { grid-template-columns: 1fr !important; }
          .lp-choose-inner { grid-template-columns: 1fr !important; }
          .lp-industry-flex { grid-template-columns: 1fr !important; gap: 8px !important; }
          .lp-industry-item { height: 130px !important; }
        }
      `}</style>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="lp-hero-section" style={{ background: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 6% 40px", overflow: "hidden" }}>
        <div className="lp-hero-row">
          {/* Left content */}
          <div className="lp-hero-left">
            <div className="lp-meta-badge" style={{ marginBottom: 28, flexWrap: "wrap" }}>
              {/* Meta Badge */}
              <div className="lp-meta-box" style={{
                 background: "#FFFFFF",
                 borderRadius: "40px",
                 padding: "8px 20px",
                 display: "flex",
                 alignItems: "center",
                 gap: "10px",
                 boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                 border: "1px solid #E5E7EB",
                 whiteSpace: "normal",
                 flexWrap: "wrap"
               }}>
                 <svg width="24" height="24" viewBox="0 0 16 16" fill="#0668E1">
                   <path fillRule="evenodd" d="M8.217 5.243C9.145 3.988 10.171 3 11.483 3 13.96 3 16 6.153 16.001 9.907c0 2.29-.986 3.725-2.757 3.725-1.543 0-2.395-.866-3.924-3.424l-.667-1.123-.118-.197a55 55 0 0 0-.53-.877l-1.178 2.08c-1.673 2.925-2.615 3.541-3.923 3.541C1.086 13.632 0 12.217 0 9.973 0 6.388 1.995 3 4.598 3q.477-.001.924.122c.31.086.611.22.913.407.577.359 1.154.915 1.782 1.714m1.516 2.224q-.378-.615-.727-1.133L9 6.326c.845-1.305 1.543-1.954 2.372-1.954 1.723 0 3.102 2.537 3.102 5.653 0 1.188-.39 1.877-1.195 1.877-.773 0-1.142-.51-2.61-2.87zM4.846 4.756c.725.1 1.385.634 2.34 2.001A212 212 0 0 0 5.551 9.3c-1.357 2.126-1.826 2.603-2.581 2.603-.777 0-1.24-.682-1.24-1.9 0-2.602 1.298-5.264 2.846-5.264q.137 0 .27.018"/>
                 </svg>
                 <span style={{ fontSize: "14px", fontWeight: "600", color: "#64748B" }}>
                   Meta Tech Partner. Powered by official WhatsApp API
                 </span>
                 <div style={{ width: 20, height: 20, background: "#16A34A", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                 </div>
               </div>
            </div>

            <h1 className="lp-hero-h1" style={{ fontFamily: "'Inter', sans-serif", fontSize: 36, fontWeight: 800, lineHeight: 1.05, letterSpacing: "normal", marginBottom: 8, color: "#111827" }}>
              India's Digital<br />
              <span style={{ color: "#16A34A" }}>Business Operating</span><br />
              <span style={{ color: "#111827" }}>System</span>
            </h1>

            <p className="lp-hero-sub" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#111827", lineHeight: 1.5, marginBottom: 8, fontWeight: 600 }}>
              Own Your Business. Own Your Customers.<br />
              <span style={{ fontWeight: 600 }}>Own Your Future.</span>
            </p>
            <p className="lp-hero-tagline" style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "#111827", fontWeight: 800, marginBottom: 24, wordBreak: "break-word", overflowWrap: "break-word" }}>
              Broadcast Smarter. Automate Faster. <span style={{ color: "#16A34A" }}>Grow Without Limits.</span>
            </p>
            <p className="lp-hero-desc" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#4B5563", lineHeight: 1.6, marginBottom: 40, maxWidth: 480, fontWeight: 500 }}>
              MessBee is India's comprehensive Digital Business Operating System, powered by the Official WhatsApp Business API. We help businesses connect with customers at scale through WhatsApp Broadcasting, automated messaging, customer engagement, sales workflows, payments and AI-powered business automation all from one unified platform.
            </p>

            <div className="lp-hero-btns">
              <button onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/signup", "_blank")} style={{ background: "#16A34A", color: "#FFF", border: "none", borderRadius: 40, padding: "8px 16px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Get Started</button>
              <button onClick={() => navigate("/book-demo")} style={{ background: "#111827", color: "#FFF", border: "none", borderRadius: 40, padding: "8px 16px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8 }}>
                Book Demo
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </button>
            </div>
          </div>

          {/* Right: Pixel-Perfect Crisp Dashboard UI Mockup */}
          <div className="lp-hero-right">
            {/* Value / Capability Pill */}
            <div className="lp-hero-pill" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F0FDF4", borderRadius: 40, padding: "5px 14px", marginBottom: "16px", zIndex: 2, border: "1px solid #DCFCE7", boxShadow: "0 2px 6px rgba(22, 163, 74, 0.08)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A" }} />
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "#16A34A" }}>⚡ AI-Powered Lead Generation & Growth Engine</span>
            </div>

            {/* Dashboard Container with Ambient Glow, Pure UI Dashboard & Floating Integration Badges */}
            <div className="lp-hero-mockup-wrap" style={{ position: "relative", width: "100%", maxWidth: 540, overflow: "visible" }}>
              
              {/* Premium Ambient Emerald Glow behind mockup */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
                height: "85%",
                background: "radial-gradient(circle, rgba(22, 163, 74, 0.20) 0%, rgba(16, 185, 129, 0.08) 45%, transparent 72%)",
                filter: "blur(40px)",
                pointerEvents: "none",
                zIndex: 0
              }} />

              {/* Floating Badge: WhatsApp */}
              <div className="lp-hero-badge lp-badge-wa" style={{ right: "calc(100% - 4px)", left: "auto", top: "12%", animation: "badgeFloat1 4s ease-in-out infinite" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px rgba(16, 185, 129, 0.7)", flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#334155" }}>WhatsApp</span>
              </div>

              {/* Floating Badge: API Ready */}
              <div className="lp-hero-badge lp-badge-api" style={{ right: "calc(100% - 4px)", left: "auto", top: "46%", animation: "badgeFloat2 5s ease-in-out infinite 0.5s" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#EC4899", boxShadow: "0 0 8px rgba(236, 72, 153, 0.7)", flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#334155" }}>API Ready</span>
              </div>

              {/* Floating Badge: Razorpay */}
              <div className="lp-hero-badge lp-badge-rzp" style={{ right: "calc(100% - 4px)", left: "auto", bottom: "16%", animation: "badgeFloat1 4.5s ease-in-out infinite 1s" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563EB", boxShadow: "0 0 8px rgba(37, 99, 235, 0.7)", flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#334155" }}>Razorpay</span>
              </div>

              {/* Floating Badge: Shiprocket */}
              <div className="lp-hero-badge lp-badge-ship" style={{ left: "calc(100% - 4px)", right: "auto", top: "14%", animation: "badgeFloat2 4.2s ease-in-out infinite 0.2s" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#F97316", boxShadow: "0 0 8px rgba(249, 115, 22, 0.7)", flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#334155" }}>Shiprocket</span>
              </div>

              {/* Floating Badge: Google */}
              <div className="lp-hero-badge lp-badge-goog" style={{ left: "calc(100% - 4px)", right: "auto", top: "46%", animation: "badgeFloat1 4.8s ease-in-out infinite 0.8s" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#F59E0B", boxShadow: "0 0 8px rgba(245, 158, 11, 0.7)", flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#334155" }}>Google</span>
              </div>

              {/* Floating Badge: ONDC */}
              <div className="lp-hero-badge lp-badge-ondc" style={{ left: "calc(100% - 4px)", right: "auto", bottom: "16%", animation: "badgeFloat2 4.4s ease-in-out infinite 1.2s" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#6366F1", boxShadow: "0 0 8px rgba(99, 102, 241, 0.7)", flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#334155" }}>ONDC</span>
              </div>

              {/* Pure Crisp Vector UI Dashboard Mockup (Text Copy Disabled) */}
              <div
                className="lp-mockup-browser"
                style={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  background: "#FFFFFF",
                  borderRadius: 20,
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 25px 60px -12px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(0,0,0,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  width: "100%",
                  position: "relative",
                  zIndex: 1
                }}
              >
                {/* Browser Header Bar */}
                <div style={{
                  background: "#FFFFFF",
                  padding: "8px 14px",
                  borderBottom: "1px solid #F1F5F9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  {/* 3 Dots */}
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F56" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFBD2E" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#27C93F" }} />
                  </div>

                  {/* URL Pill */}
                  <div style={{
                    background: "#F8FAFC",
                    borderRadius: 20,
                    padding: "3px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    border: "1px solid #E2E8F0",
                    width: "clamp(120px, 32%, 180px)",
                    justifyContent: "center"
                  }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span style={{ fontSize: 9.5, color: "#64748B", fontWeight: 500 }}>app.messbee.com</span>
                  </div>

                  {/* Right: Bell & Avatar */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#10B981" }} />
                  </div>
                </div>

                {/* Main Dashboard Body */}
                <div className="lp-dash-body" style={{ display: "flex", background: "#F8FAFC", padding: "8px", gap: "8px", minHeight: "auto" }}>
                  
                  {/* Left Vertical Dark Capsule Sidebar */}
                  <div className="lp-dash-sidebar" style={{
                    width: 30,
                    background: "#0B132B",
                    borderRadius: 12,
                    padding: "8px 3px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    flexShrink: 0
                  }}>
                    {/* Active Grid Icon */}
                    <div style={{ width: 20, height: 20, borderRadius: 5, background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
                    </div>

                    {/* Nav Icons */}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><path d="m21 16-9 5-9-5V8l9-5 9 5v8z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                    <div style={{ marginTop: "auto", width: 4, height: 4, borderRadius: "50%", background: "#475569" }} />
                  </div>

                  {/* Content Canvas */}
                  <div className="lp-dash-canvas" style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                    
                    {/* Row 1: Top 3 Action Cards (1 Line / 3 Columns with Rich Height & Spacing) */}
                    <div className="lp-dash-kpi-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                      
                      {/* Card 1: Lead Generation */}
                      <div className="lp-dash-kpi-card" style={{ background: "#FFFFFF", borderRadius: 12, padding: "14px 14px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: 11, boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                        <div className="lp-dash-kpi-icon" style={{ width: 34, height: 34, borderRadius: 9, background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
                        </div>
                        <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                          <div className="lp-dash-kpi-label" style={{ fontSize: 7.5, color: "#64748B", fontWeight: 600 }}>Lead Generation</div>
                          <div className="lp-dash-kpi-title" style={{ fontSize: 11, fontWeight: 800, color: "#0F172A", lineHeight: 1.15 }}>Create Campaign</div>
                          <div className="lp-dash-kpi-sub" style={{ fontSize: 8, color: "#16A34A", fontWeight: 700 }}>By Business Type</div>
                        </div>
                      </div>

                      {/* Card 2: Broadcast */}
                      <div className="lp-dash-kpi-card" style={{ background: "#FFFFFF", borderRadius: 12, padding: "14px 14px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: 11, boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                        <div className="lp-dash-kpi-icon" style={{ width: 34, height: 34, borderRadius: 9, background: "#E0F2FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.2"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/></svg>
                        </div>
                        <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                          <div className="lp-dash-kpi-label" style={{ fontSize: 7.5, color: "#64748B", fontWeight: 600 }}>Broadcast</div>
                          <div className="lp-dash-kpi-title" style={{ fontSize: 11, fontWeight: 800, color: "#0F172A", lineHeight: 1.15 }}>Instant Reach</div>
                          <div className="lp-dash-kpi-sub" style={{ fontSize: 8, color: "#0284C7", fontWeight: 700 }}>Offers & Catalog</div>
                        </div>
                      </div>

                      {/* Card 3: Support */}
                      <div className="lp-dash-kpi-card" style={{ background: "#FFFFFF", borderRadius: 12, padding: "14px 14px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: 11, boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                        <div className="lp-dash-kpi-icon" style={{ width: 34, height: 34, borderRadius: 9, background: "#F3E8FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="2.2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
                        </div>
                        <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                          <div className="lp-dash-kpi-label" style={{ fontSize: 7.5, color: "#64748B", fontWeight: 600 }}>Support</div>
                          <div className="lp-dash-kpi-title" style={{ fontSize: 11, fontWeight: 800, color: "#0F172A", lineHeight: 1.15 }}>100% Automated</div>
                          <div className="lp-dash-kpi-sub" style={{ fontSize: 8, color: "#9333EA", fontWeight: 700 }}>24/7 AI Sales Rep</div>
                        </div>
                      </div>

                    </div>

                    {/* Row 2: Business Growth & Lead Funnel */}
                    <div className="lp-dash-funnel-box" style={{ background: "#FFFFFF", borderRadius: 10, padding: "6px 8px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ fontSize: 8.5, fontWeight: 800, color: "#0F172A" }}>Business Growth & Lead Funnel</div>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 3, background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 10, padding: "1px 6px" }}>
                          <span style={{ fontSize: 7 }}>⚡</span>
                          <span style={{ fontSize: 7, fontWeight: 700, color: "#16A34A" }}>Active System</span>
                        </div>
                      </div>

                      {/* Funnel Graph Curve */}
                      <div className="lp-dash-funnel-svg" style={{ height: 22, width: "100%", position: "relative" }}>
                        <svg width="100%" height="100%" viewBox="0 0 320 28" preserveAspectRatio="none" style={{ overflow: "visible" }}>
                          <defs>
                            <linearGradient id="funnelGradHero" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path d="M 15 22 C 70 20, 110 17, 160 14 C 210 11, 260 7, 305 3 L 305 28 L 15 28 Z" fill="url(#funnelGradHero)" />
                          <path d="M 15 22 C 70 20, 110 17, 160 14 C 210 11, 260 7, 305 3" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                          <circle cx="15" cy="22" r="3" fill="#10B981" />
                          <circle cx="85" cy="18" r="3" fill="#10B981" />
                          <circle cx="160" cy="14" r="3" fill="#10B981" />
                          <circle cx="235" cy="9" r="3" fill="#10B981" />
                          <circle cx="305" cy="3" r="3" fill="#10B981" />
                        </svg>
                      </div>
                    </div>

                    {/* Row 3: Bottom Row (Live Leads + AI Sales Assistant in 1 Line) */}
                    <div className="lp-dash-bottom-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      
                      {/* Left: Live WhatsApp Leads */}
                      <div className="lp-dash-bottom-card" style={{ background: "#FFFFFF", borderRadius: 10, padding: "8px 10px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: 6, boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="#FFF"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                            </div>
                            <span style={{ fontSize: 9, fontWeight: 800, color: "#0F172A", whiteSpace: "nowrap" }}>Live Leads</span>
                          </div>
                          <span style={{ fontSize: 7, color: "#64748B", fontWeight: 700, background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "1px 5px", borderRadius: 3 }}>All</span>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                          {[
                            { type: "Website Inquiry", time: "10:24 AM", badge: "Auto-Replied", bg: "#DCFCE7", color: "#16A34A" },
                            { type: "Catalog View", time: "09:48 AM", badge: "Followup Sent", bg: "#E0F2FE", color: "#0284C7" },
                            { type: "Order Request", time: "09:15 AM", badge: "Payment Ready", bg: "#FEF3C7", color: "#D97706" },
                            { type: "Product Enquiry", time: "08:50 AM", badge: "Auto-Replied", bg: "#DCFCE7", color: "#16A34A" },
                          ].map((lead, idx) => (
                            <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2px 0", borderBottom: idx < 3 ? "1px solid #F8FAFC" : "none" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 3, minWidth: 0 }}>
                                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#10B981", flexShrink: 0 }} />
                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                  <svg width="6" height="6" viewBox="0 0 24 24" fill="#FFF"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                                </div>
                                <span className="lp-lead-item-title" style={{ fontSize: 7.8, fontWeight: 700, color: "#1E293B" }}>{lead.type}</span>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
                                <span className="lp-lead-item-time" style={{ fontSize: 6.8, color: "#94A3B8" }}>{lead.time}</span>
                                <span className="lp-lead-item-badge" style={{ fontSize: 6.5, fontWeight: 700, background: lead.bg, color: lead.color, padding: "1.5px 4px", borderRadius: 3 }}>{lead.badge}</span>
                                <span className="lp-lead-item-arrow" style={{ fontSize: 8, color: "#94A3B8" }}>›</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: AI Sales Assistant */}
                      <div className="lp-dash-bottom-card" style={{ background: "#FFFFFF", borderRadius: 10, padding: "8px 10px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: 6, boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <div style={{ width: 14, height: 14, borderRadius: 4, background: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="#FFF"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            </div>
                            <span style={{ fontSize: 9, fontWeight: 800, color: "#0F172A", whiteSpace: "nowrap" }}>AI Assistant</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#10B981" }} />
                            <span style={{ fontSize: 6.5, color: "#64748B", fontWeight: 600 }}>Online</span>
                          </div>
                        </div>

                        {/* Prompt bubble */}
                        <div className="lp-ai-bubble" style={{ background: "#FAF5FF", border: "1px solid #F3E8FF", borderRadius: 6, padding: "4px 7px", fontSize: 7, color: "#475569", lineHeight: 1.3 }}>
                          "How to generate more leads?"
                        </div>

                        {/* Reply bubble */}
                        <div className="lp-ai-bubble" style={{ background: "#F0FDF4", border: "1px solid #DCFCE7", borderRadius: 6, padding: "4px 7px", fontSize: 7, color: "#166534", lineHeight: 1.3, display: "flex", alignItems: "flex-start", gap: 4 }}>
                          <span style={{ color: "#16A34A", fontSize: 8 }}>✦</span>
                          <span>Run a broadcast with your catalog.</span>
                        </div>

                        {/* Input placeholder */}
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: "auto" }}>
                          <div className="lp-ai-input" style={{ flex: 1, background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 5, padding: "3px 6px", fontSize: 6.5, color: "#94A3B8" }}>
                            Ask me anything...
                          </div>
                          <div className="lp-ai-btn" style={{ width: 14, height: 14, borderRadius: 4, background: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <svg width="7" height="7" viewBox="0 0 24 24" fill="#FFF"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ EVERYTHING YOU NEED HEADING & FEATURES STRIP ═══════════════ */}
      <section className="lp-features-strip" style={{ background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)", padding: "28px 3%" }}>
        <div style={{ maxWidth: 1380, margin: "0 auto" }}>
          <h2 className="lp-features-heading" style={{ textAlign: "center", fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 800, color: "#FFFFFF", marginBottom: 18, letterSpacing: "-0.3px" }}>
            Everything You Need to Run and Grow Your Business
          </h2>

          <div className="lp-features-grid" style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center"
          }}>
            {[
              {
                title: "CRM",
                desc: "Manage relationships",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )
              },
              {
                title: "Digital Store",
                desc: "Launch your storefront",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l1.5-5h15L21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                    <path d="M3 9h18" />
                    <path d="M9 13h6" />
                  </svg>
                )
              },
              {
                title: "Marketing Automation",
                desc: "Run campaigns that convert",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                )
              },
              {
                title: "Orders",
                desc: "Manage orders seamlessly",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="21" r="1.5" />
                    <circle cx="19" cy="21" r="1.5" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                )
              },
              {
                title: "Payments",
                desc: "Accept payments securely",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CA8A04" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                )
              },
              {
                title: "Team Management",
                desc: "Roles, access & control",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                )
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="lp-feature-card"
                style={{
                  background: "#FFFFFF",
                  borderRadius: 12,
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  minWidth: 160,
                  flex: "1 1 160px",
                  maxWidth: 210,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                }}
              >
                <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon}
                </div>
                <div style={{ textAlign: "left", minWidth: 0 }}>
                  <div className="lp-feature-title" style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                    {item.title}
                  </div>
                  <div className="lp-feature-desc" style={{ fontSize: 10.5, color: "#64748B", marginTop: 1, lineHeight: 1.2 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PLATFORM PREVIEW & DASHBOARD SECTION ═══════════════ */}
      <section className="lp-preview-section" style={{ background: "#FFFFFF", padding: "40px 6% 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
          
          <div style={{ color: "#16A34A", fontSize: 13, fontWeight: 800, marginBottom: 10, letterSpacing: "0.5px" }}>
            Explore Services
          </div>
          <h2 className="lp-preview-heading" style={{ fontFamily: "'Inter', sans-serif", fontSize: 32, fontWeight: 800, color: "#0F172A", lineHeight: 1.2, marginBottom: 10, letterSpacing: "-0.8px" }}>
            Scale Your Business with <span style={{ color: "#16A34A" }}>MessBee's</span> Powerful<br />WhatsApp API Platform
          </h2>
          <p className="lp-preview-desc" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#64748B", marginBottom: 36, fontWeight: 500 }}>
            Everything your business needs to connect, engage and grow at scale.
          </p>

          {/* Platform Showcase Image */}
          <div className="lp-preview-img-wrap" style={{
            position: "relative",
            margin: "0 auto",
            width: "100%",
            maxWidth: 1060,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <img
              className="lp-preview-img"
              src={heroDashboard}
              alt="MessBee WhatsApp API Platform"
              style={{
                width: "100%",
                maxWidth: 1060,
                height: "auto",
                borderRadius: 16,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04)",
                display: "block"
              }}
            />
          </div>

        </div>
      </section>

      {/* ═══════════════ MARKETPLACE VS MESSBEE SECTION ═══════════════ */}
      <section className="lp-compare-section" style={{ padding: "20px 6% 60px", background: "#FFFFFF", textAlign: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* VS Title */}
          <h2 className="lp-compare-heading" style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 800, color: "#0F172A", marginBottom: 12, letterSpacing: "-0.5px" }}>
            Marketplace <span style={{ color: "#16A34A" }}>vs</span> Messbee
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(13px, 2vw, 16px)", color: "#64748B", fontWeight: 500, marginBottom: 32 }}>
            Stop renting your business. Start owning your future.
          </p>

          {/* Comparison Cards */}
          <div className="lp-compare-grid">
            {/* Left Card - Traditional */}
            <div className="lp-compare-card-pad" style={{
              background: "#F8FAFC",
              borderRadius: 24,
              padding: "36px 32px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <h3 className="lp-compare-card-title" style={{ fontSize: 22, fontWeight: 700, color: "#475569", marginBottom: 28 }}>Traditional Marketplaces</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    "High Commissions (up to 30%)",
                    "No Customer Data Access",
                    "Competing with your own products"
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </div>
                      <span className="lp-compare-item-text" style={{ fontSize: 13, fontWeight: 500, color: "#DC2626" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card - Messbee (Green Background) */}
            <div className="lp-compare-card-pad" style={{
              background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
              borderRadius: 24,
              padding: "36px 32px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              position: "relative",
              boxShadow: "0 20px 40px rgba(22, 163, 74, 0.28)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                  <h3 className="lp-compare-card-title" style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF", margin: 0 }}>Messbee Operating System</h3>
                  <div style={{ background: "#FFFFFF", color: "#15803D", fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 20, boxShadow: "0 4px 10px rgba(0,0,0,0.1)", letterSpacing: "0.5px" }}>
                    RECOMMENDED
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    "0% Transaction Commission",
                    "Complete CRM & Data Control",
                    "Direct-to-Consumer Growth"
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255, 255, 255, 0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="lp-compare-item-text" style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ AI POWERED BUSINESS SECTION ═══════════════ */}
      <section className="lp-ai-section" style={{ padding: "40px 5%", background: "#FFFFFF" }}>
        <div className="lp-ai-grid">

          {/* Left Column - Content Card */}
          <div className="lp-ai-card" style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            borderRadius: 24,
            padding: "30px 30px",
            color: "#FFFFFF",
            boxShadow: "0 18px 36px -12px rgba(15, 23, 42, 0.28)",
            border: "1px solid #1E293B",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16, 185, 129, 0.15)", borderRadius: 30, padding: "4px 12px", border: "1px solid rgba(16, 185, 129, 0.3)", width: "fit-content", marginBottom: 14 }}>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: "#34D399", letterSpacing: "0.5px" }}>⚡ 24/7 AUTONOMOUS AI</span>
              </div>

              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(24px, 2.6vw, 32px)", fontWeight: 800, color: "#FFFFFF", marginBottom: 10, letterSpacing: "-0.6px", lineHeight: 1.15 }}>
                <span style={{ color: "#10B981" }}>AI</span> Powered Business
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(12.5px, 1vw, 14px)", color: "#94A3B8", lineHeight: 1.5, marginBottom: 20, fontWeight: 400 }}>
                Imagine an employee who never sleeps, never makes mistakes, and grows smarter every day — driving sales, delighting customers, and running your operations on autopilot.
              </p>
            </div>

            <div className="lp-ai-pill-grid">
              {[
                "Reply instantly", "Sell products",
                "Recommend products", "Collect payments",
                "Book appointments", "Recover abandoned carts",
                "Answer FAQs", "Generate reports"
              ].map((item, i) => (
                <div key={i} className="lp-ai-pill-item" style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#064E3B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, fontWeight: 600, color: "#F1F5F9" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Robot Image Showcase Card (Full Width Showcase) */}
          <div className="lp-ai-robot-card" style={{
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 18px 36px -12px rgba(15, 23, 42, 0.28)",
            border: "1px solid #1E293B",
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            minHeight: 320,
            boxSizing: "border-box"
          }}>
            <img
              src="/messrobo.png"
              alt="AI Assistant Robot"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block"
              }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ BROWSE BY CATEGORY SECTION ═══════════════ */}
      <section className="lp-category-section" style={{ padding: "40px 6% 50px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", color: "#10B981", fontSize: 11, fontWeight: 500, letterSpacing: "0.5px", marginBottom: 12 }}>
              Explore Services
            </div>
            <h2 className="lp-category-heading" style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 600, color: "#0F172A", marginBottom: 12, letterSpacing: "normal" }}>
              Browse by <span style={{ color: "#10B981" }}>Category</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#94A3B8", fontWeight: 400 }}>
              Everything your business need
            </p>
          </div>

          <div className="lp-category-grid" style={{ alignItems: "stretch" }}>
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                ), title: "CRM", desc: "Intelligent contact profiles and relationship management at scale."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                ), title: "WhatsApp Commerce", desc: "Sell, support, and engage customers directly on WhatsApp."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                ), title: "Digital Store", desc: "Launch a branded online storefront in minutes — no code needed."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" /></svg>
                ), title: "AI Assistant", desc: "Your 24/7 sales rep that never sleeps and never misses a lead."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                ), title: "Loyalty Program", desc: "Points, rewards, and referrals that retain your best customers."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                ), title: "Marketing Automation", desc: "Trigger campaigns that convert at exactly the right moment."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
                ), title: "Inventory", desc: "Track stock across all locations with real-time low-stock alerts."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                ), title: "Orders", desc: "Unified order management from every sales channel in one view."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                ), title: "Payments", desc: "Accept UPI, cards, wallets, and BNPL with one-click checkout."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                ), title: "Analytics", desc: "Business intelligence dashboards built for action, not vanity."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
                ), title: "Customer Journey", desc: "Map and optimize every touchpoint across the full lifecycle."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                ), title: "Team Management", desc: "Roles, permissions, and performance tracking at any scale."
              }
            ].map((item, idx) => (
              <div key={idx} className="lp-category-card" style={{ background: "#247844", borderRadius: 16, padding: "18px 20px", color: "#FFFFFF", display: "flex", flexDirection: "column", gap: 12, transition: "transform 0.2s", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                <div style={{ width: 36, height: 36, border: "1px solid rgba(255,255,255,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <button 
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "#16A34A", color: "#FFFFFF", padding: "12px 32px", borderRadius: 8, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer" }}
            >
              More
            </button>
          </div>

        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS SECTION ═══════════════ */}
      <section id="how-it-works" className="lp-hiw-section" style={{ padding: "0 0 50px", background: "radial-gradient(circle at 25% 50%, #FDF0D5 0%, #F4F5F7 50%)" }}>
        <div className="lp-hiw-grid">

          {/* Left - Image side */}
          <div className="lp-hiw-img-col">
            <div style={{ overflow: "hidden", mixBlendMode: "multiply" }}>
              <img src={howItWorksPerson} alt="Person working on laptop" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", filter: "contrast(1.15) brightness(1.1)" }} />
            </div>

            {/* Badges and Decorations */}
            <svg width="32" height="32" viewBox="0 0 100 100" style={{ position: "absolute", top: "10%", left: "5%", zIndex: 10, pointerEvents: "none" }}>
              <path d="M15 35 Q22 35 22 42 Q22 35 29 35 Q22 35 22 28 Q22 35 15 35 Z" fill="#111827" />
              <path d="M75 40 Q80 40 80 45 Q80 40 85 40 Q80 40 80 35 Q80 40 75 40 Z" fill="#111827" />
              <path d="M30 65 Q35 65 35 70 Q35 65 40 65 Q35 65 35 60 Q35 65 30 65 Z" fill="#111827" />
              <path d="M50 15 Q55 15 55 20 Q55 15 60 15 Q55 15 55 10 Q55 15 50 15 Z" fill="#111827" />
              
              <g transform="rotate(25 50 50)" fill="none" stroke="#111827" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M35 45 C35 20, 65 20, 65 45 C65 58, 55 62, 55 72 L45 72 C45 62, 35 58, 35 45 Z" />
                <path d="M45 72 L55 72 M46 78 L54 78 M47 84 L53 84" />
                <path d="M45 72 L48 55 C46 51, 54 51, 52 55 L55 72" />
              </g>
            </svg>
            
            <svg width="36" height="36" viewBox="0 0 100 100" style={{ position: "absolute", top: "18%", right: "22%", zIndex: 10, pointerEvents: "none" }}>
              <g transform="rotate(25 50 50)" fill="none" stroke="#111827" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="25" y="45" width="50" height="32" rx="2" />
                <polygon points="45,53 45,67 57,60" fill="#111827" />
                <polygon points="25,40 75,40 80,30 30,30" />
                <line x1="40" y1="30" x2="35" y2="40" />
                <line x1="55" y1="30" x2="50" y2="40" />
                <line x1="70" y1="30" x2="65" y2="40" />
              </g>
            </svg>
            <div className="lp-hiw-badge lp-hiw-badge-1" style={{ top: "25%", left: "-20%", zIndex: 11 }}>
              100% ready for business
            </div>
            <div className="lp-hiw-badge lp-hiw-badge-2" style={{ top: "15%", right: "-10%" }}>
              Global Available
            </div>
            <div className="lp-hiw-badge lp-hiw-badge-3" style={{ top: "60%", left: "-10%" }}>
              Secure System
            </div>
          </div>

          {/* Right - Text and steps */}
          <div className="lp-hiw-steps-col" style={{ paddingTop: 64 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", color: "#10B981", fontSize: 12, fontWeight: 500, marginBottom: 8 }}>
              Simple Process
            </div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, color: "#0F172A", marginBottom: 12, letterSpacing: "normal" }}>
              How It <span style={{ color: "#10B981" }}>Works</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#64748B", marginBottom: 32 }}>
              Get your business up and running in 4 simple steps
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 28, position: "relative" }}>
              {/* Vertical connecting line */}
              <div style={{ position: "absolute", left: 14, top: 30, bottom: 30, width: 2, background: "#10B981" }}></div>

              {[
                { num: "01", title: "Create Free Account", desc: "Sign up in 2 minutes with no credit card required" },
                { num: "02", title: "Connect WhatsApp API", desc: "Link your official WhatsApp Business API number easily" },
                { num: "03", title: "Launch Lead Generation & Campaigns", desc: "Capture leads, broadcast offers, and automate instant chat replies" },
                { num: "04", title: "Automate Sales & Get Paid", desc: "Track orders, collect payments securely via UPI/cards, and scale growth" }
              ].map((step, idx) => (
                <div key={idx} style={{ display: "flex", gap: 16, position: "relative", zIndex: 1 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#10B981", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 12, flexShrink: 0 }}>
                    {step.num}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 2 }}>{step.title}</h4>
                    <p style={{ fontSize: 11.5, color: "#6B7280", lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/signup", "_blank")} style={{ marginTop: 24, background: "#10B981", color: "#FFFFFF", padding: "8px 16px", borderRadius: 8, fontSize: 11, fontWeight: 600, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
              Get Started Now
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
          </div>

        </div>
      </section>

      {/* ═══════════════ WHY CHOOSE US SECTION ═══════════════ */}
      <section className="lp-choose-section" style={{ padding: "40px 0 0", background: "#0A0A0A", position: "relative", overflow: "hidden" }}>

        {/* Map Background Pattern (confined to left side behind content) */}
        <div style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "60%",
          backgroundColor: "#6B5A42",
          WebkitMaskImage: "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')",
          WebkitMaskSize: "cover",
          WebkitMaskPosition: "left center",
          maskImage: "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')",
          maskSize: "cover",
          maskPosition: "left center",
          opacity: 0.20,
          zIndex: 0,
          pointerEvents: "none"
        }} />
        {/* Decorative white circles */}
        <div className="lp-choose-deco" style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", border: "30px solid #FFFFFF", zIndex: 0 }}></div>
        <div className="lp-choose-deco" style={{ position: "absolute", top: 30, right: -80, width: 240, height: 240, borderRadius: "50%", border: "50px solid #FFFFFF", zIndex: 0 }}></div>

        <div className="lp-choose-grid">

          {/* Left - Content */}
          <div style={{ position: "relative", zIndex: 10, paddingBottom: 20 }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", marginBottom: 20, letterSpacing: "-0.5px" }}>
              Why Should You <span style={{ color: "#16A34A" }}>Choose Us</span>
            </h2>

            <div className="lp-choose-inner">
              {[
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" /><path d="M12 8v14" /><path d="M5 12h14" /></svg>, title: "AI Powered", desc: "Automate conversations with intelligent AI assistance." },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>, title: "No Coding", desc: "Create workflows easily without writing any code." },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, title: "Secure", desc: "Enterprise-grade security keeps your data protected." },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>, title: "Cloud Based", desc: "Access your account anytime from anywhere." },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, title: "Multi-user", desc: "Collaborate with your team using multiple user accounts." },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>, title: "Multi-location", desc: "Manage multiple business locations from one platform." },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>, title: "API Ready", desc: "Easily integrate with your existing tools and systems." },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>, title: "Mobile Friendly", desc: "Manage your business seamlessly on any device." },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /></svg>, title: "Enterprise Grade", desc: "Built to scale with powerful features for growing businesses." },
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "10%", background: "#16A34A", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF", marginBottom: 2 }}>{item.title}</h4>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", lineHeight: 1.4, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Woman Image with Multi-Stop Smooth Fade */}
          <div className="lp-choose-img" style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", overflow: "visible", position: "relative" }}>
            {/* Soft Ambient Brand Glow */}
            <div style={{
              position: "absolute",
              width: "440px",
              height: "440px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(22, 163, 74, 0.22) 0%, rgba(16, 185, 129, 0.10) 38%, rgba(245, 158, 11, 0.05) 60%, transparent 75%)",
              top: "0%",
              right: "-5%",
              filter: "blur(50px)",
              pointerEvents: "none",
              zIndex: 0
            }} />

            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 70%, rgba(0,0,0,0.6) 84%, transparent 96%)",
              maskImage: "linear-gradient(to bottom, #000 0%, #000 70%, rgba(0,0,0,0.6) 84%, transparent 96%)"
            }}>
              <img src={chooseUsWoman} alt="Professional woman with laptop" style={{
                width: "95%",
                height: "auto",
                display: "block",
                objectFit: "contain",
                transform: "translateX(20px)",
                filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.6))"
              }} />
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════ MADE ON SECTION ═══════════════ */}
      <section className="lp-industry-section" style={{ padding: "40px 6% 100px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <div className="lp-industry-header" style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", color: "#10B981", fontSize: 12, fontWeight: 500, marginBottom: 8 }}>
              Industries
            </div>
            <h2 className="lp-industry-heading" style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, color: "#0F172A", marginBottom: 12, letterSpacing: "normal" }}>
              Built For <span style={{ color: "#10B981" }}>Every Industry</span>
            </h2>
            <p className="lp-industry-desc" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#64748B" }}>
              Empowering Indian businesses to generate leads, automate support and scale revenue.
            </p>
          </div>

          {/* Dark Background Container for Image Gallery */}
          <div className="lp-industry-dark-box" style={{ background: "#0D0D0D", borderRadius: 10, padding: "10px", boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}>
            <div className="lp-industry-flex">
              {[
                { title: "Kirana Store", desc: "Manage orders, send offers and update customers instantly.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>, bgImage: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800", color: "#4CAF50", cols: 3 },
                { title: "Restaurant", desc: "Take reservations, share menus and handle customer queries.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>, bgImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800", color: "#FF9800", cols: 3 },
                { title: "Pharmacy", desc: "Send medicine reminders, offers and order updates.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>, bgImage: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=800", color: "#00BCD4", cols: 3 },
                { title: "Boutique", desc: "Showcase new arrivals, send offers and manage customer chats.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>, bgImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800", color: "#E91E63", cols: 3 },
                { title: "Gym", desc: "Share workout plans, class schedules and membership updates.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>, bgImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800", color: "#9C27B0", cols: 3 },
                { title: "Coaching", desc: "Share study materials, schedules and important announcements.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>, bgImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800", color: "#2196F3", cols: 3 },
                { title: "Clinic", desc: "Manage appointments, send reminders and follow up with patients.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>, bgImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800", color: "#009688", cols: 4 },
                { title: "Automobile", desc: "Share offers, service reminders and booking confirmations.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M3 11l2.5-6h13l2.5 6" /><circle cx="7.5" cy="16.5" r="1.5" /><circle cx="16.5" cy="16.5" r="1.5" /></svg>, bgImage: "https://images.unsplash.com/photo-1562426509-5044a121aa49?q=80&w=800", color: "#1976D2", cols: 4 },
                { title: "Distributor", desc: "Track orders, share updates and manage retailer communication.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>, bgImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800", color: "#FF5722", cols: 4 },
                { title: "Manufacturer", desc: "Manage inquiries, bulk orders and support with ease.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /></svg>, bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800", color: "#4CAF50", cols: 4 }
              ].map((item, idx) => (
                <div key={idx} className="lp-industry-item" style={{
                  width: `calc(${100 / item.cols}% - ${16 * (item.cols - 1) / item.cols}px)`,
                  height: 180,
                  borderRadius: 16,
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}>
                  {/* Background Image */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${item.bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "transform 0.5s ease"
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />

                  {/* Dark Gradient Overlay for text readability */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)" }} />

                  {/* Content */}
                  <div className="lp-industry-content" style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

                    {/* Icon */}
                    <div className="lp-industry-icon" style={{ width: 36, height: 36, borderRadius: 8, background: item.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", marginBottom: 12 }}>
                      {item.icon}
                    </div>

                    {/* Text */}
                    <h3 className="lp-industry-card-title" style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF", marginBottom: 6 }}>{item.title}</h3>
                    <p className="lp-industry-card-desc" style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", lineHeight: 1.5, maxWidth: "90%" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS SECTION ═══════════════ */}
      <section className="lp-testimonial-section" style={{ padding: "20px 5% 50px", background: "radial-gradient(ellipse at top, #FFF7E3 0%, #FFFFFF 50%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", color: "#10B981", fontSize: 12, fontWeight: 500, marginBottom: 8 }}>
              Success Stories
            </div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, color: "#0F172A", marginBottom: 12, letterSpacing: "normal" }}>
              Built to Scale <span style={{ color: "#10B981" }}>Your Business</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#64748B" }}>
              Discover how modern businesses generate leads, automate support, and grow revenue on WhatsApp.
            </p>
          </div>

          {/* Video Testimonial Banner Card */}
          <div style={{ maxWidth: 1000, margin: "0 auto 32px" }}>
            <VideoBanner />
          </div>

          {/* Interactive 3-Card Center-Featured Testimonial Carousel */}
          <div 
            style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "20px 0" }}
            onMouseEnter={() => setIsTestimonialHovered(true)}
            onMouseLeave={() => setIsTestimonialHovered(false)}
          >
            {/* Left Nav Arrow Button */}
            <button
              onClick={() => setCurrentTestimonial(prev => (prev === 0 ? testimonialsList.length - 1 : prev - 1))}
              className="lp-nav-arrow-left"
              style={{
                position: "absolute",
                left: -24,
                top: "50%",
                transform: "translateY(-50%)",
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                transition: "all 0.2s"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#16A34A"; e.currentTarget.style.color = "#FFFFFF"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.color = "#0F172A"; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Right Nav Arrow Button */}
            <button
              onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonialsList.length)}
              className="lp-nav-arrow-right"
              style={{
                position: "absolute",
                right: -24,
                top: "50%",
                transform: "translateY(-50%)",
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                transition: "all 0.2s"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#16A34A"; e.currentTarget.style.color = "#FFFFFF"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.color = "#0F172A"; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* 3 Cards Container (Left, Center Golden, Right) */}
            <div className="lp-testimonial-grid">
              {[
                { ...testimonialsList[(currentTestimonial - 1 + testimonialsList.length) % testimonialsList.length], isCenter: false },
                { ...testimonialsList[currentTestimonial], isCenter: true },
                { ...testimonialsList[(currentTestimonial + 1) % testimonialsList.length], isCenter: false }
              ].map((item, idx) => (
                // eslint-disable-next-line no-unused-vars
                <div
                  key={idx}
                  className={!item.isCenter ? "lp-testimonial-side" : "lp-testimonial-card-active"}
                  style={{
                    background: item.isCenter
                      ? "linear-gradient(135deg, #FFE492 0%, #FFFFFF 65%)"
                      : "linear-gradient(135deg, #FFFDEB 0%, #FFFFFF 80%)",
                    borderRadius: 24,
                    padding: item.isCenter ? "32px 30px" : "24px 22px",
                    boxShadow: item.isCenter
                      ? "0 20px 45px rgba(0,0,0,0.09)"
                      : "0 6px 20px rgba(0,0,0,0.03)",
                    border: item.isCenter
                      ? "1px solid rgba(255, 228, 146, 0.6)"
                      : "1px solid rgba(0,0,0,0.05)",
                    transform: item.isCenter ? "scale(1.05)" : "scale(0.92)",
                    opacity: item.isCenter ? 1 : 0.72,
                    zIndex: item.isCenter ? 5 : 1,
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: item.isCenter ? 260 : 230
                  }}
                >
                  <div>
                    {/* Top Row: Big Quote + Rating Stars */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      {/* Big White Quote Icon */}
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="#FFFFFF" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.04))" }}>
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>

                      {/* Rating */}
                      <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#4A5568", fontSize: item.isCenter ? 13 : 12, fontWeight: 700 }}>
                        <span>{item.rating}</span>
                        <div style={{ display: "flex", color: "#4A5568" }}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <svg key={star} width={item.isCenter ? "13" : "11"} height={item.isCenter ? "13" : "11"} viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review Quote */}
                    <p style={{
                      fontSize: item.isCenter ? 14.5 : 13,
                      color: item.isCenter ? "#334155" : "#64748B",
                      lineHeight: 1.6,
                      marginBottom: 22,
                      fontWeight: item.isCenter ? 600 : 400
                    }}>
                      "{item.review}"
                    </p>
                  </div>

                  {/* Reviewer Details */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: item.isCenter ? 44 : 38,
                        height: item.isCenter ? 44 : 38,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #FFF",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, color: "#0F172A", fontSize: item.isCenter ? 14.5 : 13.5 }}>{item.name}</div>
                      <div style={{ color: "#64748B", fontSize: item.isCenter ? 12.5 : 11.5, fontWeight: 500 }}>{item.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dot Indicators */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 28 }}>
              {testimonialsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  style={{
                    width: currentTestimonial === idx ? 28 : 8,
                    height: 8,
                    borderRadius: 10,
                    background: currentTestimonial === idx ? "#16A34A" : "#CBD5E1",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    padding: 0
                  }}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════ NEWSLETTER SECTION ═══════════════ */}
      <section className="lp-newsletter-section" style={{ padding: "100px 6%", background: "#1F1D1B", position: "relative", overflow: "hidden" }}>
        {/* Map Background Pattern */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#6B5A42",
          WebkitMaskImage: "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')",
          WebkitMaskSize: "cover",
          WebkitMaskPosition: "center",
          maskImage: "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')",
          maskSize: "cover",
          maskPosition: "center",
          opacity: 0.35,
          zIndex: 0
        }} />

        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: "#FFFFFF", marginBottom: 16 }}>
            Subscribe To Our <span style={{ color: "#16A34A" }}>Newsletter</span>
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 40, padding: "0 20px" }}>
            Subscribe to our newsletter and stay ahead with the latest business insights, expert tips, and exclusive platform updates. Join thousands of businesses today and get opportunities delivered straight to your inbox every week!
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNewsletterSubmit();
            }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              style={{ width: "100%", maxWidth: 460, padding: "12px 20px", borderRadius: 8, border: "none", outline: "none", fontSize: 14 }}
            />
            {newsletterStatus && (
              <div style={{ color: newsletterStatus.type === "success" ? "#16A34A" : "#EF4444", fontSize: 14, fontWeight: 600 }}>
                {newsletterStatus.message}
              </div>
            )}
            <button
              type="submit"
              disabled={newsletterLoading}
              style={{ background: "#16A34A", color: "#FFFFFF", border: "none", borderRadius: 8, padding: "12px 36px", fontSize: 14, fontWeight: 600, cursor: newsletterLoading ? "not-allowed" : "pointer", opacity: newsletterLoading ? 0.7 : 1, transition: "background 0.3s" }}
              onMouseEnter={e => { if (!newsletterLoading) e.currentTarget.style.background = "#00A844"; }}
              onMouseLeave={e => { if (!newsletterLoading) e.currentTarget.style.background = "#16A34A"; }}
            >
              {newsletterLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <Footer />
    </div>
  );
};

export default LandingPage;
