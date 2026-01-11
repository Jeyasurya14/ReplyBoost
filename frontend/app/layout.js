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
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground relative selection:bg-indigo-500/30 selection:text-indigo-200 cosmic-bg`}>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorPrimary: '#6366f1',
              fontFamily: 'var(--font-inter)',
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
