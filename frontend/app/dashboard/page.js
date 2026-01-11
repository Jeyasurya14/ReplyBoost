'use client';

import React from 'react';
import { Card, Row, Col, Statistic, Button, Typography, theme } from 'antd';
import { ArrowUpOutlined, ThunderboltOutlined, FileTextOutlined, DollarOutlined, PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

export default function Dashboard() {
    const router = useRouter();
    const {
        token: { colorPrimary },
    } = theme.useToken();

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <Title level={2} className="mb-1 text-slate-800 tracking-tight">Dashboard</Title>
                    <Text className="text-slate-500 text-lg">Welcome back! Here's what's happening today.</Text>
                </div>
                <Button
                    type="primary"
                    icon={<ThunderboltOutlined />}
                    size="large"
                    className="h-12 px-6 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-200 border-none rounded-xl font-medium text-base"
                    onClick={() => router.push('/dashboard/generate')}
                >
                    Generate New Reply
                </Button>
            </div>

            <Row gutter={[24, 24]} className="mb-10">
                <Col xs={24} md={8}>
                    <Card bordered={false} className="h-full shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                                    <FileTextOutlined className="text-xl" />
                                </div>
                                <Text className="text-slate-500 font-medium">Daily Proposals</Text>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-slate-800">0</span>
                                <span className="text-slate-400 text-lg">/ 1</span>
                            </div>
                            <div className="mt-4">
                                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '0%' }}></div>
                                </div>
                                <Text className="text-xs text-slate-400 mt-2 block">Resets in 14 hours</Text>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card bordered={false} className="h-full shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 bg-green-100 text-green-600 rounded-xl">
                                    <ArrowUpOutlined className="text-xl" />
                                </div>
                                <Text className="text-slate-500 font-medium">Reply Rate</Text>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-slate-800">0.0%</span>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+0% this week</span>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card bordered={false} className="h-full shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl">
                                    <DollarOutlined className="text-xl" />
                                </div>
                                <Text className="text-slate-500 font-medium">Total Earned</Text>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-slate-800">$0.00</span>
                            </div>
                            <div className="mt-4">
                                <Button type="link" onClick={() => window.location.href = '/dashboard/income'} className="p-0 h-auto text-purple-600 hover:text-purple-700 flex items-center gap-1">Add Income <PlusOutlined className="text-xs" /></Button>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Title level={4} className="mb-6 text-slate-700">Recent Activity</Title>
            <Card className="text-center py-20 bg-white border-2 border-dashed border-slate-200 rounded-3xl shadow-none hover:border-indigo-200 transition-colors cursor-pointer group" bordered={false}>
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                    <ThunderboltOutlined className="text-3xl" />
                </div>
                <Title level={4} className="text-slate-600 mb-2 font-medium">No proposals sent yet</Title>
                <Text className="text-slate-400 block mb-8 max-w-sm mx-auto">Start generating AI-powered proposals to see your history and stats here.</Text>

                <Button
                    type="primary"
                    size="large"
                    className="h-12 px-8 bg-white text-indigo-600 border-2 border-indigo-100 hover:border-indigo-600 hover:text-indigo-700 font-medium rounded-xl shadow-none"
                    onClick={() => window.location.href = '/dashboard/generate'}
                >
                    Create First Proposal
                </Button>
            </Card>
        </div>
    );
}
