"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation } from "@/components/nav-links";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function AppSidebar() {
  // 初始状态设置为 true (收起状态)
  const [isCollapsed, setIsCollapsed] = useState(true);
  // 使用 useEffect 在客户端加载时读取 localStorage
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved !== null) {
      setIsCollapsed(JSON.parse(saved));
    }
    // 如果没有保存的状态,保持默认的收起状态
    setIsLoaded(true);
  }, []);

  const toggleCollapsed = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
  };

  // 在客户端 JavaScript 加载完成前不渲染内容
  if (!isLoaded) {
    return null;
  }

  return (
    <>
      {/* 移动端遮罩层 */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => toggleCollapsed()}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={cn(
          "group/sidebar fixed top-0 left-0 z-30 flex h-screen flex-col bg-sidebar border-r transition-all duration-300 ease-in-out md:sticky",
          isCollapsed ? "w-[50px]" : "w-64"
        )}
      >
        {/* 折叠按钮 */}
        <button
          onClick={() => toggleCollapsed()}
          className={cn(
            "absolute -right-4 top-6 z-40 h-8 w-8 flex items-center justify-center rounded-full border bg-background",
            "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>

        {/* Logo 和版本号 */}
        <div className="shrink-0 p-4 border-b">
          <Link
            href="https://github.com/ruanyf/weekly"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 pl-1 hover:opacity-80 transition-opacity",
              isCollapsed && "justify-center pl-0"
            )}
          >
            <div className="w-7 h-7 bg-foreground/10 rounded-lg flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div
              className={cn(
                "flex flex-col transition-all duration-300",
                isCollapsed
                  ? "w-0 opacity-0 overflow-hidden"
                  : "w-auto opacity-100"
              )}
            >
              <div className="font-semibold whitespace-nowrap text-sm">
                阮一峰周刊
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                精选内容
              </div>
            </div>
          </Link>
        </div>

        {/* 导航菜单 */}
        <div
          className={cn(
            "flex-1 overflow-y-auto transition-all duration-300 scrollbar-none",
            isCollapsed ? "px-0 py-4" : "p-4"
          )}
        >
          <Navigation isCollapsed={isCollapsed} />
        </div>

        {/* 底部说明文字 */}
        {!isCollapsed && (
          <div className="shrink-0 p-4 border-t">
            <div className="text-xs text-muted-foreground leading-normal">
              提取每期优质内容，方便日后查找和复用。按工具、AI、资源分类整理，告别翻找往期的烦恼。
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
