'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, DatePicker, Select, InputNumber, Row, Col, Typography, Statistic, message } from 'antd';
import { PlusOutlined, DollarOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '@/lib/api';
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;

export default function IncomePage() {
    const [incomes, setIncomes] = useState([]);
    const [summary, setSummary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [incomeRes, summaryRes] = await Promise.all([
                api.get('/income'),
                api.get('/income/summary')
            ]);
            setIncomes(incomeRes.data);

            const formattedSummary = summaryRes.data.map(item => ({
                month: item._id,
                total: item.total
            }));
            setSummary(formattedSummary);

        } catch (error) {
            message.error('Failed to load income data');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (values) => {
        try {
            await api.post('/income', {
                ...values,
                date: values.date.format('YYYY-MM-DD')
            });
            message.success("Income added");
            setIsModalVisible(false);
            form.resetFields();
            fetchData(); // Refresh
        } catch (e) {
            message.error("Failed to add income");
        }
    };

    const columns = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Client', dataIndex: 'client', key: 'client' },
        { title: 'Platform', dataIndex: 'platform', key: 'platform' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (val) => `$${val}` },
    ];

    const totalEarned = incomes.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Title level={2} className="!text-white !mb-2 tracking-tight">Income Tracker</Title>
                    <p className="text-slate-400 text-lg">Manage your earnings and transactions.</p>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                    size="large"
                    className="bg-indigo-600 hover:!bg-indigo-500 border-none h-12 px-6 rounded-xl font-medium shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
                >
                    Add Earnings
                </Button>
            </div>

            <Row gutter={[24, 24]}>
                <Col xs={24} md={8}>
                    <div className="glass-card p-8 rounded-3xl h-full border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-all"></div>
                        <div className="relative z-10 flex flex-col justify-center h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xl border border-emerald-500/10">
                                    <DollarOutlined />
                                </div>
                                <span className="text-slate-400 font-medium text-lg">Total Earned</span>
                            </div>
                            <div className="text-5xl font-bold text-white mb-2 font-display tracking-tight">
                                ${totalEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <div className="text-emerald-400 text-sm font-medium flex items-center bg-emerald-500/10 w-fit px-3 py-1 rounded-full border border-emerald-500/10">
                                <ArrowUpOutlined className="mr-1" /> +12% this month
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={16}>
                    <div className="glass-panel p-8 rounded-3xl h-full border border-white/5 flex flex-col relative overflow-hidden">
                        <div className="mb-6 relative z-10 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white m-0">Monthly Trend</h3>
                            <Select defaultValue="2024" className="w-24 custom-select" popupClassName="glass-dropdown" bordered={false}>
                                <Option value="2024">2024</Option>
                                <Option value="2023">2023</Option>
                            </Select>
                        </div>
                        <div className="flex-1 w-full min-h-[250px] relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={summary} barSize={40}>
                                    <defs>
                                        <linearGradient id="barGradientIncome" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#34d399" stopOpacity={0.8} />
                                            <stop offset="100%" stopColor="#10b981" stopOpacity={0.3} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b' }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b' }}
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
                                        dataKey="total"
                                        fill="url(#barGradientIncome)"
                                        radius={[8, 8, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </Col>
            </Row>

            <div className="glass-panel p-1 rounded-3xl overflow-hidden border border-white/10 relative">
                <div className="p-6 md:p-8 relative z-10">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-white m-0">Recent Transactions</h3>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={incomes}
                        rowKey="id"
                        loading={loading}
                        pagination={{
                            pageSize: 5,
                            className: "custom-pagination"
                        }}
                        className="custom-table"
                        rowClassName="custom-row"
                    />
                </div>
            </div>

            <Modal
                title={<span className="text-xl font-bold text-white">Add Income</span>}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                className="cosmic-modal"
                closeIcon={<span className="text-white/50 hover:text-white transition-colors">×</span>}
                centered
            >
                <Form form={form} layout="vertical" onFinish={handleAdd} className="mt-4">
                    <Form.Item name="client" label={<span className="text-slate-300">Client Name</span>} rules={[{ required: true }]}>
                        <Input placeholder="Client Name" className="glass-input" />
                    </Form.Item>
                    <Form.Item name="amount" label={<span className="text-slate-300">Amount ($)</span>} rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} min={0} className="glass-input-number" />
                    </Form.Item>
                    <Form.Item name="platform" label={<span className="text-slate-300">Platform</span>} rules={[{ required: true }]}>
                        <Select className="glass-select" popupClassName="glass-dropdown">
                            <Option value="Upwork">Upwork</Option>
                            <Option value="Fiverr">Fiverr</Option>
                            <Option value="Direct">Direct</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="date" label={<span className="text-slate-300">Date</span>} rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} className="glass-picker" popupClassName="glass-picker-dropdown" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block size="large" className="bg-indigo-600 border-none h-12 rounded-xl mt-4 hover:!bg-indigo-500 font-semibold shadow-lg shadow-indigo-500/20">
                        Save Transaction
                    </Button>
                </Form>
            </Modal>

            <style jsx global>{`
                /* Modal Styles */
                .cosmic-modal .ant-modal-content {
                    background: #0f172a !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    backdrop-filter: blur(16px) !important;
                    border-radius: 20px !important;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
                }
                .cosmic-modal .ant-modal-header {
                    background: transparent !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
                    margin-bottom: 20px !important;
                }
                
                /* Input Styles */
                .glass-input, .glass-input-number, .glass-picker {
                    background-color: rgba(255, 255, 255, 0.05) !important;
                    border-color: rgba(255, 255, 255, 0.1) !important;
                    color: white !important;
                    border-radius: 0.75rem !important;
                    padding: 8px 12px !important;
                }
                .glass-input::placeholder {
                    color: rgba(255, 255, 255, 0.3) !important;
                }
                .glass-input:hover, .glass-input:focus,
                .glass-input-number:hover, .glass-input-number:focus,
                .glass-picker:hover, .glass-picker:focus {
                    border-color: #6366f1 !important;
                    background-color: rgba(255, 255, 255, 0.08) !important;
                }
                .glass-input-number .ant-input-number-input {
                    color: white !important;
                }
                
                /* Select Styles (Reuse global if possible, but localized here for safety) */
                .glass-select .ant-select-selector {
                    background-color: rgba(255, 255, 255, 0.05) !important;
                    border-color: rgba(255, 255, 255, 0.1) !important;
                    color: white !important;
                    border-radius: 0.75rem !important;
                }
                .glass-select .ant-select-arrow {
                    color: white !important;
                }

                 /* DatePicker Dropdown */
                .glass-picker-dropdown .ant-picker-panel-container {
                     background: #0f172a !important;
                     border: 1px solid rgba(255, 255, 255, 0.1) !important;
                     border-radius: 12px !important;
                }
                .glass-picker-dropdown .ant-picker-header, 
                .glass-picker-dropdown .ant-picker-content th {
                    color: white !important;
                }
                .glass-picker-dropdown .ant-picker-cell {
                    color: #94a3b8 !important;
                }
                .glass-picker-dropdown .ant-picker-cell-in-view {
                    color: white !important;
                }
                .glass-picker-dropdown .ant-picker-cell:hover .ant-picker-cell-inner {
                    background: rgba(255,255,255,0.1) !important;
                }
                .glass-picker-dropdown .ant-picker-cell-selected .ant-picker-cell-inner {
                    background: #6366f1 !important;
                }
            `}</style>
        </div>
    );
}
