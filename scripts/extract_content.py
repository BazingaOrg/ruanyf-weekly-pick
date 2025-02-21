#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import json
from datetime import datetime
from pathlib import Path

class ContentExtractor:
    def __init__(self):
        self.docs_dir = Path('docs')
        self.data_dir = Path('data')
        self.last_processed_file = self.data_dir / 'last_processed.json'
        
        # 确保数据目录存在
        self.data_dir.mkdir(exist_ok=True)
        
        # 加载上次处理记录
        self.last_processed = self._load_last_processed()
        
        # 存储提取的内容
        self.content_store = {
            'tools': [],
            'ai': [],
            'resources': []
        }
        
        # 定义各部分的标题
        self.section_titles = {
            'tools': '工具',
            'ai': ['AI 相关', 'AI 工具'],  # 使用列表存储多个可能的标题
            'resources': '资源'
        }
        
    def _load_last_processed(self):
        """加载上次处理的文件记录"""
        if self.last_processed_file.exists():
            with open(self.last_processed_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {'files': {}, 'last_update': None}
    
    def _save_last_processed(self):
        """保存处理记录"""
        with open(self.last_processed_file, 'w', encoding='utf-8') as f:
            json.dump(self.last_processed, f, ensure_ascii=False, indent=2)
    
    def _extract_section(self, content, section_name):
        """提取指定部分的内容"""
        section_title = self.section_titles[section_name]
        
        # 如果是列表，则尝试匹配多个标题
        if isinstance(section_title, list):
            for title in section_title:
                pattern = f"## {title}.*?(?=##|$)"
                match = re.search(pattern, content, re.DOTALL)
                if match:
                    section_content = match.group(0)
                    print(f"Found section {title}:")
                    print(section_content[:200])  # 打印前200个字符
                    # 移除标题行
                    content_lines = section_content.split('\n')[1:]
                    return '\n'.join(content_lines).strip()
            return ""
        else:
            # 原有的单一标题匹配逻辑
            pattern = f"## {section_title}.*?(?=##|$)"
            match = re.search(pattern, content, re.DOTALL)
            if match:
                section_content = match.group(0)
                print(f"Found section {section_name}:")
                print(section_content[:200])  # 打印前200个字符
                # 移除标题行
                content_lines = section_content.split('\n')[1:]
                return '\n'.join(content_lines).strip()
            return ""
    
    def _extract_issue_info(self, filename, content):
        """提取期号和标题"""
        # 从文件名提取期号
        number_match = re.search(r'issue-(\d+)', filename)
        issue_number = int(number_match.group(1)) if number_match else 0
        
        # 从内容中提取标题
        title_match = re.search(r'# (.*?)\n', content)
        title = title_match.group(1) if title_match else ''
        
        # 移除标题中的期号相关文字和多余的冒号
        title = re.sub(r'^(第\s*\d+\s*期：?)|(（第\s*\d+\s*期）)|(科技爱好者周刊)|：|\s+', ' ', title)
        title = title.strip()
        
        return issue_number, title
    
    def process_file(self, file_path):
        """处理单个文件"""
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 提取期号和标题
        issue_number, title = self._extract_issue_info(file_path.name, content)
        print(f"\nProcessing issue {issue_number}: {title}")
        
        # 处理每个部分
        for section_key, section_title in self.section_titles.items():
            section_content = self._extract_section(content, section_key)
            if section_content:
                print(f"Found content for {section_key}")
                self.content_store[section_key].append({
                    'content': section_content,
                    'issue': issue_number,
                    'title': title,
                    'filename': file_path.name
                })
    
    def save_merged_content(self):
        """保存合并后的内容"""
        for section_key, items in self.content_store.items():
            # 按期号倒序排序
            sorted_items = sorted(items, key=lambda x: x['issue'], reverse=True)
            
            output_file = self.data_dir / f"{section_key}.md"
            with open(output_file, 'w', encoding='utf-8') as f:
                for item in sorted_items:
                    # 添加带链接的标题，包含期号和文章标题
                    issue_link = f"https://github.com/ruanyf/weekly/blob/master/docs/issue-{item['issue']}.md"
                    f.write(f"## [第 {item['issue']} 期：{item['title']}]({issue_link})\n\n")
                    
                    f.write(f"{item['content']}\n\n")
                    f.write("---\n\n")
    
    def run(self):
        """运行内容提取程序"""
        # 获取所有需要处理的文件，按期号倒序排列
        md_files = sorted(self.docs_dir.glob('issue-*.md'), 
                         key=lambda x: self._extract_issue_info(x.name, x.read_text())[0],
                         reverse=True)
        
        print(f"Found {len(md_files)} files to process")
        
        # 清空内容存储
        self.content_store = {
            'tools': [],
            'ai': [],
            'resources': []
        }
        
        # 处理所有文件
        for file_path in md_files:
            print(f"\nProcessing file: {file_path}")
            self.process_file(file_path)
            file_stat = file_path.stat()
            self.last_processed['files'][str(file_path)] = file_stat.st_mtime
        
        print(f"\nContent store stats:")
        for section, items in self.content_store.items():
            print(f"{section}: {len(items)} items")
        
        # 保存合并的内容
        self.save_merged_content()
        
        # 保存处理记录
        self.last_processed['last_update'] = datetime.now().isoformat()
        self._save_last_processed()

if __name__ == '__main__':
    extractor = ContentExtractor()
    extractor.run() 