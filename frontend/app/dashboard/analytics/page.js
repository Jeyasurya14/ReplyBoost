'use client';

import React from 'react';
import { Card, Row, Col, Typography, Statistic, Progress, List, Tag } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpOutlined, EyeOutlined, MessageOutlined, FileTextOutlined, BulbOutlined, CheckCircleOutlined } from '@ant-design/icons';
import api from '@/lib/api';

const { Title, Text } = Typography;

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

    const chartData = data.chart_data.length > 0 ? data.chart_data : [{ name: 'No Data', sent: 0 }];

    return (
        <div className="max-w-6xl mx-auto pb-12 animate-fade-in">
            <div className="mb-8">
                <Title level={2} className="!text-slate-900 !mb-2 tracking-tight">Reply Score</Title>
                <p className="text-slate-500 text-lg">Measure your performance and improve your outreach.</p>
            </div>

            <Row gutter={[24, 24]}>
                {/* Scorecards */}
                {[
                    { title: 'Total Proposals', value: data.total_proposals, icon: <FileTextOutlined />, bg: 'bg-blue-50', text: 'text-blue-600' },
                    { title: 'Reply Rate', value: `${data.response_rate}%`, icon: <MessageOutlined />, bg: 'bg-emerald-50', text: 'text-emerald-600' },
                    { title: 'Profile Views', value: data.profile_views, icon: <EyeOutlined />, bg: 'bg-purple-50', text: 'text-purple-600' },
                ].map((item, idx) => (
                    <Col xs={24} sm={8} key={idx}>
                        <div className="saas-card p-6 flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl ${item.bg} ${item.text}`}>
                                {item.icon}
                            </div>
                            <div>
                                <div className="text-slate-500 font-medium mb-1 text-sm uppercase tracking-wide">{item.title}</div>
                                <div className="text-3xl font-bold text-slate-900 leading-none">{item.value}</div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            <Row gutter={[24, 24]} className="mt-8">
                {/* Chart */}
                <Col xs={24} lg={16}>
                    <div className="saas-card p-8 h-[450px] flex flex-col">
                        <div className="mb-6 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 m-0">Performance Trend</h3>
                                <div className="text-slate-400 text-sm">Last 30 Days</div>
                            </div>
                        </div>

                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    />
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            color: '#1e293b',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                        itemStyle={{ color: '#4F46E5' }}
                                        cursor={{ stroke: '#cbd5e1' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="sent"
                                        stroke="#4F46E5"
                                        fillOpacity={1}
                                        fill="url(#colorSent)"
                                        strokeWidth={3}
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#fff', stroke: '#4F46E5' }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </Col>

                {/* Insights Side Panel */}
                <Col xs={24} lg={8}>
                    <div className="saas-card p-6 h-full flex flex-col">
                        <div className="mb-6 flex items-center gap-2 text-amber-500">
                            <BulbOutlined />
                            <h3 className="text-lg font-bold text-slate-800 m-0">Optimization Tips</h3>
                        </div>

                        <List
                            itemLayout="horizontal"
                            className="flex-1"
                            dataSource={[
                                { title: 'Personalize the First Line', desc: 'Mention the client\'s specific problem immediately.' },
                                { title: 'Keep it Under 150 Words', desc: 'Short proposals have a 30% higher read rate.' },
                                { title: 'Ask a Question', desc: 'End with a specific question to encourage a reply.' }
                            ]}
                            renderItem={item => (
                                <List.Item className="!border-none !px-0 !mb-4 !py-0">
                                    <div className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl w-full hover:bg-indigo-50 transition-colors cursor-pointer group">
                                        <div className="mt-1 text-emerald-500 bg-white p-1 rounded-full shadow-sm">
                                            <CheckCircleOutlined />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-700 group-hover:text-indigo-700">{item.title}</div>
                                            <div className="text-xs text-slate-500 leading-relaxed mt-1">{item.desc}</div>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
}
