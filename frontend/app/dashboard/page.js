'use client';

import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import {
    ThunderboltOutlined,
    SendOutlined,
    EyeOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const { Title, Text } = Typography;

const data = [
    { name: 'Mon', proposals: 4, replies: 1 },
    { name: 'Tue', proposals: 6, replies: 2 },
    { name: 'Wed', proposals: 8, replies: 3 },
    { name: 'Thu', proposals: 5, replies: 2 },
    { name: 'Fri', proposals: 10, replies: 4 },
    { name: 'Sat', proposals: 7, replies: 3 },
    { name: 'Sun', proposals: 3, replies: 1 },
];

export default function Dashboard() {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Freelancer</h1>
                    <p className="text-slate-400">Here's what's happening with your proposals today.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <Row gutter={[24, 24]}>
                {[
                    { title: 'Total Proposals', value: '1,234', icon: <SendOutlined />, color: 'blue', change: '+12%' },
                    { title: 'Reply Rate', value: '24.5%', icon: <CheckCircleOutlined />, color: 'emerald', change: '+3.2%' },
                    { title: 'Credits Left', value: '450', icon: <ThunderboltOutlined />, color: 'indigo', change: '' },
                    { title: 'Profile Views', value: '89', icon: <EyeOutlined />, color: 'purple', change: '+5%' },
                ].map((item, idx) => (
                    <Col xs={24} sm={12} lg={6} key={idx}>
                        <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg bg-${item.color}-500/10 text-${item.color}-400`}>
                                    {item.icon}
                                </div>
                                {item.change && (
                                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                                        {item.change}
                                    </span>
                                )}
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{item.value}</div>
                            <div className="text-slate-500 text-sm">{item.title}</div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Chart Section */}
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <div className="glass-panel p-6 rounded-2xl h-[400px]">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-lg font-bold text-white">Proposal Performance</h3>
                            <div className="flex gap-2 text-xs">
                                <span className="px-3 py-1 rounded-full bg-white/10 text-white cursor-pointer">Weekly</span>
                                <span className="px-3 py-1 rounded-full text-slate-500 hover:text-white cursor-pointer transition-colors">Monthly</span>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorProposals" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorReplies" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                                />
                                <Area type="monotone" dataKey="proposals" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorProposals)" />
                                <Area type="monotone" dataKey="replies" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorReplies)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Col>
                <Col xs={24} lg={8}>
                    <div className="glass-panel p-6 rounded-2xl h-[400px] overflow-hidden flex flex-col">
                        <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
                        <div className="space-y-0 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <div key={i} className="flex gap-4 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-colors cursor-pointer">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 shrink-0"></div>
                                    <div>
                                        <div className="text-slate-200 font-medium text-sm mb-1">Generated proposal for "React Native Dev needed"</div>
                                        <div className="text-slate-500 text-xs">2 hours ago</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
