# Flyway Compatibility Plugin for OceanBase MySQL Mode

Flyway Compatibility Plugin for OceanBase MySQL Mode

Flyway is a powerful database migration tool, but when used with OceanBase in MySQL mode, certain issues may arise due to differences in SQL syntax and table constraints. This plugin automatically detects and resolves compatibility issues between Flyway and OceanBase MySQL tenants, ensuring smooth database migrations and avoiding errors like `Cannot insert NULL into column 'version'`.

---

## 🧩 项目简介

本项目旨在指导开发者在 **OceanBase 的 MySQL 模式** 下正确使用 **Flyway** 进行数据库迁移，解决因字段约束差异导致的 `R` 开头重复迁移脚本首次执行失败的问题。

---

## 🚨 问题背景

在 OceanBase 的 MySQL 模式下使用 Flyway 的 **Repeatable Migration（R 脚本）** 时，首次执行会触发以下错误：

ERROR: Cannot insert NULL into column 'version' of table 'flyway_schema_history'

### ✅ 原因分析

- **Flyway R 脚本**：首次执行时会向 `flyway_schema_history` 表插入一条记录，其 `version` 字段为 `NULL`。
- **OceanBase MySQL 模式限制**：
   - 默认情况下，OceanBase 对未显式声明 `NULL/NOT NULL` 的字段默认设置为 `NOT NULL`。
   - Flyway 的默认建表语句未显式声明 `version` 字段允许 `NULL`，导致插入失败。

---

## ✅ 已解决的问题

| 问题 | 描述 | 解决方案 |
|------|------|----------|
| `version` 字段冲突 | R 脚本首次插入失败 | 自动修改 `flyway_schema_history` 表结构，允许 `version` 为 `NULL` |
| 基线配置缺失 | 未识别已有数据库 | 设置 `baseline-on-migrate=true` 和 `baseline-version=1.0` |
| 驱动兼容性 | 使用原生 MySQL 驱动 | 替换为 OceanBase 专用驱动 `flyway-database-oceanbase-10.16.1.jar` |

---

## 🛠️ 功能特点

- ✅ **自动修复表结构**：  
  检测并修改 `flyway_schema_history` 表的 `version` 字段为 `NULL`。
- ✅ **基线配置**：  
  通过 `baseline-on-migrate=true` 和 `baseline-version=1.0` 确保已有数据库兼容性。
- ✅ **OceanBase 驱动集成**：  
  使用适配 OceanBase 的 Flyway 驱动包，解决事务管理和元数据查询的兼容性问题。
- ✅ **无需修改代码**：  
  直接适配现有 Flyway 脚本和配置，开箱即用。

---

## 📦 安装与配置

### 📌 前置条件

- OceanBase 版本 ≥ **3.1.0**（MySQL 模式启用）
- Flyway 版本 ≥ **10.8.1**
- Java 8 或更高版本

---

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
#### 2. 配置 Flyway 参数
在 application.properties 或 application.yml 中添加以下配置：
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
3. 替换 Flyway 驱动
   在 pom.xml 中替换为 OceanBase 专用驱动：
```xml
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-database-oceanbase</artifactId>
    <version>10.16.1</version>
    <scope>system</scope>
    <systemPath>${project.basedir}/src/main/resources/lib/flyway-database-oceanbase-10.16.1.jar</systemPath>
</dependency>
```
将 flyway-database-oceanbase-10.16.1.jar 放入 src/main/resources/lib/ 目录。
4. 数据库连接配置
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
