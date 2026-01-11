'use client';

import React from 'react';
import { Button, Typography, Card, Row, Col, Space } from 'antd';
import { RocketOutlined, ThunderboltOutlined, CheckCircleOutlined, GithubOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text, Paragraph } = Typography;

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <RocketOutlined className="text-3xl text-indigo-600" />
          <span className="text-xl font-bold tracking-tight text-slate-800">ReplyBoost</span>
        </div>
        <div className="space-x-4">
          <Link href="/login">
            <Button type="text" className="text-slate-600 hover:text-indigo-600 text-base">Login</Button>
          </Link>
          <Link href="/register">
            <Button type="primary" size="large" className="bg-indigo-600 hover:bg-indigo-500 border-none shadow-lg shadow-indigo-200 font-medium">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-5xl mx-auto">
        <Space direction="vertical" size="large" className="w-full">
          <div className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full border border-indigo-100">
            For Upwork & Fiverr Freelancers
          </div>
          <Title level={1} className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            Stop Sending Proposals <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
              That Get Ignored.
            </span>
          </Title>
          <Paragraph className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Use AI to write hyper-personalized proposals in seconds. Increase your reply rate by 3x and land more clients effortlessly.
          </Paragraph>
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button type="primary" size="large" icon={<ThunderboltOutlined />} className="h-14 px-10 text-lg bg-indigo-600 hover:bg-indigo-500 border-none shadow-xl shadow-indigo-200 rounded-full font-semibold">
                Generate First Proposal
              </Button>
            </Link>
            <Button type="default" size="large" className="h-14 px-10 text-lg border-slate-300 text-slate-700 rounded-full hover:border-indigo-300 hover:text-indigo-600">
              View Demo
            </Button>
          </div>
        </Space>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-slate-900 mb-2">3x</div>
            <div className="text-slate-500 font-medium">Higher Reply Rate</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-slate-900 mb-2">10k+</div>
            <div className="text-slate-500 font-medium">Proposals Generated</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-slate-900 mb-2">Under 10s</div>
            <div className="text-slate-500 font-medium">Time to Generate</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Title level={2} className="text-4xl font-bold text-slate-900 mb-4">How It Works</Title>
          <Text className="text-slate-500 text-xl">Three simple steps to your next client.</Text>
        </div>

        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <Card className="h-full border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl p-6">
              <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <ThunderboltOutlined className="text-3xl text-blue-600" />
              </div>
              <Title level={3} className="text-2xl mb-4">1. Paste Job</Title>
              <Paragraph className="text-slate-500 text-lg leading-relaxed">
                Copy the job details from Upwork or Fiverr. Our AI analyzes the core pain points instantly.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="h-full border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl p-6">
              <div className="h-16 w-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                <SafetyCertificateOutlined className="text-3xl text-indigo-600" />
              </div>
              <Title level={3} className="text-2xl mb-4">2. AI Writes Reply</Title>
              <Paragraph className="text-slate-500 text-lg leading-relaxed">
                We generate a persuasive, personalized proposal that speaks directly to the client's needs.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="h-full border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl p-6">
              <div className="h-16 w-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircleOutlined className="text-3xl text-green-600" />
              </div>
              <Title level={3} className="text-2xl mb-4">3. Send & Track</Title>
              <Paragraph className="text-slate-500 text-lg leading-relaxed">
                Copy the text, send it off, and track your success rates directly in our dashboard.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/20 to-purple-900/20"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <Title level={2} className="text-white text-4xl md:text-5xl font-bold mb-8">
            Ready to Land More Jobs?
          </Title>
          <Paragraph className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto">
            Join freelancers who are saving time and earning more with AI-powered proposals.
          </Paragraph>
          <Link href="/register">
            <Button type="primary" size="large" className="h-16 px-12 text-xl bg-white text-slate-900 hover:bg-slate-100 border-none font-bold rounded-full shadow-2xl">
              Start for Free
            </Button>
          </Link>
          <div className="mt-8 text-slate-500">
            No credit card required. Cancel anytime.
          </div>
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
