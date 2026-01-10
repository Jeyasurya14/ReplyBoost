'use client';

import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, Button, message, Card, Select } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import api from '@/lib/api';
import moment from 'moment';

const { Title } = Typography;

export default function ProposalsPage() {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProposals();
    }, []);

    const fetchProposals = async () => {
        try {
            const response = await api.get('/proposals');
            setProposals(response.data);
        } catch (error) {
            message.error('Failed to load proposals');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => moment(date).format('MMM D, YYYY'),
        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            key: 'platform',
            render: (platform) => {
                const color = platform === 'Upwork' ? 'green' : 'blue';
                return <Tag color={color}>{platform}</Tag>;
            }
        },
        {
            title: 'Job Preview',
            dataIndex: 'job_description',
            key: 'job_description',
            render: (text) => <span className="text-gray-500">{text.substring(0, 50)}...</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Select
                    defaultValue={status}
                    size="small"
                    style={{ width: 100 }}
                    onChange={async (value) => {
                        try {
                            await api.put(`/proposals/${record.id}/status`, { status: value });
                            message.success('Status updated');
                            // Optionally refresh or update local state
                        } catch (e) {
                            message.error('Failed to update');
                        }
                    }}
                >
                    <Select.Option value="generated">Draft</Select.Option>
                    <Select.Option value="sent">Sent</Select.Option>
                    <Select.Option value="viewed">Viewed</Select.Option>
                    <Select.Option value="replied">Replied</Select.Option>
                </Select>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button
                    icon={<CopyOutlined />}
                    size="small"
                    onClick={() => {
                        navigator.clipboard.writeText(record.proposal_text);
                        message.success('Copied!');
                    }}
                >
                    Copy
                </Button>
            ),
        },
    ];

    return (
        <div>
            <div className="mb-6">
                <Title level={2}>Proposal History</Title>
            </div>
            <Card className="shadow-sm rounded-xl overflow-hidden border-0">
                <Table
                    columns={columns}
                    dataSource={proposals}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    );
}
