# trino-oceanbase-plugin

## 插件构建

### 构建要求

- Java 17.0.4+（64位）

从项目根目录运行以下命令进行构建：

```shell
./mvnw clean package -DskipTests
```

构建完成后，插件文件应位于 `target` 目录下。

------

## 使用 Docker 运行插件

### 启动 Trino 容器

首先启动一个 Trino Docker 容器：

```shell
docker run --name trino -d trinodb/trino:468
```

------

### 创建配置文件

#### 1. 日志配置文件 `log.properties`

```tex
io.trino=DEBUG
```

#### 2. OceanBase 连接器配置文件 `oceanbase.properties`

```properties
connector.name=oceanbase
connection-url=jdbc:oceanbase://localhost:2883/${ENV:USER}
connection-user=${ENV:USERNAME}
connection-password=${ENV:PASSWORD}
oceanbase.compatible-mode=oracle
oceanbase.auto-reconnect=true
oceanbase.remarks-reporting.enabled=true
decimal-mapping=ALLOW_OVERFLOW
decimal-rounding-mode=HALF_UP
```

> ⚠️ 注意：
>
> - `${ENV:USER}`、`${ENV:USERNAME}` 和 `${ENV:PASSWORD}` 会被环境变量替换。
> - `oceanbase.compatible-mode=oracle` 表示启用 Oracle 模式兼容性。

------

### 将插件与配置文件部署到容器中

执行以下命令将插件和配置文件复制到容器，并重启容器：

```shell
# 添加插件文件
docker cp target/trino-oceanbase-468.jar trino:/data/trino/plugin/oceanbase/

# 添加日志配置文件
docker cp log.properties trino:/etc/trino/

# 添加 OceanBase 目录配置文件
docker cp oceanbase.properties trino:/etc/trino/catalog/

# 添加时区文件（设置容器时区为上海）
docker cp /usr/share/zoneinfo trino:/usr/share/zoneinfo
docker cp /usr/share/zoneinfo/Asia/Shanghai trino:/etc/localtime

# 重启容器
docker restart trino
```

------

### 验证插件是否生效

通过 Trino CLI 执行查询验证插件是否正常工作：

```shell
# 进入容器并启动 Trino CLI
docker exec -it trino trino
```

```sql
-- 查看可用的 Catalog 列表
SHOW CATALOGS;
```

如果输出中包含 `oceanbase`，则表示插件已成功加载。

------

## 配置说明

### OceanBase 连接器参数详解

全屏复制

| 配置项                                | 说明                                            |
| ------------------------------------- | ----------------------------------------------- |
| `connector.name`                      | 指定连接器类型为 OceanBase                      |
| `connection-url`                      | OceanBase 数据库连接地址（支持环境变量替换）    |
| `connection-user`                     | 数据库用户名                                    |
| `connection-password`                 | 数据库密码                                      |
| `oceanbase.compatible-mode`           | 兼容模式（`oracle` 或 `mysql`）                 |
| `oceanbase.auto-reconnect`            | 是否启用自动重连                                |
| `oceanbase.remarks-reporting.enabled` | 是否启用注释报告功能                            |
| `decimal-mapping`                     | 十进制映射策略（`ALLOW_OVERFLOW` 表示允许溢出） |
| `decimal-rounding-mode`               | 十进制四舍五入模式（`HALF_UP` 表示四舍五入）    |

------

## 常见问题

### Q1: 插件未加载，提示 `Catalog not found`？

**A1: 解决方法**

1. 确认插件文件已正确复制到 `/data/trino/plugin/oceanbase/` 目录。
2. 检查 `oceanbase.properties` 文件是否已放入 `/etc/trino/catalog/` 目录。
3. 确保容器时区文件已正确设置（避免因时区问题导致连接失败）。

------

### Q2: 连接 OceanBase 时报错 `Connection refused`？

**A2: 解决方法**

1. 确认 OceanBase 服务已启动并监听 `2883` 端口。
2. 检查 `connection-url` 中的主机地址和端口是否正确。
3. 确保 OceanBase 用户权限允许远程连接。

------

## 项目结构示例

```
project-root/
├── log.properties
├── oceanbase.properties
├── target/
│   └── trino-oceanbase-468.jar
└── README.md
```

------

## 🛠️ 贡献与反馈

欢迎提交 Issues 或 Pull Request，帮助完善插件功能。

- [GitHub Issues](https://github.com/oceanbase/ecology-plugins/issues).

  ------

## 📄 授权协议

本项目采用 [Apache License 2.0](https://github.com/oceanbase/ecology-plugins/LICENSE) 协议开源。

------

通过本插件，Trino 可以直接连接 OceanBase 数据库（支持 Oracle/MySQL 模式），实现高效的数据查询与分析。