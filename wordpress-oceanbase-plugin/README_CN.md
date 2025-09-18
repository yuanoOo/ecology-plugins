# OceanBase Compatibility Plugin for WordPress

## 项目简介

OceanBase 是一款兼容 MySQL 协议的高性能数据库。在实际使用中，WordPress 的某些查询可能会因 OceanBase 的语法限制而执行失败。本插件专为 OceanBase 的 MySQL 租户数据库设计，可自动检测并修复 WordPress 与 OceanBase MySQL 租户之间的兼容性问题，确保 WordPress 在 OceanBase 上稳定运行。

------

## 当前已解决的问题

1. **"multiple aliases to same table not supported" 错误**
OceanBase 当前不支持在单条 SQL 查询中对同一张表使用多个别名进行删除/更新操作。

------

## 插件功能

- ✅ **自动拦截并重写不兼容的 SQL 查询**
- ✅ **确保 WordPress 及主流插件在 OceanBase 上的兼容性**
- ✅ **无需修改 WordPress 核心或插件代码，开箱即用**

------

## 安装方式

### 通过 WordPress 插件目录安装

如果该插件已发布至 WordPress 插件目录，您可以在 WordPress 后台搜索 "oceanbase-compatibility" 并直接安装。

### 手动安装

1. **下载插件包**
   从 [GitHub 仓库](https://github.com/oceanbase/oceanbase/ecology-plugins.git) 下载插件包。
2. **上传插件**
   通过主机控制面板（如 cPanel）或 FTP 客户端，将 `ecology-plugins/wordpress-oceanbase-plugin` 目录上传到 WordPress 的 `wp-content/plugins` 目录。
3. **激活插件**
   登录 WordPress 后台，进入 "插件" 页面，找到新上传的插件并点击 "激活"。

------

## 贡献与反馈

我们欢迎通过 [GitHub Issues](https://github.com/oceanbase/ecology-plugins/issues) 提交问题或建议，帮助完善插件功能。

------

## 📄 授权协议

本项目采用 [Apache License 2.0](https://github.com/oceanbase/ecology-plugins/blob/main/wordpress-oceanbase-plugin/LICENSE) 协议开源。