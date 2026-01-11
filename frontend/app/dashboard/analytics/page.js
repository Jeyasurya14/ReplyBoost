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
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
            <div>
                <Title level={2} className="!text-white !mb-2 tracking-tight">Analytics</Title>
                <p className="text-slate-400 text-lg">Track your proposal performance and success rates.</p>
            </div>

            <Row gutter={[24, 24]}>
                {[
                    { title: 'Total Proposals', value: data.total_proposals, icon: <FileTextOutlined />, color: 'blue', sub: 'Real-time', subColor: 'text-emerald-400', subIcon: <ArrowUpOutlined /> },
                    { title: 'Response Rate', value: data.response_rate, suffix: '%', icon: <MessageOutlined />, color: 'emerald', sub: 'Based on replies', subColor: 'text-slate-400' },
                    { title: 'Views', value: data.profile_views, icon: <EyeOutlined />, color: 'purple', sub: 'Proposals viewed', subColor: 'text-slate-400' },
                ].map((item, idx) => (
                    <Col xs={24} sm={12} lg={6} key={idx}>
                        <div className="glass-card p-6 rounded-2xl h-full border border-white/5 relative overflow-hidden group">
                            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-${item.color}-500/10 rounded-full blur-[40px] group-hover:bg-${item.color}-500/20 transition-all`}></div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-10 h-10 rounded-lg bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-400`}>
                                    {item.icon}
                                </div>
                                <span className="text-slate-400 font-medium">{item.title}</span>
                            </div>
                            <div className="text-3xl font-bold text-white mb-2 font-display">
                                {item.value}{item.suffix}
                            </div>
                            <div className={`text-xs font-medium flex items-center ${item.subColor}`}>
                                {item.subIcon && <span className="mr-1">{item.subIcon}</span>}
                                {item.sub}
                            </div>
                        </div>
                    </Col>
                ))}
                <Col xs={24} sm={12} lg={6}>
                    <div className="glass-card p-6 rounded-2xl h-full border border-white/5 flex items-center justify-between relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
                        <div>
                            <div className="text-slate-400 font-medium mb-1">Daily Goal</div>
                            <div className="text-2xl font-bold text-white">3 / 4</div>
                            <div className="text-xs text-indigo-400 mt-1">75% Completed</div>
                        </div>
                        <Progress
                            type="circle"
                            percent={75}
                            size={70}
                            strokeColor={{ '0%': '#6366f1', '100%': '#a855f7' }}
                            trailColor="rgba(255,255,255,0.1)"
                            strokeWidth={8}
                            format={() => <span className="text-white">75%</span>}
                        />
                    </div>
                </Col>
            </Row>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <div className="glass-panel p-8 rounded-3xl h-[450px] border border-white/5 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
                        <div className="mb-8 relative z-10">
                            <h3 className="text-xl font-bold text-white mb-1">Proposal Activity</h3>
                            <p className="text-slate-500 text-sm">Proposals sent over the last 7 days</p>
                        </div>
                        <div className="flex-1 w-full min-h-0 relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSentAnalytic" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                    />
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px',
                                            color: '#fff',
                                            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                                        }}
                                        itemStyle={{ color: '#fff' }}
                                        cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="sent"
                                        stroke="#818cf8"
                                        fillOpacity={1}
                                        fill="url(#colorSentAnalytic)"
                                        strokeWidth={3}
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </Col>
                <Col xs={24} lg={8}>
                    <div className="glass-panel p-8 rounded-3xl h-[450px] border border-white/5 flex flex-col relative overflow-hidden">
                        <div className="mb-8 relative z-10">
                            <h3 className="text-xl font-bold text-white mb-1">Conversion Funnel</h3>
                            <p className="text-slate-500 text-sm">Views vs Replies</p>
                        </div>
                        <div className="flex-1 w-full min-h-0 relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={funnelData} barSize={40}>
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{
                                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px',
                                            color: '#fff'
                                        }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Bar
                                        dataKey="value"
                                        fill="url(#barGradient)"
                                        radius={[8, 8, 0, 0]}
                                    >
                                        {
                                            funnelData.map((entry, index) => (
                                                <cell key={`cell-${index}`} fill={index === 0 ? '#6366f1' : '#a855f7'} />
                                            ))
                                        }
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
