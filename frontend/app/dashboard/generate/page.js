'use client';

import React, { useState } from 'react';
import { Card, Input, Button, Select, Typography, message, Divider, Alert } from 'antd';
import { ThunderboltOutlined, CopyOutlined, CheckOutlined } from '@ant-design/icons';
import api from '@/lib/api';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function GeneratePage() {
    const [jobDescription, setJobDescription] = useState('');
    const [platform, setPlatform] = useState('Upwork');
    const [loading, setLoading] = useState(false);
    const [proposal, setProposal] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!jobDescription.trim()) {
            message.error("Please paste the job description.");
            return;
        }
        setLoading(true);
        try {
            const response = await api.post('/generate', {
                job_description: jobDescription,
                platform: platform
            });
            setProposal(response.data.proposal_text);
            message.success("Proposal generated!");
        } catch (error) {
            message.error("Failed to generate proposal. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(proposal);
        setCopied(true);
        message.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
            <div>
                <Title level={2} className="!text-white !mb-2 tracking-tight">Generate Reply</Title>
                <p className="text-slate-400 text-lg">Craft the perfect proposal with AI intelligence.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="flex flex-col h-full">
                    <div className="glass-panel p-1 rounded-3xl h-full flex flex-col relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none"></div>
                        <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/20">
                                    <ThunderboltOutlined className="text-indigo-400 text-lg" />
                                </div>
                                <h3 className="text-xl font-bold text-white m-0">Job Details</h3>
                            </div>

                            <div className="space-y-6 flex-1">
                                <div>
                                    <label htmlFor="platform-select" className="block mb-2 font-medium text-slate-300">Platform</label>
                                    <Select
                                        id="platform-select"
                                        value={platform}
                                        onChange={setPlatform}
                                        className="w-full custom-select"
                                        size="large"
                                        popupClassName="glass-dropdown"
                                    >
                                        <Option value="Upwork">Upwork</Option>
                                        <Option value="Fiverr">Fiverr</Option>
                                        <Option value="Freelancer">Freelancer.com</Option>
                                    </Select>
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <span className="block mb-2 font-medium text-slate-300">Job Description</span>
                                    <TextArea
                                        rows={12}
                                        placeholder="Paste the full job description here..."
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        className="!bg-white/5 !border-white/10 !text-slate-200 !rounded-xl hover:!border-indigo-500/50 focus:!border-indigo-500 !transition-all resize-none flex-1 custom-scrollbar"
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                <Button
                                    type="primary"
                                    icon={<ThunderboltOutlined />}
                                    block
                                    size="large"
                                    onClick={handleGenerate}
                                    loading={loading}
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 border-none h-14 text-lg font-bold shadow-lg shadow-indigo-500/25 hover:!scale-[1.02] active:!scale-[0.98] transition-all rounded-xl"
                                >
                                    {loading ? 'Analyzing & Writing...' : 'Generate Optimized Reply'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Output Section */}
                <div className="flex flex-col h-full">
                    <div className="glass-card p-1 rounded-3xl h-full flex flex-col relative overflow-hidden border border-white/10">
                        {/* Cosmic Background Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>

                        <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-500/20">
                                    <CheckOutlined className="text-purple-400 text-lg" />
                                </div>
                                <h3 className="text-xl font-bold text-white m-0">Your Proposal</h3>
                            </div>

                            {proposal ? (
                                <div className="animate-fade-in flex flex-col h-full">
                                    <Alert
                                        message={<span className="font-semibold">Optimized for conversion</span>}
                                        description={<span className="text-slate-400">Review before sending. Add personal details if necessary.</span>}
                                        type="success"
                                        showIcon
                                        className="!bg-emerald-500/10 !border-emerald-500/20 !text-emerald-400 mb-6 rounded-xl"
                                    />
                                    <div className="bg-[#0b1121]/80 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-inner mb-6 whitespace-pre-wrap text-slate-300 leading-relaxed font-sans flex-grow overflow-y-auto custom-scrollbar relative group-hover:border-purple-500/30 transition-colors">
                                        {proposal}
                                    </div>
                                    <Button
                                        icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                                        onClick={handleCopy}
                                        block
                                        size="large"
                                        className={`mt-auto h-12 font-medium rounded-xl border-none transition-all ${copied
                                                ? '!bg-emerald-500 !text-white'
                                                : '!bg-white/10 !text-white hover:!bg-white/20'
                                            }`}
                                    >
                                        {copied ? 'Copied to Clipboard' : 'Copy to Clipboard'}
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
                                    <div className="w-24 h-24 mb-6 relative">
                                        <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping opacity-20"></div>
                                        <div className="relative w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-sm">
                                            <ThunderboltOutlined className="text-4xl text-indigo-400/50" />
                                        </div>
                                    </div>
                                    <Title level={4} className="!text-slate-200 !mb-2">Ready to write</Title>
                                    <Paragraph className="!text-slate-500 max-w-xs mx-auto text-base">
                                        Paste a job description on the left and our AI will craft the perfect reply.
                                    </Paragraph>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-select .ant-select-selector {
                    background-color: rgba(255, 255, 255, 0.05) !important;
                    border-color: rgba(255, 255, 255, 0.1) !important;
                    color: white !important;
                    border-radius: 0.75rem !important;
                    height: 3rem !important;
                    display: flex !important;
                    align-items: center !important;
                }
                .custom-select:hover .ant-select-selector {
                    border-color: rgba(99, 102, 241, 0.5) !important;
                }
                .custom-select .ant-select-arrow {
                    color: rgba(255, 255, 255, 0.5) !important;
                }
                .glass-dropdown {
                    background-color: #0f172a !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    backdrop-filter: blur(12px) !important;
                    padding: 4px !important;
                    border-radius: 0.75rem !important;
                }
                .glass-dropdown .ant-select-item {
                    color: #cbd5e1 !important;
                    border-radius: 0.5rem !important;
                    margin-bottom: 2px !important;
                }
                .glass-dropdown .ant-select-item-option-selected {
                    background-color: rgba(99, 102, 241, 0.2) !important;
                    color: white !important;
                    font-weight: 600 !important;
                }
                .glass-dropdown .ant-select-item-option-active {
                    background-color: rgba(255, 255, 255, 0.05) !important;
                }
                .ant-alert-success .ant-alert-icon {
                    color: #34d399 !important;
                }
            `}</style>
        </div>
    );
}
