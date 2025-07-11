# OceanBase SQL 关键词文档助手

一个帮助开发者在 VSCode 中快速查找 OceanBase SQL 关键词文档的插件。

<main id="notice" type="notice">
<h4>注意</h4>
<p>本插件仅支持 <strong>VSCode 1.101.0 及以上版本</strong>。请确保您的 VSCode 已升级到 2025 年 5 月或更高版本。</p>
</main>

## ✅ 已实现功能

- **🔍 智能关键词识别**：支持单个关键词和多词关键词（如 `ALTER OUTLINE`、`ALTER EXTERNAL TABLE`）
- **🖱️ 鼠标悬停提示**：悬停在关键词上显示描述信息
- **🖱️ 双击跳转**：双击关键词直接跳转到对应文档
- **📖 CodeLens 链接**：在关键词上方显示"📖 查看文档"链接，点击即可跳转
- **🔄 热加载配置**：修改 `keywords.json` 文件后自动生效
- **⚙️ 自定义关键词**：支持用户自定义关键词和文档链接

## 🚀 安装方法

1. 在 VSCode 插件市场搜索并安装本插件。

2. 安装完成后，重启 VSCode。

## 📖 使用说明

1. 打开或新建 `.sql` 文件，确保右下角语言模式为 SQL。
2. 将鼠标悬停在 OceanBase SQL 关键词上，可查看说明。
3. 双击关键词可直接跳转到官方文档。
4. 关键词上方会显示"📖 查看文档"链接，点击即可访问详细文档。

## 🔧 支持的关键词类型

- 单个关键词：如 `SELECT`、`INSERT`、`UPDATE`、`DELETE` 等
- 多词关键词：如 `ALTER OUTLINE`、`CREATE MATERIALIZED VIEW` 等
- 大小写不敏感

## ❓ 常见问题

- **插件未生效？**
  - 请确认 VSCode 版本为 1.101.0 及以上。
  - 确认 SQL 文件语言模式正确。
  - 如遇异常可重启 VSCode。

- **如何自定义关键词？**
  - 仅支持源码开发者自定义，普通用户无法直接修改关键词。

- **插件报错或跳转无效？**
  - 请确保网络畅通，或反馈至插件仓库。

## 💬 反馈与支持

如有建议、问题或需求，欢迎在插件市场留言或通过 GitHub 提交 Issue。

## 📄 许可证

Apache License 2.0

## 🔗 相关链接

- [OceanBase 官方文档](https://www.oceanbase.com/docs)
- [GitHub 仓库](https://github.com/oceanbase/ecology-plugins/tree/main/oceanbase-sql-helper-plugin)
