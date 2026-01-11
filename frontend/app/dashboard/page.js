'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Empty, Button, Progress, Tag } from 'antd';
import {
    ThunderboltOutlined,
    SendOutlined,
    MessageOutlined,
    RiseOutlined,
    LoadingOutlined,
    CheckCircleFilled,
    ArrowRightOutlined,
    ArrowUpOutlined
} from '@ant-design/icons';
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
        profile_views: 0
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
            setRecentActivity(proposalsRes.data.slice(0, 3)); // Limit to 3 for clean view
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

    const MAX_CREDITS = 20;
    const usedCredits = user?.daily_usage || 0;
    const progressPercent = Math.min(100, Math.round((usedCredits / MAX_CREDITS) * 100));

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            {/* Headline */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Today&apos;s Reply System</h1>
                <p className="text-slate-500 text-lg">Focus on consistency. Build your pipeline.</p>
            </div>

            <Row gutter={[24, 24]}>
                {/* Progress Card */}
                <Col xs={24} lg={12}>
                    <div className="saas-card p-6 h-full flex flex-col justify-between relative overflow-hidden">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold text-slate-800">Daily Goal</h3>
                                <span className="text-slate-500 font-medium">{usedCredits} / {MAX_CREDITS} proposals</span>
                            </div>
                            <Progress
                                percent={progressPercent}
                                strokeColor="#4F46E5"
                                trailColor="#f1f5f9"
                                showInfo={false}
                                size="small"
                                className="mb-3"
                            />
                            <p className="text-slate-400 text-sm flex items-center gap-2">
                                <CheckCircleFilled className="text-emerald-500" />
                                Consistency beats volume.
                            </p>
                        </div>
                    </div>
                </Col>

                {/* Primary Action Card */}
                <Col xs={24} lg={12}>
                    <div className="saas-card p-6 h-full bg-gradient-to-br from-indigo-600 to-indigo-700 border-none text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-1">Generate Today&apos;s Reply</h3>
                            <p className="text-indigo-100 mb-6 text-sm opacity-90">Create a structured, reply-focused proposal in under 60 seconds.</p>
                            <Link href="/dashboard/generate">
                                <Button size="large" className="bg-white text-indigo-600 border-none font-semibold hover:!bg-indigo-50 hover:!text-indigo-700 shadow-lg shadow-black/10 flex items-center gap-2">
                                    <ThunderboltOutlined /> Start Generator
                                </Button>
                            </Link>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-500">
                            <ThunderboltOutlined style={{ fontSize: '140px' }} />
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Metrics Section */}
            <div>
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Pipeline Metrics</h2>
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={8}>
                        <div className="saas-card p-5">
                            <div className="flex items-center gap-3 text-slate-500 mb-2">
                                <SendOutlined />
                                <span className="text-sm font-medium">Proposals Sent</span>
                            </div>
                            <div className="text-3xl font-bold text-slate-900">{stats.total_proposals}</div>
                        </div>
                    </Col>
                    <Col xs={24} sm={8}>
                        <div className="saas-card p-5">
                            <div className="flex items-center gap-3 text-slate-500 mb-2">
                                <MessageOutlined />
                                <span className="text-sm font-medium">Replies Received</span>
                            </div>
                            <div className="text-3xl font-bold text-slate-900">
                                {Math.round(stats.total_proposals * (stats.response_rate / 100))}
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={8}>
                        <div className="saas-card p-5">
                            <div className="flex items-center gap-3 text-slate-500 mb-2">
                                <RiseOutlined />
                                <span className="text-sm font-medium">Reply Rate</span>
                            </div>
                            <div className="flex items-end gap-3">
                                <div className="text-3xl font-bold text-slate-900">{stats.response_rate}%</div>
                                <div className="flex items-center text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-1 rounded-full mb-1">
                                    <ArrowUpOutlined className="mr-1" /> 2.1%
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Recent Activity */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-slate-800">Recent Activity</h2>
                    <Link href="/dashboard/proposals" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                        View Full Log <ArrowRightOutlined />
                    </Link>
                </div>

                <div className="saas-card overflow-hidden">
                    {recentActivity.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                            {recentActivity.map((proposal, i) => (
                                <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                            <SendOutlined />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-medium text-slate-900 truncate max-w-md">
                                                {proposal.job_description ? proposal.job_description.substring(0, 50) + "..." : "Generated Proposal"}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {dayjs(proposal.created_at).fromNow()} • {proposal.platform || "Upwork"}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Tag color="blue" className="mr-0 border-none bg-blue-50 text-blue-700 font-medium px-3 py-1">Sent</Tag>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                                <SendOutlined className="text-2xl" />
                            </div>
                            <h3 className="text-slate-900 font-medium mb-1">No activity yet</h3>
                            <p className="text-slate-500 text-sm mb-4">Start by generating your first proposal.</p>
                            <Link href="/dashboard/generate">
                                <Button type="default">Create Proposal</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
