'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, DatePicker, Select, InputNumber, Row, Col, Typography, Statistic, message } from 'antd';
import { PlusOutlined, DollarOutlined } from '@ant-design/icons';
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
        <div>
            <div className="flex justify-between items-center mb-6">
                <Title level={2}>Income Tracker</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} className="bg-blue-600">
                    Add Earnings
                </Button>
            </div>

            <Row gutter={[16, 16]} className="mb-8">
                <Col xs={24} md={8}>
                    <Card bordered={false} className="shadow-sm">
                        <Statistic title="Total Earned" value={totalEarned} precision={2} prefix="$" valueStyle={{ color: '#3f8600' }} />
                    </Card>
                </Col>
                <Col xs={24} md={16}>
                    <Card bordered={false} className="shadow-sm h-full" title="Monthly Trend">
                        <div style={{ width: '100%', height: 200 }}>
                            <ResponsiveContainer>
                                <BarChart data={summary}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="total" fill="#1677ff" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Card title="Recent Transactions" className="shadow-sm rounded-xl border-0">
                <Table
                    columns={columns}
                    dataSource={incomes}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                />
            </Card>

            <Modal title="Add Income" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleAdd}>
                    <Form.Item name="client" label="Client Name" rules={[{ required: true }]}>
                        <Input placeholder="Client Name" />
                    </Form.Item>
                    <Form.Item name="amount" label="Amount ($)" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                    <Form.Item name="platform" label="Platform" rules={[{ required: true }]}>
                        <Select>
                            <Option value="Upwork">Upwork</Option>
                            <Option value="Fiverr">Fiverr</Option>
                            <Option value="Direct">Direct</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block className="bg-blue-600">Save</Button>
                </Form>
            </Modal>
        </div>
    );
}
