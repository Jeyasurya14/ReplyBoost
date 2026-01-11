'use client';

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
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{user?.email?.split('@')[0] || 'Freelancer'}</span>
                    </h1>
                    <p className="text-slate-400">Here&apos;s your performance overview for today.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3">
                    <div className="min-w-[8px] min-h-[8px] rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-slate-300 text-sm font-medium">System Operational</span>
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
                        subtext: 'Lifetime sent'
                    },
                    {
                        title: 'Reply Rate',
                        value: `${stats.response_rate}%`,
                        icon: <CheckCircleOutlined />,
                        color: 'emerald',
                        subtext: 'Global average: 5%'
                    },
                    {
                        title: 'Credits Left',
                        value: creditsLeft,
                        icon: <ThunderboltOutlined />,
                        color: 'indigo',
                        subtext: `Resets daily (${MAX_CREDITS} max)`
                    },
                    {
                        title: 'Profile Views',
                        value: stats.profile_views,
                        icon: <EyeOutlined />,
                        color: 'purple',
                        subtext: 'Past 30 days'
                    },
                ].map((item, idx) => (
                    <Col xs={24} sm={12} lg={6} key={idx}>
                        <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 group h-full">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-${item.color}-500/10 text-${item.color}-400 group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <div className="text-slate-500 hover:text-white cursor-pointer transition-colors">
                                    <RiseOutlined />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-white mb-2">{item.value}</div>
                            <div className="text-slate-400 font-medium">{item.title}</div>
                            <div className="text-slate-600 text-xs mt-2">{item.subtext}</div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Chart & Activity Section */}
            <Row gutter={[24, 24]}>
                {/* Chart */}
                <Col xs={24} lg={16}>
                    <div className="glass-panel p-8 rounded-3xl h-[450px] border border-white/5 flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-white">Proposal Performance</h3>
                                <p className="text-slate-500 text-sm">Proposals sent over the last 7 days</p>
                            </div>
                        </div>

                        <div className="flex-1 w-full min-h-0">
                            {stats.chart_data && stats.chart_data.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={stats.chart_data}>
                                        <defs>
                                            <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            stroke="#475569"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => dayjs(value).format('MMM D')}
                                        />
                                        <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '12px' }}
                                            itemStyle={{ color: '#fff' }}
                                            cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="sent"
                                            stroke="#6366f1"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorSent)"
                                            activeDot={{ r: 6, strokeWidth: 0 }}
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
                    <div className="glass-panel p-6 rounded-3xl h-[450px] border border-white/5 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                        <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {recentActivity.length > 0 ? (
                                recentActivity.map((proposal, i) => (
                                    <div key={i} className="flex gap-4 p-4 border border-white/5 bg-white/[0.02] hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                                        <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                                            <SendOutlined className="text-indigo-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-slate-200 font-medium text-sm mb-1 truncate">
                                                {proposal.job_description ?
                                                    (proposal.job_description.substring(0, 40) + (proposal.job_description.length > 40 ? '...' : ''))
                                                    : 'Generated Proposal'}
                                            </div>
                                            <div className="text-slate-500 text-xs">
                                                {dayjs(proposal.created_at).fromNow()}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex items-center justify-center p-8">
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
