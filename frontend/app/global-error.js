'use client';

import { Button, Result, Typography } from 'antd';

const { Paragraph, Text } = Typography;

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body className="h-screen w-screen flex justify-center items-center bg-gray-50">
                <Result
                    status="500"
                    title="Critical System Error"
                    subTitle={
                        <div className="flex flex-col items-center gap-2">
                            <Text type="secondary">A critical error occurred preventing the application from loading.</Text>
                            <Paragraph className="max-w-md text-center text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 mt-2">
                                {error.message || "Unknown System Error"}
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
                            Reload Application
                        </Button>
                    }
                />
            </body>
        </html>
    );
}
