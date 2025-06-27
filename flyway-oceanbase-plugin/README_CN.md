# Flyway-oceanbase-plugin

## 项目简介

本项目旨在解决开发者在 **OceanBase 的 MySQL 模式** 下使用 **Flyway** 进行数据库迁移时遇到的问题，同时支持 **OceanBase 的 Oracle 模式下的数据库迁移**。

------

## ✅ 已解决的问题

| 问题               | 描述                                               | 解决方案                                                     |
| ------------------ | -------------------------------------------------- | ------------------------------------------------------------ |
| `version` 字段冲突 | R 脚本首次插入失败，因为 `version` 字段为 `NULL`。 | 自动修改 `flyway_schema_history` 表结构，允许 `version VARCHAR(50) NULL`。 |
| 基线配置缺失       | Flyway 无法识别已有数据库。                        | 设置 `baseline-on-migrate=true` 和 `baseline-version=1.0`。  |
| 驱动兼容性         | 使用原生 MySQL 驱动。                              | 替换为 OceanBase 专用驱动 `flyway-database-oceanbase-10.16.1.jar`。 |
| Oracle 模式支持    | Oracle 模式需要特殊处理。                          | 使用 OceanBase 专用驱动 `flyway-database-oceanbase-10.16.1.jar`。 |

**注意**：`flyway-database-oceanbase-10.16.1.jar` 是基于插件打包的专用驱动。

------

## 🛠️ 功能特点

- ✅ **自动修复表结构**：
  检测并修改 `flyway_schema_history` 表的 `version` 字段为 `NULL`。
- ✅ **基线配置**：
  通过 `baseline-on-migrate=true` 和 `baseline-version=1.0` 确保已有数据库的兼容性。
- ✅ **OceanBase 驱动集成**：
  使用自定义的 Flyway 驱动包 (`flyway-database-oceanbase-10.16.1.jar`)，优化 OceanBase 的事务管理和元数据查询兼容性。
- ✅ **无需修改代码**：
  直接适配现有 Flyway 脚本和配置，开箱即用。

------

## 📦 安装与配置

### 📌 前置条件

- Flyway 版本 ≥ **10.8.1**
- Java 17 或更高版本

------

### 🛠️ 配置步骤

#### 1. 修改 `flyway_schema_history` 表结构

确保 `version` 字段允许 `NULL`：

```sql
-- 如果表不存在，创建表
CREATE TABLE flyway_schema_history (
    installed_rank INT NOT NULL,
    version VARCHAR(50) NULL,  -- ✅ 允许 NULL
    description VARCHAR(200) NOT NULL,
    type VARCHAR(20) NOT NULL,
    script VARCHAR(1000) NOT NULL,
    checksum INT,
    installed_by VARCHAR(100) NOT NULL,
    installed_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    execution_time INT NOT NULL,
    success BOOLEAN NOT NULL,
    PRIMARY KEY (installed_rank)
) ENGINE=InnoDB;

-- 如果表已存在，修改字段
ALTER TABLE flyway_schema_history MODIFY version VARCHAR(50) NULL;
```

> ⚠️ **重要提示**：
>
> - **Oracle 模式下无需修改**，因为 `flyway_schema_history` 由 `flyway-core` 自动创建。
> - **MySQL 模式下**，如果使用 R 脚本，需确保 `version` 字段为 `NULL`。

#### 2. 配置 Flyway 参数

在 `application.properties` 或 `application.yml` 中添加以下配置：

```properties
# application.properties
spring.flyway.baseline-on-migrate=true
spring.flyway.baseline-version=1.0
```

```yaml
# application.yml
spring:
  flyway:
    baseline-on-migrate: true
    baseline-version: 1.0
```

#### 3. 替换 Flyway 驱动

在 `pom.xml` 中替换为 OceanBase 专用驱动：

```xml
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-database-oceanbase</artifactId>
    <version>10.16.1</version>
    <scope>system</scope>
    <systemPath>${project.basedir}/src/main/resources/lib/flyway-database-oceanbase-10.16.1.jar</systemPath>
</dependency>
```

> 📁 将 `flyway-database-oceanbase-10.16.1.jar` 放入 `src/main/resources/lib/` 目录。

#### 4. 数据库连接配置

配置 OceanBase MySQL 模式连接：

```properties
# application.properties
spring.datasource.url=jdbc:oceanbase://<host>:<port>/<database>?obcompatibility=MYSQL
spring.datasource.username=<user>
spring.datasource.password=<password>
spring.flyway.enabled=true
```

```yaml
# application.yml
spring:
  datasource:
    url: jdbc:oceanbase://<host>:<port>/<database>?obcompatibility=MYSQL
    username: <user>
    password: <password>
  flyway:
    enabled: true
```

> 📌 **参数说明**：
>
> - `obcompatibility=MYSQL`：启用 OceanBase 的 MySQL 模式。
> - `spring.flyway.enabled=true`：启用 Flyway 自动迁移。

------

## 🧪 示例迁移脚本

### 1. 版本化迁移脚本（V 开头）

```sql
-- V1__create_users_table.sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NULL
);
```

### 2. 可重复迁移脚本（R 开头）

```sql
-- R__refresh_views.sql
CREATE OR REPLACE VIEW user_summary AS
SELECT id, name FROM users;
```

------

## ❓ 常见问题与解决方案

### Q1: 执行 R 脚本时报错 `Cannot insert NULL into column 'version'`？

**A1: 解决方法**

1. 确保flyway_schema_history表的version字段允许NULL：

   ```sql
   ALTER TABLE flyway_schema_history MODIFY version VARCHAR(50) NULL;
   ```

2. 设置 `baseline-on-migrate` 和 `baseline-version` 参数。

------

### Q2: 如何验证 Flyway 是否正常运行？

**A2: 执行以下命令查看迁移状态：**

```bash
./flyway info -X -configFiles=conf/my.conf
```

------

## 📁 项目结构示例

```
your-project/
├── src/
│   └── main/
│       ├── resources/
│       │   ├── db/migration/
│       │   │   ├── V1__create_users_table.sql
│       │   │   └── R__refresh_views.sql
│       │   └── lib/
│       │       └── flyway-database-oceanbase-10.16.1.jar
│       └── application.properties
├── pom.xml
└── README.md
```

------

## 📚 参考资料

- [Flyway 官方文档](https://flywaydb.org/)
- [OceanBase 官方文档](https://help.oceanbase.com/)
- [Flyway 与 OceanBase 适配 PR](https://github.com/flyway/flyway-community-db-support/pull/60)

------

## 🛠️ 贡献与反馈

欢迎提交 Issues 或 Pull Request，帮助完善插件功能。

- [GitHub Issues](https://github.com/oceanbase/ecology-plugins/issues).

  ------

## 📄 授权协议

本项目采用 [Apache License 2.0](https://github.com/oceanbase/ecology-plugins/LICENSE) 协议开源。

------

通过本插件，Flyway 可在 OceanBase 的 MySQL 模式下正常运行，解决 R 脚本首次执行失败的问题，并支持 Oracle 模式的数据库迁移。