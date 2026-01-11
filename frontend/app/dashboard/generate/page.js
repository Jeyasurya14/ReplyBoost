'use client';

import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, Typography, message, Slider, Radio, Progress, Tag, Divider, Tooltip, Space, Row, Col, Badge } from 'antd';
import {
    ThunderboltOutlined, CopyOutlined, CheckOutlined, RobotOutlined,
    FileTextOutlined, InfoCircleOutlined, SafetyCertificateOutlined,
    FireOutlined, RocketOutlined, EditOutlined, AlignLeftOutlined,
    CompressOutlined, CheckCircleFilled
} from '@ant-design/icons';
import api from '@/lib/api';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const FRAMEWORKS = [
    { value: 'Fast Hook', label: 'Fast Hook Reply', desc: 'Grabs attention immediately. Best for high-competition jobs.' },
    { value: 'Proof-Driven', label: 'Proof-Driven Reply', desc: 'Focuses on past results and portfolio. Best for expert roles.' },
    { value: 'Problem-Solution', label: 'Problem-Solution', desc: 'Diagnoses their issue and offers a fix. Best for complex tasks.' },
    { value: 'Authority', label: 'Authority Reply', desc: 'Confident and brief. Best when you are overqualified.' },
];

export default function GeneratePage() {
    // State
    const [jobDescription, setJobDescription] = useState('');
    const [platform, setPlatform] = useState('Upwork');
    const [framework, setFramework] = useState('Fast Hook');
    const [ctaStyle, setCtaStyle] = useState('Confident');
    const [tone, setTone] = useState(50); // 0 = Friendly, 100 = Direct

    const [loading, setLoading] = useState(false);
    const [proposal, setProposal] = useState('');
    const [copied, setCopied] = useState(false);
    const [signals, setSignals] = useState([]);
    const [strength, setStrength] = useState(0);
    const [breakdown, setBreakdown] = useState([]);
    const [remaining, setRemaining] = useState(null);

    // Effect: Detect Job Signals
    useEffect(() => {
        if (!jobDescription) {
            setSignals([]);
            return;
        }
        const lower = jobDescription.toLowerCase();
        const found = [];
        if (lower.includes('urgent') || lower.includes('asap') || lower.includes('immediately')) found.push({ label: 'Urgent', color: 'red', icon: <FireOutlined /> });
        if (lower.includes('budget') || lower.includes('price') || lower.includes('$')) found.push({ label: 'Budget Mentioned', color: 'green', icon: <SafetyCertificateOutlined /> });
        if (lower.includes('long term') || lower.includes('ongoing')) found.push({ label: 'Long Term', color: 'blue', icon: <RocketOutlined /> });
        if (lower.includes('expert') || lower.includes('experience')) found.push({ label: 'High Intent', color: 'purple', icon: <CheckCircleFilled /> });
        setSignals(found);
    }, [jobDescription]);

    // Strength calculated by backend

    const handleGenerate = async (refinement = null) => {
        setLoading(true);
        try {
            let response;

            if (refinement) {
                // Call Refine Endpoint
                response = await api.post('/refine', {
                    proposal_text: proposal,
                    instruction: refinement
                });
                setProposal(response.data.refined_text);
                message.success("Proposal refined!");
            } else {
                if (!jobDescription.trim()) {
                    message.error("Please paste the job description.");
                    setLoading(false);
                    return;
                }

                // Call Generate Endpoint
                response = await api.post('/generate', {
                    job_description: jobDescription,
                    platform: platform,
                    framework: framework,
                    cta_style: ctaStyle,
                    tone_level: tone
                });

                const { proposal_text, signals: backendSignals, analysis, remaining_credits } = response.data;

                setProposal(proposal_text);
                setStrength(analysis.score);
                setBreakdown(analysis.breakdown); // Assuming backend sends this list
                // setSignals(backendSignals); // Optional: Overwrite frontend signals if backend is smarter
                setRemaining(remaining_credits);

                message.success(`Generated! ${remaining_credits} credits left.`);
            }
        } catch (error) {
            console.error(error);
            if (error.response?.status === 403) {
                message.error("Daily limit reached. Upgrade to Pro!");
            } else {
                message.error("Failed to generate/refine. Check connection.");
            }
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
        <div className="max-w-[1600px] mx-auto pb-12 animate-fade-in">
            {/* Header */}
            <div className="mb-8 flex items-end justify-between">
                <div>
                    <Title level={2} className="!text-slate-900 !mb-1 tracking-tight">Generate Reply</Title>
                    <p className="text-slate-500 text-lg">Advanced daily proposal system.</p>
                </div>
                {/* <div className="hidden md:block text-right">
                    <Tag color="blue" className="px-3 py-1 text-sm rounded-full">Pro Mode Active</Tag>
                </div> */}
            </div>

            <Row gutter={[24, 24]} className="items-stretch">
                {/* LEFT PANEL: INPUT SYSTEM */}
                <Col xs={24} lg={14} xl={10}>
                    <div className="saas-card p-6 md:p-8 h-full flex flex-col space-y-8 bg-white/80 backdrop-blur-sm sticky top-6">

                        {/* 1. Platform & Framework */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="saas-label mb-3">Target Platform</h3>
                                <Radio.Group value={platform} onChange={e => setPlatform(e.target.value)} buttonStyle="solid" className="w-full grid grid-cols-3 gap-2">
                                    {['Upwork', 'Fiverr', 'Freelancer'].map(p => (
                                        <Radio.Button key={p} value={p} className="text-center rounded-lg border-slate-200 hover:text-indigo-600 !h-10 flex items-center justify-center font-medium">
                                            {p}
                                        </Radio.Button>
                                    ))}
                                </Radio.Group>
                            </div>

                            <div>
                                <h3 className="saas-label mb-2">Reply Framework</h3>
                                <Select
                                    value={framework}
                                    onChange={setFramework}
                                    className="w-full"
                                    size="large"
                                    popupClassName="p-1"
                                    optionLabelProp="label"
                                >
                                    {FRAMEWORKS.map(f => (
                                        <Option key={f.value} value={f.value} label={f.label}>
                                            <div className="py-1">
                                                <div className="font-semibold text-slate-700">{f.label}</div>
                                                <div className="text-xs text-slate-500">{f.desc}</div>
                                            </div>
                                        </Option>
                                    ))}
                                </Select>
                                <div className="mt-2 text-xs text-slate-400 bg-slate-50 p-2 rounded border border-slate-100 italic">
                                    <InfoCircleOutlined className="mr-1" />
                                    {FRAMEWORKS.find(f => f.value === framework)?.desc}
                                </div>
                            </div>
                        </div>

                        {/* 2. Job Description */}
                        <div className="flex-1 min-h-[250px] flex flex-col">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="saas-label m-0">Job Description</h3>
                                <div className="flex gap-2">
                                    {signals.map((s, i) => (
                                        <Tag key={i} color={s.color} className="rounded-full border-none px-2 text-[10px] uppercase font-bold flex items-center gap-1 m-0">
                                            {s.icon} {s.label}
                                        </Tag>
                                    ))}
                                </div>
                            </div>
                            <TextArea
                                placeholder="Paste the client's full job description here..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="!bg-slate-50 !border-slate-200 !text-slate-800 !rounded-xl !p-4 focus:!bg-white focus:!border-indigo-500 !transition-all resize-none flex-1 text-base leading-relaxed"
                                style={{ minHeight: '200px' }}
                            />
                        </div>

                        {/* 3. Controls (CTA & Tone) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div>
                                <h3 className="saas-label mb-3">Call to Action</h3>
                                <Radio.Group value={ctaStyle} onChange={e => setCtaStyle(e.target.value)} size="small" className="flex flex-col gap-2">
                                    <Radio value="Soft">Soft <span className="text-slate-400 font-normal ml-1">(Let&apos;s chat?)</span></Radio>
                                    <Radio value="Confident">Confident <span className="text-slate-400 font-normal ml-1">(Ready to start)</span></Radio>
                                    <Radio value="Action">Action <span className="text-slate-400 font-normal ml-1">(See demo)</span></Radio>
                                </Radio.Group>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <h3 className="saas-label m-0">Tone Adjustment</h3>
                                    <span className="text-xs font-semibold text-indigo-600">{tone < 30 ? 'Friendly' : tone > 70 ? 'Direct' : 'Balanced'}</span>
                                </div>
                                <Slider
                                    value={tone}
                                    onChange={setTone}
                                    tooltip={{ formatter: null }}
                                    trackStyle={{ background: '#4F46E5' }}
                                    handleStyle={{ borderColor: '#4F46E5', background: '#4F46E5' }}
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider font-medium mt-1">
                                    <span>Friendly</span>
                                    <span>Direct</span>
                                </div>
                            </div>
                        </div>

                        {/* 4. Action */}
                        <Button
                            type="primary"
                            icon={<ThunderboltOutlined />}
                            block
                            size="large"
                            onClick={() => handleGenerate()}
                            loading={loading}
                            className="bg-indigo-600 h-14 text-lg font-bold shadow-lg shadow-indigo-200 hover:!bg-indigo-700 hover:scale-[1.01] active:scale-[0.99] transition-all rounded-xl"
                        >
                            {loading ? 'Analyzing & Generating...' : 'Generate Structured Reply'}
                        </Button>
                    </div>
                </Col>

                {/* RIGHT PANEL: OUTPUT & INSIGHTS */}
                <Col xs={24} lg={10} xl={14}>
                    <div className="h-full flex flex-col">
                        {proposal ? (
                            <div className="flex-1 flex flex-col gap-6 animate-fade-in">
                                {/* Output Card */}
                                <div className="saas-card bg-white border-indigo-100 shadow-xl shadow-indigo-900/5 relative overflow-hidden flex-1 flex flex-col">
                                    {/* Toolbar */}
                                    <div className="p-4 border-b border-indigo-50 bg-indigo-50/30 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                            <span className="text-xs font-bold text-indigo-900 uppercase tracking-tight">Generated with {framework}</span>
                                        </div>
                                        <Button
                                            type="text"
                                            icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                                            onClick={handleCopy}
                                            className={copied ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 hover:bg-white'}
                                            size="small"
                                        >
                                            {copied ? 'Copied' : 'Copy'}
                                        </Button>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 text-base text-slate-800 leading-relaxed whitespace-pre-wrap font-sans overflow-y-auto flex-1">
                                        {proposal}
                                    </div>

                                    {/* Footer Stats */}
                                    <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 flex justify-between">
                                        <span>{proposal.length} characters</span>
                                        <span>~{Math.ceil(proposal.split(' ').length / 200)} min read</span>
                                    </div>
                                </div>

                                {/* Insights & Refinement */}
                                <Row gutter={[24, 24]}>
                                    <Col span={24} xl={12}>
                                        <div className="saas-card p-6 h-full flex flex-col justify-center">
                                            <h4 className="saas-label mb-4">Reply Strength</h4>
                                            <div className="flex items-end gap-3 mb-2">
                                                <span className="text-4xl font-bold text-slate-900">{strength}</span>
                                                <span className="text-slate-400 mb-1">/ 100</span>
                                            </div>
                                            <Progress
                                                percent={strength}
                                                showInfo={false}
                                                strokeColor={strength > 80 ? '#10b981' : strength > 60 ? '#f59e0b' : '#ef4444'}
                                                trailColor="#f1f5f9"
                                                className="mb-4"
                                            />
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <CheckCircleFilled className="text-emerald-500" /> Uses job keywords
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <CheckCircleFilled className="text-emerald-500" /> Clear CTA present
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={24} xl={12}>
                                        <div className="saas-card p-6 h-full bg-slate-50 border-slate-200">
                                            <h4 className="saas-label mb-3">Quick Refinement</h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                <Button icon={<CompressOutlined />} size="middle" onClick={() => handleGenerate('Make it shorter')}>Shorter</Button>
                                                <Button icon={<FireOutlined />} size="middle" onClick={() => handleGenerate('Make it more urgent')}>Urgent</Button>
                                                <Button icon={<AlignLeftOutlined />} size="middle" onClick={() => handleGenerate('Make it professional')}>Formal</Button>
                                                <Button icon={<RocketOutlined />} size="middle" onClick={() => handleGenerate('Improve CTA')}>Better CTA</Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center opacity-50 p-12 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                                <div>
                                    <RobotOutlined className="text-6xl text-slate-300 mb-6" />
                                    <h3 className="text-xl font-bold text-slate-400">Ready to Generate</h3>
                                    <p className="text-slate-400 max-w-xs mx-auto mt-2">Configure your preferences on the left and hit generate to see the magic.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
}
