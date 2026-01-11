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
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
            <div>
                <Title level={2} className="!text-white !mb-2 tracking-tight">Proposal History</Title>
                <p className="text-slate-400 text-lg">Track and manage your generated proposals.</p>
            </div>

            <div className="glass-panel p-1 rounded-3xl overflow-hidden border border-white/10 relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>

                <div className="p-6 md:p-8 relative z-10">
                    <Table
                        columns={columns}
                        dataSource={proposals}
                        rowKey="id"
                        loading={loading}
                        pagination={{
                            pageSize: 10,
                            className: "custom-pagination"
                        }}
                        className="custom-table"
                        rowClassName="custom-row"
                    />
                </div>
            </div>

            <style jsx global>{`
                .custom-table .ant-table {
                    background: transparent !important;
                    color: white !important;
                }
                .custom-table .ant-table-thead > tr > th {
                    background: rgba(255, 255, 255, 0.05) !important;
                    color: #94a3b8 !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
                    font-weight: 600 !important;
                    text-transform: uppercase !important;
                    font-size: 0.75rem !important;
                    letter-spacing: 0.05em !important;
                }
                .custom-table .ant-table-tbody > tr > td {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
                    color: #e2e8f0 !important;
                    transition: all 0.2s !important;
                }
                .custom-table .ant-table-tbody > tr:hover > td {
                    background: rgba(255, 255, 255, 0.05) !important;
                }
                .custom-row:hover {
                    cursor: pointer;
                }
                
                /* Pagination */
                .custom-pagination .ant-pagination-item {
                    background: transparent !important;
                    border-color: rgba(255, 255, 255, 0.2) !important;
                }
                .custom-pagination .ant-pagination-item a {
                    color: #94a3b8 !important;
                }
                .custom-pagination .ant-pagination-item-active {
                    background: rgba(99, 102, 241, 0.2) !important;
                    border-color: #6366f1 !important;
                }
                .custom-pagination .ant-pagination-item-active a {
                    color: white !important;
                }
                .custom-pagination .ant-pagination-prev .ant-pagination-item-link,
                .custom-pagination .ant-pagination-next .ant-pagination-item-link {
                    background: transparent !important;
                    border-color: rgba(255, 255, 255, 0.2) !important;
                    color: #94a3b8 !important;
                }
                
                /* Select in Table */
                .ant-select-dropdown {
                    background-color: #0f172a !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                }
                .ant-select:not(.ant-select-customize-input) .ant-select-selector {
                    background-color: transparent !important;
                    border-color: rgba(255, 255, 255, 0.2) !important;
                    color: #e2e8f0 !important;
                }
                .ant-select-arrow {
                    color: rgba(255, 255, 255, 0.5) !important;
                }
            `}</style>
        </div>
    );
}
