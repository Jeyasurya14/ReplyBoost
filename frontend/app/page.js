'use client';

import React from 'react';
import { Button, Row, Col } from 'antd';
import {
  RocketOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  FireOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TrustLogos from '../components/TrustLogos';
import Testimonials from '../components/Testimonials';

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute top-0 left-0 w-full h-[1000px] overflow-hidden -z-10 bg-slate-950">
          <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-[pulse_6s_infinite]"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px]"></div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span>Trusted by 10,000+ Freelancers</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeInUp}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
              Win More Jobs on <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 animate-gradient-x">
                Upwork & Fiverr
              </span>
            </h1>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Stop copy-pasting generic templates. Our AI analyzes job descriptions and generates
              <span className="text-indigo-300 font-semibold"> highly personalized proposals </span>
              that prove you actually read them.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-5 mb-20">
            <Link href="/register">
              <Button type="primary" size="large" className="h-14 px-10 text-lg bg-indigo-600 hover:bg-indigo-500 border-none shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] rounded-full font-bold hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2">
                <ThunderboltOutlined /> Generate Proposal Now
              </Button>
            </Link>
            <Button size="large" className="h-14 px-10 text-lg border-white/20 text-white rounded-full hover:border-white/50 hover:bg-white/5 hover:text-white font-semibold bg-transparent w-full sm:w-auto backdrop-blur-sm">
              <span className="mr-2">▶</span> Watch Demo
            </Button>
          </motion.div>

          {/* Mockup */}
          <motion.div variants={fadeInUp} className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-indigo-500/20 blur-[60px] -z-10 rounded-full"></div>
            <div className="glass-card rounded-2xl border border-white/10 p-2 md:p-4 shadow-2xl">
              <div className="bg-slate-900 rounded-xl overflow-hidden aspect-[16/10] relative border border-white/5 group">
                {/* Mock UI Header */}
                <div className="h-12 border-b border-white/5 bg-slate-800/50 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                {/* Mock Content */}
                <div className="p-8 flex gap-8 h-full">
                  {/* Sidebar */}
                  <div className="w-64 hidden md:block space-y-4">
                    <div className="h-8 w-3/4 bg-white/5 rounded animate-pulse"></div>
                    <div className="space-y-2 mt-8">
                      <div className="h-4 w-full bg-white/5 rounded opacity-50"></div>
                      <div className="h-4 w-5/6 bg-white/5 rounded opacity-50"></div>
                      <div className="h-4 w-4/6 bg-white/5 rounded opacity-50"></div>
                    </div>
                  </div>
                  {/* Main Area */}
                  <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="h-10 w-1/3 bg-indigo-500/20 rounded animate-pulse"></div>
                      <div className="h-10 w-32 bg-indigo-600 rounded shadow-lg shadow-indigo-500/20"></div>
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5 space-y-3">
                      <div className="h-4 w-full bg-white/10 rounded"></div>
                      <div className="h-4 w-11/12 bg-white/10 rounded"></div>
                      <div className="h-4 w-full bg-white/10 rounded"></div>
                      <div className="h-4 w-3/4 bg-white/10 rounded"></div>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <div className="glass-panel p-4 rounded-lg flex-1 border-emerald-500/20">
                        <div className="text-emerald-400 font-bold text-lg mb-1">98%</div>
                        <div className="text-slate-500 text-xs">Match Score</div>
                      </div>
                      <div className="glass-panel p-4 rounded-lg flex-1">
                        <div className="text-indigo-400 font-bold text-lg mb-1">Human</div>
                        <div className="text-slate-500 text-xs">Tone Analysis</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlay Badge */}
                <div className="absolute bottom-10 right-10 bg-gradient-to-r from-indigo-600 to-violet-600 p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-4 animate-[float_6s_ease-in-out_infinite]">
                  <div className="bg-white/20 p-2 rounded-full text-white"><RocketOutlined /></div>
                  <div>
                    <div className="text-xs text-indigo-100 font-medium uppercase tracking-wider">Reply Rate</div>
                    <div className="text-xl font-bold text-white">+300%</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Logos */}
      <div className="border-y border-white/5 bg-slate-950/50">
        <TrustLogos theme="dark" />
      </div>

      {/* Features Grid */}
      <section className="py-32 px-6 bg-[#030712] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Built for Freelance Domination</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Combining advanced LLMs with proven sales psychology to help you close deals.
            </p>
          </div>

          <Row gutter={[32, 32]}>
            <Col xs={24} lg={14}>
              <div className="glass-card h-full rounded-3xl p-10 relative overflow-hidden group hover:border-indigo-500/30 transition-colors duration-500">
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <SafetyCertificateOutlined className="text-9xl text-indigo-400" />
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 text-2xl mb-8 border border-indigo-500/20">
                    <SafetyCertificateOutlined />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Undetectable AI</h3>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    Most clients instantly reject &quot;ChatGPT-sounding&quot; proposals. Our engine is fine-tuned on millions of successful proposals to sound
                    <span className="text-indigo-300"> authentically human</span>, empathetic, and professional.
                  </p>
                  <div className="flex gap-4">
                    <div className="bg-white/5 px-4 py-2 rounded-lg text-sm text-slate-300 border border-white/5 flex items-center gap-2">
                      <CheckCircleOutlined className="text-emerald-500" /> Natural Phrasing
                    </div>
                    <div className="bg-white/5 px-4 py-2 rounded-lg text-sm text-slate-300 border border-white/5 flex items-center gap-2">
                      <CheckCircleOutlined className="text-emerald-500" /> Zero Fluff
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={24} lg={10}>
              <div className="flex flex-col gap-8 h-full">
                {[
                  { icon: <FireOutlined />, title: "Instant Generation", desc: "From blank page to ready-to-send in < 3 seconds.", color: "orange" },
                  { icon: <GlobalOutlined />, title: "Language Support", desc: "Generate proposals in 25+ languages automatically.", color: "cyan" },
                  { icon: <ThunderboltOutlined />, title: "Smart Keywords", desc: "We mirror the client's keywords to boost relevance.", color: "purple" }
                ].map((item, idx) => (
                  <div key={idx} className="glass-panel p-8 rounded-3xl flex items-start gap-6 hover:bg-white/5 transition-colors duration-300">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 bg-${item.color}-500/10 text-${item.color}-400 border border-${item.color}-500/20`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Paste Job Link", desc: "Simply paste the URL from Upwork, Fiverr, or Freelancer." },
              { step: "02", title: "AI Analysis", desc: "We identify the client's pain points, tone, and requirements." },
              { step: "03", title: "Review & Send", desc: "Get a tailored proposal that hits every requirement." }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="text-8xl font-black text-white/5 absolute -top-10 -left-6 select-none group-hover:text-white/10 transition-colors">
                  {item.step}
                </div>
                <div className="relative z-10 pt-8 pl-4">
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-slate-400 text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <div className="bg-[#030712] py-10">
        <Testimonials theme="dark" />
      </div>

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/20 z-0"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to 10x Your Reply Rate?</h2>
          <p className="text-xl text-indigo-200 mb-12">Join the elite freelancers who let AI handle the selling, while they focus on the work.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/register">
              <Button type="primary" size="large" className="h-16 px-12 text-xl bg-white text-indigo-950 hover:bg-indigo-50 border-none font-bold rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform w-full sm:w-auto">
                Start for Free
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-indigo-300/60 text-sm">No credit card required • 20 free credits included</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
