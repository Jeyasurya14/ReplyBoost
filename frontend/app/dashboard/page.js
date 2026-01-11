'use client';


import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Empty } from 'antd';
import {
    ThunderboltOutlined,
    SendOutlined,
    EyeOutlined,
    CheckCircleOutlined,
    RiseOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import api from '@/lib/api';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        total_proposals: 0,
        response_rate: 0,
        profile_views: 0,
        chart_data: [],
        funnel_data: []
    });
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [userRes, analyticsRes, proposalsRes] = await Promise.all([
                api.get('/users/me'),
                api.get('/proposals/analytics'),
                api.get('/proposals')
            ]);

            setUser(userRes.data);
            setStats(analyticsRes.data);
            setRecentActivity(proposalsRes.data.slice(0, 5)); // Limit to 5
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[80vh] w-full items-center justify-center">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </div>
        );
    }

    // Calculate credits left (Assuming standard plan is 20/day for now, or infinity)
    // Note: Adjust logic based on actual plan limits if available in user object
    const MAX_CREDITS = 20;
    const creditsLeft = Math.max(0, MAX_CREDITS - (user?.daily_usage || 0));

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-3xl p-8 mb-8 glass-panel border border-indigo-500/20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] -mr-20 -mt-20 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{user?.email?.split('@')[0] || 'Freelancer'}</span>
                        </h1>
                        <p className="text-slate-300 text-lg">Your cosmic command center is ready.</p>
                    </div>
                    <div className="glass-panel px-4 py-2 rounded-full border border-emerald-500/20 flex items-center gap-3 bg-emerald-500/5 backdrop-blur-md">
                        <div className="min-w-[8px] min-h-[8px] rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-emerald-300 text-sm font-medium">System Operational</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <Row gutter={[24, 24]}>
                {[
                    {
                        title: 'Total Proposals',
                        value: stats.total_proposals,
                        icon: <SendOutlined />,
                        color: 'blue',
                        gradient: 'from-blue-500 to-indigo-600',
                        subtext: 'Lifetime sent'
                    },
                    {
                        title: 'Reply Rate',
                        value: `${stats.response_rate}%`,
                        icon: <CheckCircleOutlined />,
                        color: 'emerald',
                        gradient: 'from-emerald-400 to-teal-500',
                        subtext: 'Global average: 5%'
                    },
                    {
                        title: 'Credits Left',
                        value: creditsLeft,
                        icon: <ThunderboltOutlined />,
                        color: 'amber',
                        gradient: 'from-amber-400 to-orange-500',
                        subtext: `Resets daily (${MAX_CREDITS} max)`
                    },
                    {
                        title: 'Profile Views',
                        value: stats.profile_views,
                        icon: <EyeOutlined />,
                        color: 'purple',
                        gradient: 'from-purple-500 to-pink-600',
                        subtext: 'Past 30 days'
                    },
                ].map((item, idx) => (
                    <Col xs={24} sm={12} lg={6} key={idx}>
                        <div className="glass-card group relative overflow-hidden p-6 rounded-3xl h-full border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
                            <div className={`absolute -right-6 -top-6 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-10 blur-[40px] group-hover:opacity-20 transition-opacity duration-500`}></div>

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg shadow-${item.color}-500/20 group-hover:scale-110 transition-transform duration-300`}>
                                    {item.icon}
                                </div>
                                <div className="text-slate-500 hover:text-white cursor-pointer transition-colors bg-white/5 p-2 rounded-lg hover:bg-white/10 backdrop-blur-sm">
                                    <RiseOutlined />
                                </div>
                            </div>

                            <div className="relative z-10">
                                <div className="text-4xl font-bold text-white mb-1 tracking-tight">{item.value}</div>
                                <div className="text-slate-400 font-medium text-sm uppercase tracking-wider">{item.title}</div>
                                <div className="mt-4 flex items-center gap-2 text-xs">
                                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium border border-emerald-500/10">
                                        +12%
                                    </span>
                                    <span className="text-slate-500">{item.subtext}</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Chart & Activity Section */}
            <Row gutter={[24, 24]}>
                {/* Chart */}
                <Col xs={24} lg={16}>
                    <div className="glass-panel p-8 rounded-3xl h-[500px] flex flex-col relative overflow-hidden border border-white/10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>

                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">Proposal Performance</h3>
                                <p className="text-slate-500 text-sm">Proposals sent over the last 7 days</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="w-3 h-3 rounded-full bg-indigo-500 ring-2 ring-indigo-500/20"></span>
                                <span className="text-xs text-slate-400 font-medium">Sent</span>
                            </div>
                        </div>

                        <div className="flex-1 w-full min-h-0 relative z-10">
                            {stats.chart_data && stats.chart_data.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={stats.chart_data}>
                                        <defs>
                                            <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            stroke="#64748b"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={10}
                                            tickFormatter={(value) => dayjs(value).format('MMM D')}
                                        />
                                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                                backdropFilter: 'blur(10px)',
                                                borderColor: 'rgba(255,255,255,0.1)',
                                                color: '#fff',
                                                borderRadius: '12px',
                                                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                                            }}
                                            itemStyle={{ color: '#fff' }}
                                            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="sent"
                                            stroke="#818cf8"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorSent)"
                                            activeDot={{ r: 6, strokeWidth: 0, fill: '#fff', stroke: '#6366f1' }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                                    <Empty description={<span className="text-slate-500">No data available yet</span>} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                </div>
                            )}
                        </div>
                    </div>
                </Col>

                {/* Recent Activity */}
                <Col xs={24} lg={8}>
                    <div className="glass-panel p-8 rounded-3xl h-[500px] flex flex-col border border-white/10 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6 relative z-10">
                            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                            <Link href="/dashboard/proposals" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 px-3 py-1 rounded-full">View All</Link>
                        </div>

                        <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
                            {recentActivity.length > 0 ? (
                                recentActivity.map((proposal, i) => (
                                    <div key={i} className="group relative p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all duration-300 hover:border-white/10 cursor-pointer">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center shrink-0 border border-indigo-500/10 group-hover:border-indigo-500/30 transition-colors">
                                                <SendOutlined className="text-indigo-400 group-hover:scale-110 transition-transform" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="text-slate-200 font-medium text-sm mb-1 truncate group-hover:text-white transition-colors">
                                                    {proposal.job_description ?
                                                        (proposal.job_description.substring(0, 40) + (proposal.job_description.length > 40 ? '...' : ''))
                                                        : 'Generated Proposal'}
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-500 text-xs">{dayjs(proposal.created_at).fromNow()}</span>
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        Details
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex items-center justify-center">
                                    <Empty description={<span className="text-slate-500">No proposals generated yet</span>} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                </div>
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
