# OceanBase 数据库 Dify 工具

一个简单的 OceanBase 数据库插件，通过 Dify 应用程序在 OceanBase 数据库上安全执行 SQL 查询。

## 🌟 功能特性

### 数据库操作
- **执行 SQL 语句**：运行任何 SQL 命令，包括 SELECT、INSERT、UPDATE、DELETE、SHOW、DESCRIBE、CALL 等
- **智能结果格式化**：自动格式化查询结果，提高可读性
- **全面的错误处理**：提供详细的错误信息，便于故障排除

## 🚀 快速开始

### 1. 安装
1. 在您的 Dify 环境中安装插件
2. 配置您的 OceanBase 连接凭据
3. 开始在您的 Dify 应用程序中使用 SQL 执行工具

### 2. 配置
配置以下连接参数：

| 参数 | 类型 | 必需 | 默认值 | 描述 |
|------|------|------|--------|------|
| ob_host | text-input | 是 | localhost | OceanBase 服务器地址 |
| ob_port | text-input | 是 | 2881 | OceanBase 服务端口 |
| ob_user | text-input | 是 | - | 数据库用户名 |
| ob_password | secret-input | 是 | - | 数据库密码 |
| ob_database | text-input | 是 | - | 数据库名称 |

### 3. 使用示例

#### 执行 SQL 查询
```
执行 SQL：SELECT * FROM users LIMIT 10
```

#### 显示表
```
执行 SQL：SHOW TABLES
```

#### 描述表结构
```
执行 SQL：DESCRIBE users
```

#### 插入数据
```
执行 SQL：INSERT INTO users (name, email) VALUES ('John', 'john@example.com')
```

## 🛠️ 可用工具

### 执行 SQL
在 OceanBase 数据库上执行 SQL 语句，具有全面的错误处理和结果格式化功能。

**参数：**
- `sql`（字符串，必需）：要执行的 SQL 语句

**支持的 SQL 类型：**
- 带格式化结果的 SELECT 查询
- INSERT、UPDATE、DELETE 操作
- SHOW 命令（TABLES、COLUMNS 等）
- DESCRIBE 表结构
- CALL 存储过程
- CREATE、ALTER、DROP DDL 语句

## 🔧 开发

### 项目结构
```
oceanbase-dify-plugins/
├── main.py                          # 插件入口点
├── manifest.yaml                    # 插件元数据
├── requirements.txt                 # Python 依赖
├── provider/
│   ├── oceanbase-dify-plugins.yaml  # 提供者配置
│   └── oceanbase-dify-plugins.py    # 提供者实现
└── tools/
    ├── execute_sql.yaml             # SQL 执行工具配置
    └── execute_sql.py               # SQL 执行工具实现
```

### 本地开发
1. 克隆仓库
2. 安装依赖：`pip install -r requirements.txt`
3. 配置环境变量
4. 本地运行：`python -m main`

## 🔒 安全性

- 所有数据库凭据都安全存储并加密
- 通过参数化查询防止 SQL 注入
- 工具执行前进行连接验证
- 不记录敏感数据

## 📝 许可证

本项目采用 MIT 许可证 - 详情请参阅 LICENSE 文件。

## 🤝 贡献

1. Fork 仓库
2. 创建功能分支
3. 进行更改
4. 如适用，添加测试
5. 提交拉取请求

## 📞 支持

如有问题和疑问：
- 查看文档
- 查看故障排除指南

## 🔗 相关项目

- OceanBase MCP Server - 底层 MCP 服务器实现
- Dify Plugin SDK - Dify 插件开发框架
