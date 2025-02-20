import React from "react";
import { getMarkdownContent } from "@/lib/markdown";
import { notFound } from "next/navigation";
import { VirtualContent } from "@/components/virtual-content";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  // 检查是否是有效的分类
  const validCategories = ["tools", "ai", "resources"];
  if (!validCategories.includes(params.category)) {
    notFound();
  }

  try {
    const { contentHtml } = await getMarkdownContent(`${params.category}.md`);
    const categoryNames: { [key: string]: string } = {
      tools: "工具",
      ai: "AI",
      resources: "资源",
    };

    return (
      <div className="min-h-screen bg-background">
        <div className="container py-6 md:py-8 ml-[50px] md:ml-0">
          <article className="prose prose-sm md:prose-base dark:prose-invert prose-compact mx-auto">
            <VirtualContent html={contentHtml} />
          </article>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading markdown content:", error);
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-6 md:py-8 ml-[50px] md:ml-0">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">加载失败</h1>
            <p className="text-muted-foreground">内容加载失败，请稍后重试。</p>
          </div>
        </div>
      </div>
    );
  }
}
