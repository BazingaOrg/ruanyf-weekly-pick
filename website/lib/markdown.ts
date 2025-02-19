import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const dataDirectory = path.join(process.cwd(), "..", "data");

export async function getMarkdownContent(filename: string) {
  try {
    // 检查是否是 markdown 文件
    if (!filename.endsWith(".md")) {
      throw new Error("Not a markdown file");
    }

    const fullPath = path.join(dataDirectory, filename);

    // 检查文件是否存在
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${filename}`);
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");

    // 使用 gray-matter 解析 markdown 内容
    const { content } = matter(fileContents);

    // 处理腾讯视频 iframe
    const processedContent = content.replace(
      /<iframe[^>]*?vid=([a-zA-Z0-9]+)[^>]*?><\/iframe>/g,
      (match, vid) => {
        return `
          <div class="video-container" data-vid="${vid}">
            <div class="video-placeholder">
              <img src="https://puui.qpic.cn/vpic_cover/${vid}/${vid}_hz.jpg" alt="视频预览" loading="lazy" />
              <button class="play-button" onclick="loadVideo(this, '${vid}')">播放视频</button>
            </div>
          </div>
        `;
      }
    );

    // 处理其他图片，添加 loading="lazy" 和 decoding="async" 属性
    const processedWithImages = processedContent.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (match, alt, src) => {
        return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" style="max-width: 100%; height: auto;" />`;
      }
    );

    // 使用 remark 将 markdown 转换为 HTML
    const processedHtml = await remark()
      .use(html, { sanitize: false }) // 禁用 sanitize 以保留 img 标签的属性
      .process(processedWithImages);
    const contentHtml = processedHtml.toString();

    return {
      contentHtml,
    };
  } catch (error) {
    console.error(`Error processing markdown file ${filename}:`, error);
    throw error;
  }
}

export function getAllCategories() {
  const categories = [
    { id: "tools", name: "工具" },
    { id: "ai", name: "AI" },
    { id: "resources", name: "资源" },
  ];

  return categories;
}
