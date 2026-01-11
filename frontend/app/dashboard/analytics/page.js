'use client';

import React from 'react';
import { Card, Row, Col, Typography, Statistic, Progress } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { ArrowUpOutlined, EyeOutlined, MessageOutlined, FileTextOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Dummy data for visualization
import api from '@/lib/api';

export default function AnalyticsPage() {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState({
        total_proposals: 0,
        response_rate: 0,
        profile_views: 0,
        chart_data: [],
        funnel_data: []
    });

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/proposals/analytics');
                setData(res.data);
            } catch (error) {
                console.error("Failed to load analytics", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Provide default data if empty to prevent chart crash
    const chartData = data.chart_data.length > 0 ? data.chart_data : [{ name: 'No Data', sent: 0 }];
    const funnelData = data.funnel_data.length > 0 ? data.funnel_data : [{ name: 'No Data', value: 0 }];

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <Title level={2} className="mb-1 text-slate-800 tracking-tight">Analytics</Title>
                <Text className="text-slate-500 text-lg">Track your proposal performance and success rates.</Text>
            </div>

            <Row gutter={[24, 24]} className="mb-8">
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm rounded-2xl h-full" loading={loading}>
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Total Proposals</span>}
                            value={data.total_proposals}
                            prefix={<FileTextOutlined className="text-indigo-500 mr-2" />}
                        />
                        <div className="mt-2 text-green-500 text-xs font-medium flex items-center">
                            <ArrowUpOutlined className="mr-1" /> Real-time
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm rounded-2xl h-full" loading={loading}>
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Response Rate</span>}
                            value={data.response_rate}
                            precision={1}
                            suffix="%"
                            prefix={<MessageOutlined className="text-green-500 mr-2" />}
                        />
                        <div className="mt-2 text-slate-400 text-xs font-medium">
                            Based on replies
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm rounded-2xl h-full" loading={loading}>
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Views</span>}
                            value={data.profile_views}
                            prefix={<EyeOutlined className="text-blue-500 mr-2" />}
                        />
                        <div className="mt-2 text-slate-400 text-xs font-medium">
                            Proposals viewed
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm rounded-2xl h-full" loading={loading}>
                        <div className="mb-2 text-slate-500 font-medium">Daily Goal</div>
                        <Progress type="circle" percent={75} size={60} strokeColor="#4F46E5" />
                        <span className="ml-4 text-slate-700 font-bold text-lg">3 / 4</span>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Card bordered={false} className="shadow-sm rounded-2xl mb-8" loading={loading}>
                        <div className="mb-6">
                            <Title level={4} className="m-0 text-slate-700">Proposal Activity</Title>
                            <Text type="secondary">Proposals sent over the last 7 days</Text>
                        </div>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="sent" stroke="#4F46E5" fillOpacity={1} fill="url(#colorSent)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card bordered={false} className="shadow-sm rounded-2xl h-full" loading={loading}>
                        <div className="mb-6">
                            <Title level={4} className="m-0 text-slate-700">Conversion Funnel</Title>
                            <Text type="secondary">Views vs Replies</Text>
                        </div>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={funnelData}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} name="Count" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
