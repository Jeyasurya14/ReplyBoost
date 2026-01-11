'use client';

import React, { useState } from 'react';
import { Card, Input, Button, Select, Typography, message, Steps, Divider, Tag } from 'antd';
import { ThunderboltOutlined, CopyOutlined, CheckOutlined, RobotOutlined, FileTextOutlined } from '@ant-design/icons';
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
    const [currentStep, setCurrentStep] = useState(0);

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
            setCurrentStep(2); // Move to final step (although visual only)
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
        <div className="max-w-4xl mx-auto pb-12 animate-fade-in">
            <div className="mb-8 text-center">
                <Title level={2} className="!text-slate-900 !mb-2 tracking-tight">Generate Reply</Title>
                <p className="text-slate-500 text-lg">Create a tailored proposal in seconds.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Steps / Input Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Step 1: Platform */}
                    <div className="saas-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">1</div>
                            <h3 className="text-lg font-semibold text-slate-800 m-0">Select Platform</h3>
                        </div>
                        <Select
                            value={platform}
                            onChange={setPlatform}
                            className="w-full"
                            size="large"
                        >
                            <Option value="Upwork">Upwork</Option>
                            <Option value="Fiverr">Fiverr</Option>
                            <Option value="Freelancer">Freelancer.com</Option>
                        </Select>
                    </div>

                    {/* Step 2: Description */}
                    <div className="saas-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">2</div>
                            <h3 className="text-lg font-semibold text-slate-800 m-0">Job Description</h3>
                        </div>
                        <TextArea
                            rows={8}
                            placeholder="Paste the client's job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="!bg-slate-50 !border-slate-200 !text-slate-900 !rounded-lg focus:!bg-white focus:!border-indigo-500 !transition-all resize-none mb-4"
                        />
                        <Button
                            type="primary"
                            icon={<ThunderboltOutlined />}
                            block
                            size="large"
                            onClick={handleGenerate}
                            loading={loading}
                            className="bg-indigo-600 h-12 text-lg font-semibold shadow-md shadow-indigo-200 hover:!bg-indigo-700"
                        >
                            {loading ? 'Generating...' : 'Generate Reply'}
                        </Button>
                    </div>
                </div>

                {/* Output Column */}
                <div className="lg:col-span-1">
                    <div className={`saas-card p-6 sticky top-6 transition-all duration-300 ${proposal ? 'ring-2 ring-indigo-100 shadow-lg' : 'opacity-80'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${proposal ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                {proposal ? <CheckOutlined /> : '3'}
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 m-0">Result</h3>
                        </div>

                        {proposal ? (
                            <div className="animate-fade-in">
                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 text-sm text-slate-700 whitespace-pre-wrap max-h-[500px] overflow-y-auto">
                                    {proposal}
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between text-xs text-slate-400 px-1">
                                        <span>{proposal.length} chars</span>
                                        <span>{proposal.split(' ').length} words</span>
                                    </div>
                                    <Button
                                        icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                                        onClick={handleCopy}
                                        block
                                        type={copied ? 'default' : 'primary'}
                                        ghost={!copied}
                                        className={copied ? '!text-emerald-600 !border-emerald-600' : ''}
                                    >
                                        {copied ? 'Copied' : 'Copy Text'}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-400">
                                <FileTextOutlined className="text-4xl mb-3 opacity-20" />
                                <p className="text-sm">Your proposal will appear here ready to copy.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
