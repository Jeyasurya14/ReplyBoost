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
        <div className="max-w-6xl mx-auto">
            <Title level={2} className="mb-6">Generate Reply</Title>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div>
                    <Card title="Job Details" className="shadow-sm rounded-xl">
                        <div className="mb-6">
                            <label htmlFor="platform-select" className="block mb-2 font-medium text-gray-700">Platform</label>
                            <Select
                                id="platform-select"
                                value={platform}
                                onChange={setPlatform}
                                className="w-full"
                                size="large"
                                aria-label="Select Platform"
                            >
                                <Option value="Upwork">Upwork</Option>
                                <Option value="Fiverr">Fiverr</Option>
                                <Option value="Freelancer">Freelancer.com</Option>
                            </Select>
                        </div>
                        <div className="mb-6">
                            <span className="block mb-2 font-medium text-gray-700">Job Description</span>
                            <TextArea
                                rows={12}
                                placeholder="Paste the full job description here..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="resize-none"
                            />
                        </div>
                        <Button
                            type="primary"
                            icon={<ThunderboltOutlined />}
                            block
                            size="large"
                            onClick={handleGenerate}
                            loading={loading}
                            className="bg-blue-600 h-14 text-lg font-medium shadow-md shadow-blue-200"
                        >
                            {loading ? 'Analyzing & Writing...' : 'Generate Optimized Reply'}
                        </Button>
                    </Card>
                </div>

                {/* Output Section */}
                <div>
                    <Card title="Your Proposal" className="shadow-sm h-full rounded-xl bg-gray-50 border-gray-100 flex flex-col">
                        {proposal ? (
                            <div className="animate-fade-in flex flex-col h-full">
                                <Alert
                                    message="Optimized for conversion"
                                    description="Review before sending. Add personal details if necessary."
                                    type="success"
                                    showIcon
                                    className="mb-4"
                                />
                                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-4 whitespace-pre-wrap text-gray-800 leading-relaxed font-sans flex-grow">
                                    {proposal}
                                </div>
                                <Button
                                    icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                                    onClick={handleCopy}
                                    block
                                    size="large"
                                    className="mt-auto"
                                >
                                    {copied ? 'Copied' : 'Copy to Clipboard'}
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center py-32 text-gray-500 flex flex-col items-center justify-center h-full">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                    <ThunderboltOutlined style={{ fontSize: '32px', opacity: 0.5 }} />
                                </div>
                                <Title level={4} className="text-gray-500">Ready to write</Title>
                                <Paragraph className="max-w-xs mx-auto">
                                    Paste a job description on the left and our AI will craft the perfect reply.
                                </Paragraph>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
