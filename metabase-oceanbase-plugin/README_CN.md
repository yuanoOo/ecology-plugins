# Metabase OceanBase 插件

## 项目简介

Metabase OceanBase 插件专为 **Metabase** 与 **OceanBase** 数据库的集成而设计。该插件支持 OceanBase 的 MySQL 和 Oracle 兼容模式，能够自动检测数据库兼容模式并适配相应的 SQL 语法。

------

## ✅ 已解决的问题

| 问题               | 描述                                               | 解决方案                                                     |
| ------------------ | -------------------------------------------------- | ------------------------------------------------------------ |
| 兼容模式检测       | Metabase 无法自动识别 OceanBase 的兼容模式。       | 通过 `SHOW VARIABLES LIKE 'ob_compatibility_mode'` 自动检测兼容模式。 |
| SQL 语法适配       | 不同兼容模式下的 SQL 语法差异导致查询失败。        | 根据检测到的兼容模式自动选择相应的 SQL 语法和函数。         |
| 元数据同步         | 无法正确获取 OceanBase 的表结构和字段信息。        | 针对 MySQL 和 Oracle 模式分别实现元数据查询逻辑。           |
| 连接参数配置       | 缺少 OceanBase 专用的连接参数和配置选项。          | 提供完整的 OceanBase 连接参数配置，包括超时、重连等选项。   |
| 数据类型映射       | OceanBase 特有数据类型无法正确映射到 Metabase。    | 实现完整的数据类型映射表，支持 MySQL 和 Oracle 模式。       |

------

## 🛠️ 功能特点

- ✅ **自动兼容模式检测**：通过查询 `ob_compatibility_mode` 变量自动识别 OceanBase 的 MySQL 或 Oracle 兼容模式。
- ✅ **双模式 SQL 适配**：根据检测到的兼容模式自动选择相应的 SQL 语法、函数和查询方式。
- ✅ **完整的元数据支持**：支持表结构、字段信息、索引、约束等元数据的正确获取和同步。
- ✅ **数据类型映射**：完整支持 OceanBase MySQL 和 Oracle 模式下的所有数据类型映射。

------

## 📦 安装与配置

### 📌 前置条件

- Metabase 版本 ≥ **0.48.0**
- Java 11 或更高版本
- OceanBase 版本 ≥ **3.1.0**

### 🛠️ 安装步骤

#### 1. 下载插件

Metabase OceanBase 插件已包含在此仓库中。导航到插件目录：

```bash
cd metabase-oceanbase-plugin
```

#### 2. 构建插件

```bash
# 构建所有驱动
./bin/build-drivers.sh

# 或者只构建 OceanBase 驱动
cd modules/drivers/oceanbase
clojure -M:build
```

#### 3. 部署插件

将构建好的插件文件复制到 Metabase 的插件目录：

```bash
# 复制插件到 Metabase 插件目录
cp modules/drivers/oceanbase/target/metabase-driver-oceanbase.jar /path/to/metabase/plugins/
```

#### 4. 使用 Docker 运行 Metabase

启动 Metabase 容器：

```bash
docker run -d -p 3000:3000 --name metabase metabase/metabase
```

将插件复制到容器中：

```bash
docker cp /path/to/oceanbase.metabase-driver.jar metabase:/plugins
```

重启容器以加载插件：

```bash
docker restart metabase
```

------

### 🔧 配置数据库连接

#### 1. 在 Metabase 中添加数据库

1. 登录 Metabase 管理界面
2. 进入 **管理** → **数据库**
3. 点击 **添加数据库**
4. 选择 **OceanBase** 作为数据库类型

#### 2. 配置连接参数

| 参数名称     | 描述                            | 示例值         |
| ------------ | ------------------------------- | -------------- |
| **主机**     | OceanBase 服务器地址            | `localhost`    |
| **端口**     | OceanBase 服务端口（默认 2881） | `2881`         |
| **数据库名** | 要连接的数据库名称              | `your_database` |
| **用户名**   | 数据库用户名                    | `your_username` |
| **密码**     | 数据库密码                      | `your_password` |

------

## 🧪 使用示例

### 1. 连接测试

配置完成后，点击 **测试连接** 按钮验证配置是否正确。插件会自动：

- 检测 OceanBase 兼容模式
- 验证连接参数
- 测试基本查询功能

### 2. SQL 查询

在 **原生查询** 模式下，可以使用对应兼容模式的 SQL 语法：

**MySQL 模式示例：**

```sql
SELECT
    user_id,
    username,
    created_at
FROM users
WHERE created_at >= '2024-01-01'
ORDER BY created_at DESC
LIMIT 100;
```

**Oracle 模式示例：**

```sql
SELECT
    user_id,
    username,
    created_at
FROM users
WHERE created_at >= DATE '2024-01-01'
ORDER BY created_at DESC
FETCH FIRST 100 ROWS ONLY;
```

------

## ❓ 常见问题与解决方案

### Q1: 连接失败，提示 "Unknown database"？

**A1: 解决方法**

1. 确认数据库名称是否正确
2. 检查用户是否有访问该数据库的权限
3. 验证 OceanBase 服务是否正常运行

```sql
-- 检查数据库是否存在
SHOW DATABASES;

-- 检查用户权限
SHOW GRANTS FOR 'your_username'@'%';
```

------

### Q2: 查询执行缓慢或超时？

**A2: 解决方法**

1. 调整连接超时参数：

   ```properties
   connectTimeout=60000
   socketTimeout=60000
   ```

2. 优化查询语句，添加适当的索引
3. 检查 OceanBase 服务器性能

------

## 🛠️ 贡献与反馈

欢迎贡献代码，帮助完善插件功能。

------

## 📄 授权协议

本项目采用 Apache License 2.0 协议开源。

------

通过本插件，Metabase 可以无缝连接 OceanBase 数据库，实现高效的数据分析和可视化功能。
