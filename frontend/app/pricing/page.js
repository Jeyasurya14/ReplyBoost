'use client';

import React, { useState } from 'react';
import { Typography, Button, Switch, Card, Row, Col, Collapse } from 'antd';
import { CheckCircleOutlined, RocketOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

export default function Pricing() {
    const [isAnnual, setIsAnnual] = useState(false);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Navbar (Simplified for sub-pages, or duplicate main one) */}
            <nav className="border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                    <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                            <RocketOutlined className="text-xl" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">ReplyBoost</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <Button type="text" className="text-slate-600 hover:text-indigo-600 font-medium">Log in</Button>
                        </Link>
                        <Link href="/register">
                            <Button type="primary" className="bg-indigo-600 hover:bg-indigo-500 border-none shadow-lg shadow-indigo-200 font-semibold px-6 h-10 rounded-full">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-20">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="text-center mb-16"
                >
                    <motion.div variants={fadeInUp}>
                        <Title level={1} className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Simple, Transparent Pricing
                        </Title>
                        <Paragraph className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                            Start for free, then upgrade as you grow. No hidden fees.
                        </Paragraph>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="flex justify-center items-center gap-4 mb-12">
                        <span className={`text-lg font-medium ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
                        <Switch
                            checked={isAnnual}
                            onChange={setIsAnnual}
                            className={`bg-slate-300 hover:bg-slate-400 ${isAnnual ? '!bg-indigo-600' : ''}`}
                        />
                        <span className={`text-lg font-medium ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
                            Yearly <span className="text-indigo-600 text-sm font-bold bg-indigo-50 px-2 py-0.5 rounded-full ml-1">Save 20%</span>
                        </span>
                    </motion.div>

                    <Row gutter={[32, 32]} justify="center">
                        {/* Free Plan */}
                        <Col xs={24} md={10} lg={8}>
                            <motion.div variants={fadeInUp} className="h-full">
                                <Card className="h-full border border-slate-200 rounded-3xl hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center p-6 relative bg-white">
                                    <Title level={3} className="mb-2">Free</Title>
                                    <div className="text-4xl font-extrabold text-slate-900 mb-2">$0</div>
                                    <div className="text-slate-500 mb-8">Forever</div>

                                    <Link href="/register" className="w-full">
                                        <Button size="large" className="w-full h-12 rounded-xl text-lg font-semibold border-indigo-600 text-indigo-600 hover:bg-indigo-50 mb-8">
                                            Get Started
                                        </Button>
                                    </Link>

                                    <div className="space-y-4 text-left w-full">
                                        <div className="flex items-center gap-3">
                                            <CheckCircleOutlined className="text-indigo-600" />
                                            <span className="text-slate-700">20 Proposals / Day</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CheckCircleOutlined className="text-indigo-600" />
                                            <span className="text-slate-700">Basic AI Model</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CheckCircleOutlined className="text-indigo-600" />
                                            <span className="text-slate-700">Standard Support</span>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </Col>

                        {/* Pro Plan */}
                        <Col xs={24} md={10} lg={8}>
                            <motion.div variants={fadeInUp} className="h-full relative">
                                <div className="absolute -top-4 -right-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg z-10">
                                    Most Popular
                                </div>
                                <Card className="h-full border-2 border-indigo-600 rounded-3xl shadow-xl shadow-indigo-100 flex flex-col items-center text-center p-6 bg-white relative overflow-hidden">
                                    <Title level={3} className="text-indigo-600 mb-2">Pro</Title>
                                    <div className="flex items-baseline justify-center mb-2">
                                        <span className="text-5xl font-extrabold text-slate-900">${isAnnual ? '15' : '19'}</span>
                                        <span className="text-slate-500 ml-1">/mo</span>
                                    </div>
                                    <div className="text-slate-500 mb-8">{isAnnual ? 'Billed $180 yearly' : 'Billed monthly'}</div>

                                    <Link href="/register" className="w-full">
                                        <Button type="primary" size="large" className="w-full h-12 rounded-xl text-lg font-bold bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-200 mb-8 border-none">
                                            Upgrade to Pro
                                        </Button>
                                    </Link>

                                    <div className="space-y-4 text-left w-full">
                                        <div className="flex items-center gap-3">
                                            <CheckCircleOutlined className="text-green-500" />
                                            <span className="text-slate-900 font-medium">100 Proposals / Day</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CheckCircleOutlined className="text-green-500" />
                                            <span className="text-slate-900 font-medium">Premium AI (GPT-4)</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CheckCircleOutlined className="text-green-500" />
                                            <span className="text-slate-900 font-medium">Priority Support</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CheckCircleOutlined className="text-green-500" />
                                            <span className="text-slate-900 font-medium">Access to New Features</span>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </Col>
                    </Row>

                    {/* FAQ Section */}
                    <motion.div variants={fadeInUp} className="mt-24 max-w-3xl mx-auto text-left">
                        <Title level={2} className="text-center mb-10">Frequently Asked Questions</Title>
                        <Collapse ghost expandIconPosition="end" size="large">
                            <Panel header={<span className="text-lg font-medium text-slate-800">Can I cancel anytime?</span>} key="1">
                                <p className="text-slate-600">Yes, you can cancel your subscription at any time. You&apos;ll keep access to Pro features until the end of your billing cycle.</p>
                            </Panel>
                            <Panel header={<span className="text-lg font-medium text-slate-800">What happens if I hit my daily limit?</span>} key="2">
                                <p className="text-slate-600">If you&apos;re on the Free plan, you&apos;ll need to wait until the next day (UTC time) or upgrade to Pro for more credits immediately.</p>
                            </Panel>
                            <Panel header={<span className="text-lg font-medium text-slate-800">Do you offer refunds?</span>} key="3">
                                <p className="text-slate-600">We offer a 7-day money-back guarantee if you&apos;re not satisfied with the Pro plan.</p>
                            </Panel>
                        </Collapse>
                    </motion.div>

                </motion.div>
            </div>

            {/* Footer */}
            <footer className="py-12 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex justify-center items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                            <RocketOutlined className="text-lg" />
                        </div>
                        <span className="text-xl font-bold text-slate-800">ReplyBoost</span>
                    </div>
                    <p className="text-slate-400 text-sm">© {new Date().getFullYear()} ReplyBoost. Helping freelancers grow since 2024.</p>
                </div>
            </footer>
        </div>
    );
}
