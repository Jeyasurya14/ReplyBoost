'use client';

import React from 'react';
import { Button, Layout, Typography, Card, Space, theme } from 'antd';
import { RocketOutlined, CheckCircleOutlined, ThunderboltOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function Home() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen bg-white">
      <Header className="flex items-center justify-between px-6 md:px-12 bg-white border-b border-gray-100 h-20 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1 rounded-lg">
            <RocketOutlined style={{ fontSize: '20px' }} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">ReplyBoost</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button type="text" size="large">Login</Button>
          </Link>
          <Link href="/register">
            <Button type="primary" size="large" className="bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-200">Start Free</Button>
          </Link>
        </div>
      </Header>

      <Content className="bg-white">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-medium text-sm border border-blue-100">
            For Freelancers on Upwork & Fiverr
          </div>
          <Title level={1} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gray-900">
            Get more freelance replies <br className="hidden md:block" />
            <span className="text-blue-600">in 7 days.</span>
          </Title>
          <Paragraph className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed md:text-2xl">
            Send fewer proposals, get more replies — consistently. <br />
            We enforce structure, discipline, and feedback loops to boost your conversion.
          </Paragraph>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button type="primary" size="large" icon={<RocketOutlined />} className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200/50">
                Start Free Trial
              </Button>
            </Link>
            <Button size="large" className="h-14 px-8 text-lg rounded-xl hover:text-blue-600 hover:border-blue-600">
              How it works
            </Button>
          </div>
          <div className="mt-12 flex flex-col md:flex-row justify-center gap-4 md:gap-8 text-gray-400 text-sm font-medium">
            <span className="flex items-center gap-2 justify-center"><CheckCircleOutlined className="text-green-500" /> No Credit Card Required</span>
            <span className="flex items-center gap-2 justify-center"><CheckCircleOutlined className="text-green-500" /> 1 Proposal/Day Free</span>
            <span className="flex items-center gap-2 justify-center"><CheckCircleOutlined className="text-green-500" /> AI-Powered Engine</span>
          </div>
        </div>

        {/* Value Prop / How it works */}
        <div className="bg-gray-50 py-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Title level={2} className="text-3xl font-bold mb-4">How ReplyBoost Works</Title>
              <Text className="text-gray-500 text-lg">Three simple steps to consistently win more clients.</Text>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card bordered={false} className="shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl p-4">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                  <ThunderboltOutlined style={{ fontSize: '24px' }} />
                </div>
                <Title level={4} className="mb-3">1. Paste Job Description</Title>
                <Text className="text-gray-500 leading-relaxed block">
                  Simply copy the job post from Upwork or Fiverr. Our system analyzes the requirements instantly to find the key pain points.
                </Text>
              </Card>
              <Card bordered={false} className="shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl p-4">
                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                  <SafetyCertificateOutlined style={{ fontSize: '24px' }} />
                </div>
                <Title level={4} className="mb-3">2. Get AI-Optimized Reply</Title>
                <Text className="text-gray-500 leading-relaxed block">
                  We generate a structured, 150-word proposal hook proven to grab attention. No free chat, just results.
                </Text>
              </Card>
              <Card bordered={false} className="shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl p-4">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                  <CheckCircleOutlined style={{ fontSize: '24px' }} />
                </div>
                <Title level={4} className="mb-3">3. Track & Improve</Title>
                <Text className="text-gray-500 leading-relaxed block">
                  Mark proposals as sent, viewed, or replied. Visualize your data and learn what works best for your niche.
                </Text>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center bg-blue-600 rounded-3xl py-16 text-white shadow-2xl shadow-blue-200">
            <Title level={2} className="text-white text-3xl md:text-4xl font-bold mb-6">
              Ready to win more clients?
            </Title>
            <Paragraph className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Join hundreds of freelancers who are sending fewer proposals and getting more replies.
            </Paragraph>
            <Link href="/register">
              <Button size="large" className="h-14 px-10 text-lg font-semibold border-none text-blue-600 bg-white hover:bg-gray-100 rounded-xl">
                Start for Free
              </Button>
            </Link>
            <div className="mt-8 text-sm text-blue-200">
              No credit card required • Cancel anytime
            </div>
          </div>
        </div>
      </Content>

      <Footer className="text-center bg-white border-t border-gray-100 py-10">
        <Space direction="vertical" size="small">
          <div className="font-bold text-gray-900 flex items-center justify-center gap-2">
            <RocketOutlined /> ReplyBoost
          </div>
          <Text type="secondary">Built for freelancers who want to win.</Text>
          <Text type="secondary" className="text-xs">© 2026 ReplyBoost. All rights reserved.</Text>
        </Space>
      </Footer>
    </Layout>
  );
}
