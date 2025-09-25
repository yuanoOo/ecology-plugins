# OceanBase Dify 插件

## 🔗 仓库地址

**GitHub**: https://github.com/oceanbase/dify-plugin-oceanbase

## 📖 项目描述

这是一个用于连接和查询 OceanBase 数据库的 Dify 插件。

## 🌟 功能特性

### 工具介绍

#### 1. 执行 SQL

- **功能**: 在现有 OceanBase 数据库上执行 SQL 查询
- **用法**: 直接执行以 SELECT、SHOW 或 WITH 开头的 SQL 语句
- **输出格式**: 支持多种格式，包括 JSON、CSV、YAML、Markdown、Excel、HTML 等
- **安全限制**: 仅支持查询语句，确保数据库安全

#### 2. 获取表结构

- **功能**: 从数据库获取表结构信息
- **用法**: 为 LLM 提供数据库上下文，帮助理解表结构
- **灵活性**: 可以指定特定表或获取所有表的结构信息
- **用例**: 在生成 SQL 查询前了解数据库结构

#### 3. 文本转 SQL

- **功能**: 使用 LLM 将自然语言查询转换为 SQL 语句
- **用法**: 允许用户用自然语言描述查询需求，自动生成相应的 SQL
- **智能性**: 基于数据库上下文和表结构信息生成准确的 SQL
- **模型选择**: 支持选择不同的大语言模型进行转换

## 🚀 使用说明

1. **数据库连接**: 配置 OceanBase 数据库连接信息
2. **选择工具**: 根据需求选择合适的工具
3. **执行查询**: 通过自然语言或直接 SQL 查询数据
4. **获取结果**: 以指定格式获取查询结果

## ⚠️ 注意事项

- 此插件仅支持查询操作，不支持数据修改
- 建议使用只读数据库账户以确保安全
- 支持多种输出格式，可根据需要选择

## 📝 许可证

本项目采用 Apache-2.0 许可证。

## 🤝 贡献

请访问仓库进行贡献：https://github.com/oceanbase/dify-plugin-oceanbase

## 📞 支持

如有问题，请在新仓库中提交 Issue：https://github.com/oceanbase/dify-plugin-oceanbase/issues
