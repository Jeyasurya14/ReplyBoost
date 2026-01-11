import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, theme } from 'antd';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "ReplyBoost - Get More Freelance Replies",
  description: "AI-powered proposal generator for Upwork and Fiverr freelancers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-slate-50 text-slate-900 relative`}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#4F46E5', // Indigo 600
              fontFamily: 'var(--font-inter)',
              borderRadius: 8,
            },
          }}
        >
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
