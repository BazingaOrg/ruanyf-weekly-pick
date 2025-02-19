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
      <div className="container py-8">
        <article className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-compact">
          <VirtualContent html={contentHtml} />
        </article>
      </div>
    );
  } catch (error) {
    console.error("Error loading markdown content:", error);
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">加载失败</h1>
        <p className="text-red-500">内容加载失败，请稍后重试。</p>
      </div>
    );
  }
}
