# 科技爱好者周刊精华

这个项目是 [ruanyf/weekly](https://github.com/ruanyf/weekly) 的衍生项目，自动提取周刊中的优质内容并分类整理。

## 项目特点

- 自动监控原仓库更新
- 提取工具、AI 相关、资源等内容
- 分类整理并提供易于浏览的网站界面

## 内容分类

- 工具：实用工具和软件推荐
- AI 相关：人工智能相关内容
- 资源：优质学习资源和文章

## 本地开发

1. 克隆项目

```bash
git clone https://github.com/your-username/ruanyf-weekly-pick.git
cd ruanyf-weekly-pick
```

2. 安装依赖

```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
# 或 .\venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

3. 运行内容提取脚本

```bash
python scripts/extract_content.py
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT
