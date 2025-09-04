# OceanBase 生态插件合集

本仓库包含多个插件，旨在解决 **OceanBase** 与不同框架/工具（如 Flyway、Trino、WordPressd等）之间的兼容性问题。每个插件针对特定场景优化，确保数据库操作的稳定性与高效性。

------

## 🧩 项目概述

OceanBase 是一款兼容 MySQL 和 Oracle 协议的高性能数据库。本仓库提供以下插件，帮助开发者在实际应用中解决常见兼容性问题：

全屏复制

| 插件名称                                                                                                       | 适用场景   | 主要功能                                           |
|------------------------------------------------------------------------------------------------------------| ---------- | -------------------------------------------------- |
| [Flyway OceanBase 插件](./flyway-oceanbase-plugin/README_CN.md)      | 数据库迁移 | 解决 Flyway 在 OceanBase MySQL 模式下的兼容性问题  |
| [Trino OceanBase 插件](./trino-oceanbase-plugin/README_CN.md)        | 数据分析   | 支持 Trino 连接 OceanBase（MySQL/Oracle 模式）     |
| [WordPress OceanBase 插件](./wordpress-oceanbase-plugin/README_CN.md) | 内容管理   | 修复 WordPress 与 OceanBase MySQL 租户的兼容性问题 |
| [OceanBase SQL 助手插件](./oceanbase-sql-helper-plugin/README_CN.md) | 开发工具   | VSCode 插件，快速访问 OceanBase SQL 关键词文档     |
| [OceanBase SQLAlchemy 插件](./oceanbase-sqlalchemy-plugin/README.md) | Python ORM  | SQLAlchemy 方言，支持 OceanBase Oracle 模式，兼容 SQLAlchemy 1.3+ 和 2.0+ |

------

## 📁 插件详情

### ✅ Flyway OceanBase MySQL 插件

- **功能**：解决 Flyway 在 OceanBase MySQL 模式下的迁移问题（如 `version` 字段冲突、驱动兼容性等）。
- **适用场景**：使用 Flyway 管理 OceanBase MySQL 模式的数据库迁移。
- **详细文档**：[Flyway OceanBase 插件](./flyway-oceanbase-plugin/README_CN.md)

------

### ✅ Trino OceanBase 插件

- **功能**：支持 Trino 连接 OceanBase（MySQL/Oracle 模式），优化 SQL 查询与事务处理。
- **适用场景**：通过 Trino 查询 OceanBase 数据库（支持多模式）。
- **详细文档**：[Trino OceanBase 插件](./trion-oceanbase-plugin/README_CN.md)

------

### ✅ WordPress OceanBase 插件

- **功能**：修复 WordPress 与 OceanBase MySQL 租户的兼容性问题（如表别名限制）。
- **适用场景**：WordPress 部署在 OceanBase MySQL 租户时的兼容性适配。
- **详细文档**：[WordPress OceanBase 插件](./wordpress-oceanbase-plugin/README_CN.md)

------

### ✅ OceanBase SQL 助手插件

- **功能**：VSCode 插件，提供 OceanBase SQL 关键词文档的快速访问，支持悬停提示和直接导航。
- **适用场景**：增强开发者在编写 OceanBase 数据库 SQL 查询时的开发体验。
- **详细文档**：[OceanBase SQL 助手插件](./oceanbase-sql-helper-plugin/README_CN.md)

------

### ✅ OceanBase SQLAlchemy 插件

- **功能**：SQLAlchemy 方言，支持 OceanBase Oracle 模式，完全兼容 SQLAlchemy 1.3.x 和 2.0+，提供优化的 SQL 查询和约束反射。
- **适用场景**：使用 Python SQLAlchemy ORM 框架连接和操作 OceanBase Oracle 模式数据库。
- **详细文档**：[OceanBase SQLAlchemy 插件](./oceanbase-sqlalchemy-plugin/README.md)

------

## 📚 完整文档链接

| 插件名称                    | 文档链接                                                     |
| --------------------------- | ------------------------------------------------------------ |
| Flyway OceanBase MySQL 插件 | [Flyway OceanBase 插件](./flyway-oceanbase-plugin/README_CN.md) |
| Trino OceanBase 插件        | [Trino OceanBase 插件](./trino-oceanbase-plugin/README_CN.md) |
| WordPress OceanBase 插件    | [WordPress OceanBase 插件](./wordpress-oceanbase-plugin/README_CN.md) |
| OceanBase SQL 助手插件      | [OceanBase SQL 助手插件](./oceanbase-sql-helper-plugin/README_CN.md) |
| OceanBase SQLAlchemy 插件   | [OceanBase SQLAlchemy 插件](./oceanbase-sqlalchemy-plugin/README.md) |

------

## 🛠️ 贡献与反馈

欢迎提交 Issues 或 Pull Request，帮助完善插件功能。

- [GitHub Issues]( https://github.com/oceanbase/ecology-plugins/issues)

------

## 📄 授权协议

本项目采用 [Apache License 2.0](./LICENSE) 协议开源。

------

## 📌 注意事项

- 每个插件的详细配置与使用方法，请参考对应文档。
- 确保 OceanBase 版本与插件兼容（建议 ≥ 3.1.0）。
- 插件适用于 MySQL/Oracle 模式，需根据实际环境选择适配版本。