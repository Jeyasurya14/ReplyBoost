'use client';

import React from 'react';
import { Button, Typography, Row, Col, Card } from 'antd';
import { RocketOutlined, ThunderboltOutlined, CheckCircleOutlined, SafetyCertificateOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TrustLogos from '../components/TrustLogos';
import Testimonials from '../components/Testimonials';

const { Title, Paragraph, Text } = Typography;

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
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <nav className="border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <RocketOutlined className="text-xl" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">ReplyBoost</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block">
              <Button type="text" className="text-slate-600 hover:text-indigo-600 font-medium">Log in</Button>
            </Link>
            <Link href="/register">
              <Button type="primary" className="bg-indigo-600 hover:bg-indigo-500 border-none shadow-lg shadow-indigo-200 font-semibold px-6 h-10 rounded-full">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 text-center max-w-6xl mx-auto relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-300/20 rounded-full blur-[100px] -z-10" />

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-full border border-indigo-100 hover:bg-indigo-100 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Trusted by 10,000+ Freelancers
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Title level={1} className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              Win More Jobs on <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Upwork & Fiverr
              </span>
            </Title>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Paragraph className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop copy-pasting generic templates. Our AI analyzes the job description and writes a <span className="font-semibold text-slate-800">custom proposal</span> that proves you read it.
            </Paragraph>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link href="/register">
              <Button type="primary" size="large" icon={<ThunderboltOutlined />} className="h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-500 border-none shadow-xl shadow-indigo-200/50 rounded-full font-bold hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                Generate Proposal Now
              </Button>
            </Link>
            <Button size="large" className="h-14 px-8 text-lg border-slate-300 text-slate-700 rounded-full hover:border-indigo-600 hover:text-indigo-600 font-semibold bg-white w-full sm:w-auto">
              How it works
            </Button>
          </motion.div>

          {/* Product Mockup Visualization */}
          <motion.div
            variants={fadeInUp}
            className="rounded-xl border border-slate-200/60 shadow-2xl bg-white/50 backdrop-blur-xl p-2 max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-500"
          >
            <div className="rounded-lg overflow-hidden bg-slate-50 border border-slate-100 aspect-[16/9] flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-white opacity-50"></div>
              {/* Abstract Representation of Interface */}
              <div className="w-3/4 h-3/4 bg-white rounded-lg shadow-lg border border-slate-100 flex flex-col p-6 relative flex-nowrap">
                <div className="flex gap-4 mb-6">
                  <div className="w-1/3 space-y-3">
                    <div className="h-2 w-12 bg-indigo-100 rounded"></div>
                    <div className="h-4 w-full bg-slate-100 rounded"></div>
                    <div className="h-4 w-5/6 bg-slate-100 rounded"></div>
                    <div className="h-4 w-4/6 bg-slate-100 rounded"></div>
                  </div>
                  <div className="w-2/3 bg-indigo-50/50 rounded-lg p-4 border border-indigo-100/50 relative">
                    <div className="absolute top-2 right-2 text-indigo-500"><ThunderboltOutlined /></div>
                    <div className="h-3 w-1/4 bg-indigo-200 rounded mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-slate-200 rounded"></div>
                      <div className="h-2 w-11/12 bg-slate-200 rounded"></div>
                      <div className="h-2 w-full bg-slate-200 rounded"></div>
                    </div>
                    <div className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-lg shadow-indigo-200">
                      Copy Proposal
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 animate-bounce duration-[3000ms]">
                <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600"><CheckCircleOutlined /></div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase">Reply Rate</div>
                    <div className="text-lg font-bold text-slate-900">+300%</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Logos */}
      <TrustLogos />

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <Title level={2} className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Why Top Freelancers Choose Us</Title>
          <Paragraph className="text-slate-500 text-xl max-w-2xl mx-auto">
            It's not just about speed. It's about quality that converts.
          </Paragraph>
        </div>

        <Row gutter={[48, 48]}>
          <Col xs={24} md={12}>
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <RocketOutlined className="text-9xl text-indigo-600" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 text-2xl mb-6">
                  <SafetyCertificateOutlined />
                </div>
                <Title level={3} className="text-2xl font-bold mb-4">Pass AI Detectors</Title>
                <Paragraph className="text-slate-600 text-lg leading-relaxed">
                  Clients ignore generic AI spam. Our models are fine-tuned to sound human, professional, and empathetic—bypassing the "written by ChatGPT" vibe.
                </Paragraph>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="space-y-8">
              {[
                { title: "Reads the Job Description", desc: "We extract key requirements to address them specifically." },
                { title: "Matches Your Tone", desc: "Select from 'Professional', 'Friendly', or 'Persuasive' modes." },
                { title: "Instant Generation", desc: "Get a ready-to-send proposal in under 3 seconds." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="mt-1 bg-green-100 text-green-600 rounded-full p-1"><CheckCircleOutlined /></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 z-0"></div>

        {/* Dynamic shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <Title level={2} className="text-white text-4xl md:text-5xl font-bold mb-6">
            Start Landing Your Dream Clients
          </Title>
          <Paragraph className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto">
            Join the top 1% of freelancers who treat their proposals as a science, not a guessing game.
          </Paragraph>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link href="/register">
              <Button type="primary" size="large" className="h-16 px-12 text-xl bg-white text-indigo-900 hover:bg-slate-100 border-none font-bold rounded-full shadow-2xl hover:scale-105 transition-transform w-full sm:w-auto">
                Get Started for Free
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex justify-center gap-8 text-slate-400 text-sm font-medium">
            <span className="flex items-center gap-2"><CheckCircleOutlined className="text-indigo-400" /> No Credit Card Required</span>
            <span className="flex items-center gap-2"><CheckCircleOutlined className="text-indigo-400" /> 20 Free Proposals</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <RocketOutlined className="text-lg" />
            </div>
            <span className="text-xl font-bold text-slate-800">ReplyBoost</span>
          </div>
          <div className="flex justify-center gap-8 mb-8 text-slate-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Blog</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
          </div>
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} ReplyBoost. Helping freelancers grow since 2024.</p>
        </div>
      </footer>
    </div>
  );
}
