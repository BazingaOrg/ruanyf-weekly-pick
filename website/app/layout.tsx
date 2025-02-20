import React from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { Search, Menu } from "lucide-react";
import { Navigation } from "@/components/nav-links";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata = {
  title: "阮一峰周刊精选",
  description: "阮一峰周刊精选内容，包含工具、AI 和资源等分类。",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            <AppSidebar />
            <main className="flex-1 overflow-auto p-8">{children}</main>
          </div>
        </ThemeProvider>
        <Script id="video-loader">{`
          function loadVideo(button, vid) {
            const container = button.closest('.video-container');
            const placeholder = container.querySelector('.video-placeholder');
            
            const iframe = document.createElement('iframe');
            iframe.src = \`https://v.qq.com/txp/iframe/player.html?vid=\${vid}\`;
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.allowFullscreen = true;
            iframe.style.border = 'none';
            
            container.replaceChild(iframe, placeholder);
          }
        `}</Script>
      </body>
    </html>
  );
}
