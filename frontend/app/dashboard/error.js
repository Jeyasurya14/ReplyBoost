'use client';

import { useEffect } from 'react';
import { Button, Result, Typography } from 'antd';

const { Paragraph, Text } = Typography;

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Dashboard Error:', error);
    }, [error]);

    return (
        <div className="flex h-full min-h-[60vh] items-center justify-center p-4">
            <Result
                status="error"
                title="Something went wrong"
                subTitle={
                    <div className="flex flex-col items-center gap-2">
                        <Text type="secondary">We encountered an unexpected error while loading this page.</Text>
                        <Paragraph className="max-w-md text-center text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 mt-2">
                            {error.message || "Unknown Application Error"}
                        </Paragraph>
                    </div>
                }
                extra={
                    <Button
                        type="primary"
                        onClick={() => reset()}
                        size="large"
                        className="bg-indigo-600 hover:bg-indigo-500 border-none shadow-lg shadow-indigo-200"
                    >
                        Try Again
                    </Button>
                }
            />
        </div>
    );
}
