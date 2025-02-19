# 科技爱好者周刊精华

这个项目是 [ruanyf/weekly](https://github.com/ruanyf/weekly) 的衍生项目，旨在提供一个便捷的方式来检索和查找周刊中的优质内容。

## 项目初衷

作为阮一峰科技爱好者周刊的长期读者，经常会遇到这样的场景：

- 记得某期周刊提到过一个很好用的工具，但找不到具体是哪一期
- 开发过程中需要查找特定领域的资源，想看看周刊之前的相关推荐
- 想了解 AI 相关的内容，但散落在不同期次中

为了解决这些问题，开发了这个项目，将周刊中的内容按照类别提取并重新组织，方便检索和查找。

## 功能特点

- 🔍 内容分类整理：

  - 工具：实用工具和软件推荐
  - AI：人工智能相关内容
  - 资源：优质学习资源和文章

- 🎯 使用体验：

  - 响应式设计，支持移动端访问
  - 支持深色/浅色主题切换
  - 简洁直观的导航界面

- 🔄 自动更新：
  - 每周五自动同步原仓库更新
  - 自动提取并分类新增内容

## 本地开发

1. 克隆项目

```bash
git clone https://github.com/your-username/ruanyf-weekly-pick.git
cd ruanyf-weekly-pick
```

2. 安装依赖

```bash
# 安装 Python 依赖
pip install -r requirements.txt

# 安装前端依赖
cd website
npm install
```

3. 运行开发服务器

```bash
# 提取内容
python scripts/extract_content.py

# 启动前端开发服务器
cd website
npm run dev
```

## 技术栈

- 前端：Next.js 14、React、Tailwind CSS、shadcn/ui
- 内容处理：Python、Markdown
- 自动化：GitHub Actions

## 贡献

欢迎提交 Issue 和 Pull Request！

## 致谢

- 感谢 [阮一峰](https://github.com/ruanyf) 老师的科技爱好者周刊
- 感谢所有为周刊投稿的朋友们

## 许可证

MIT
