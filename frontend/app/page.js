'use client';

import React from 'react';
import { Button, Typography, Card, Row, Col, Space } from 'antd';
import { RocketOutlined, ThunderboltOutlined, CheckCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;

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
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto relative z-50">
        <div className="flex items-center space-x-2">
          <RocketOutlined className="text-3xl text-indigo-600" />
          <span className="text-xl font-bold tracking-tight text-slate-800">ReplyBoost</span>
        </div>
        <div className="space-x-4">
          <Link href="/login">
            <Button type="text" className="text-slate-600 hover:text-indigo-600 text-base">Login</Button>
          </Link>
          <Link href="/register">
            <Button type="primary" size="large" className="bg-indigo-600 hover:bg-indigo-500 border-none shadow-lg shadow-indigo-200 font-medium transform hover:scale-105 transition-transform">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-5xl mx-auto relative">
        {/* Animated Background Blobs */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-200/30 rounded-full blur-3xl -z-10"
        />

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="w-full">
          <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full border border-indigo-100">
            For Upwork & Fiverr Freelancers
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Title level={1} className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              Stop Sending Proposals <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-500">
                That Get Ignored.
              </span>
            </Title>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Paragraph className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Use AI to write hyper-personalized proposals in seconds. Increase your reply rate by 3x and land more clients effortlessly.
            </Paragraph>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex justify-center gap-4">
            <Link href="/register">
              <Button type="primary" size="large" icon={<ThunderboltOutlined />} className="h-14 px-10 text-lg bg-indigo-600 hover:bg-indigo-500 border-none shadow-xl shadow-indigo-200 rounded-full font-semibold hover:scale-105 transition-all duration-300">
                Generate First Proposal
              </Button>
            </Link>
            <Button type="default" size="large" className="h-14 px-10 text-lg border-slate-300 text-slate-700 rounded-full hover:border-indigo-300 hover:text-indigo-600 hover:scale-105 transition-all duration-300">
              View Demo
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-12 bg-white/50 backdrop-blur-sm border-y border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="group cursor-default">
            <div className="text-5xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">3x</div>
            <div className="text-slate-500 font-medium">Higher Reply Rate</div>
          </div>
          <div className="group cursor-default">
            <div className="text-5xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">10k+</div>
            <div className="text-slate-500 font-medium">Proposals Generated</div>
          </div>
          <div className="group cursor-default">
            <div className="text-5xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Wait? 0s</div>
            <div className="text-slate-500 font-medium">Instant AI Generation</div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Title level={2} className="text-4xl font-bold text-slate-900 mb-4">How It Works</Title>
          <Text className="text-slate-500 text-xl">Three simple steps to your next client.</Text>
        </motion.div>

        <Row gutter={[32, 32]}>
          {[
            {
              icon: <ThunderboltOutlined className="text-3xl text-blue-600" />,
              bg: "bg-blue-50",
              title: "1. Paste Job",
              desc: "Copy the job details from Upwork or Fiverr. Our AI analyzes the core pain points instantly."
            },
            {
              icon: <SafetyCertificateOutlined className="text-3xl text-indigo-600" />,
              bg: "bg-indigo-50",
              title: "2. AI Writes Reply",
              desc: "We generate a persuasive, personalized proposal that speaks directly to the client's needs."
            },
            {
              icon: <CheckCircleOutlined className="text-3xl text-green-600" />,
              bg: "bg-green-50",
              title: "3. Send & Track",
              desc: "Copy the text, send it off, and track your success rates directly in our dashboard."
            }
          ].map((feature, idx) => (
            <Col xs={24} md={8} key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
              >
                <Card className="h-full border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-3xl p-6 cursor-pointer">
                  <div className={`h-16 w-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6`}>
                    {feature.icon}
                  </div>
                  <Title level={3} className="text-2xl mb-4">{feature.title}</Title>
                  <Paragraph className="text-slate-500 text-lg leading-relaxed">
                    {feature.desc}
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-slate-900 text-center relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(79,70,229,0.1)_0deg,transparent_60deg,transparent_300deg,rgba(79,70,229,0.1)_360deg)] pointer-events-none"
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Title level={2} className="text-white text-4xl md:text-5xl font-bold mb-8">
              Ready to Land More Jobs?
            </Title>
            <Paragraph className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto">
              Join freelancers who are saving time and earning more with AI-powered proposals.
            </Paragraph>
            <Link href="/register">
              <Button type="primary" size="large" className="h-16 px-12 text-xl bg-white text-slate-900 hover:bg-slate-100 border-none font-bold rounded-full shadow-2xl hover:scale-105 transition-transform">
                Start for Free
              </Button>
            </Link>
            <div className="mt-8 text-slate-500">
              No credit card required. Cancel anytime.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-400 bg-slate-50 border-t border-slate-200">
        <div className="flex justify-center items-center gap-2 mb-4">
          <RocketOutlined className="text-indigo-500 text-xl" />
          <span className="font-bold text-slate-700 text-lg">ReplyBoost</span>
        </div>
        <p className="text-sm">© 2026 ReplyBoost. All rights reserved.</p>
      </footer>
    </div>
  );
}
