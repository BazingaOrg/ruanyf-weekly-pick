"use client";

import React from "react";
import { useInView } from "react-intersection-observer";

interface Section {
  id: string;
  content: string;
  type: "text" | "media";
}

function splitContent(html: string): Section[] {
  // 将内容按照媒体标签(img, iframe, video等)分割
  const sections: Section[] = [];
  let currentText = "";

  // 使用正则表达式匹配媒体标签
  const mediaPattern =
    /<(img|iframe|video)[^>]*>|<div class="video-container"[^>]*>[\s\S]*?<\/div>/g;
  let lastIndex = 0;
  let match;

  while ((match = mediaPattern.exec(html)) !== null) {
    // 添加媒体标签之前的文本
    const textBefore = html.slice(lastIndex, match.index).trim();
    if (textBefore) {
      sections.push({
        id: `text-${sections.length}`,
        content: textBefore,
        type: "text",
      });
    }

    // 添加媒体部分
    sections.push({
      id: `media-${sections.length}`,
      content: match[0],
      type: "media",
    });

    lastIndex = match.index + match[0].length;
  }

  // 添加剩余的文本
  const remainingText = html.slice(lastIndex).trim();
  if (remainingText) {
    sections.push({
      id: `text-${sections.length}`,
      content: remainingText,
      type: "text",
    });
  }

  return sections;
}

function ContentSection({
  content,
  type,
}: {
  content: string;
  type: "text" | "media";
}) {
  // 文本内容直接渲染
  if (type === "text") {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  // 媒体内容使用懒加载
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="media-section py-4">
      {inView ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <div className="h-[200px] animate-pulse bg-muted rounded-lg" />
      )}
    </div>
  );
}

export function VirtualContent({ html }: { html: string }) {
  const sections = splitContent(html);

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <ContentSection
          key={section.id}
          content={section.content}
          type={section.type}
        />
      ))}
    </div>
  );
}
