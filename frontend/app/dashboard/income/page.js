'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, DatePicker, Select, InputNumber, Row, Col, Typography, message, Tag } from 'antd';
import { PlusOutlined, DollarOutlined, ArrowUpOutlined, BankOutlined, CalendarOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '@/lib/api';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
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
            message.success("Income added successfully");
            setIsModalVisible(false);
            form.resetFields();
            fetchData();
        } catch (e) {
            message.error("Failed to add income");
        }
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => <span className="text-slate-500">{dayjs(date).format('MMM D, YYYY')}</span>
        },
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
            render: (text) => <span className="font-medium text-slate-700">{text}</span>
        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            key: 'platform',
            render: (platform) => {
                const color = platform === 'Upwork' ? 'green' : 'blue';
                return <Tag color={color} className="rounded-full px-2.5 font-semibold text-[10px] m-0 uppercase">{platform}</Tag>;
            }
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (val) => <span className="font-bold text-slate-800">${val.toFixed(2)}</span>
        },
    ];

    const totalEarned = incomes.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="max-w-6xl mx-auto pb-12 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <Title level={2} className="!text-slate-900 !mb-2 tracking-tight">Earnings Tracker</Title>
                    <p className="text-slate-500 text-lg">Manage your freelancing income.</p>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                    size="large"
                    className="bg-indigo-600 h-12 px-6 rounded-lg font-semibold shadow-md shadow-indigo-200 hover:!bg-indigo-700"
                >
                    Add Transaction
                </Button>
            </div>

            <Row gutter={[24, 24]}>
                <Col xs={24} md={8}>
                    <div className="saas-card p-8 h-full flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl">
                                <DollarOutlined />
                            </div>
                            <span className="text-slate-500 font-medium text-lg uppercase tracking-wide">Total Earned</span>
                        </div>
                        <div className="text-5xl font-bold text-slate-900 mb-2 tracking-tight">
                            ${totalEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div className="text-emerald-600 text-sm font-medium flex items-center bg-emerald-50 w-fit px-3 py-1 rounded-full">
                            <ArrowUpOutlined className="mr-1" /> +12% this month
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={16}>
                    <div className="saas-card p-8 h-full flex flex-col">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-800 m-0">Monthly Revenue</h3>
                            <Select defaultValue="2024" className="w-24 border-none" size="small" bordered={false}>
                                <Option value="2024">2024</Option>
                                <Option value="2023">2023</Option>
                            </Select>
                        </div>
                        <div className="flex-1 w-full min-h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={summary} barSize={40}>
                                    <defs>
                                        <linearGradient id="barGradientIncome" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                                            <stop offset="100%" stopColor="#10b981" stopOpacity={0.3} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8' }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8' }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            color: '#1e293b'
                                        }}
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

            <div className="mt-8">
                <h3 className="text-lg font-bold text-slate-800 mb-4 px-1">Recent Transactions</h3>
                <div className="saas-card overflow-hidden">
                    <Table
                        columns={columns}
                        dataSource={incomes}
                        rowKey="id"
                        loading={loading}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: false
                        }}
                    />
                </div>
            </div>

            <Modal
                title={<span className="text-xl font-bold text-slate-900">Add Income</span>}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                centered
                width={500}
                className="p-6"
            >
                <Form form={form} layout="vertical" onFinish={handleAdd} className="mt-6">
                    <Form.Item name="client" label="Client Name" rules={[{ required: true }]}>
                        <Input size="large" className="saas-input" placeholder="e.g. Acme Corp" />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item name="amount" label="Amount ($)" rules={[{ required: true }]}>
                            <InputNumber style={{ width: '100%' }} min={0} size="large" className="saas-input" placeholder="0.00" />
                        </Form.Item>
                        <Form.Item name="platform" label="Platform" rules={[{ required: true }]}>
                            <Select size="large" className="w-full">
                                <Option value="Upwork">Upwork</Option>
                                <Option value="Fiverr">Fiverr</Option>
                                <Option value="Direct">Direct</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} size="large" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block size="large" className="bg-indigo-600 h-12 mt-2 font-semibold hover:!bg-indigo-700">
                        Save Transaction
                    </Button>
                </Form>
            </Modal>
        </div>
    );
}
