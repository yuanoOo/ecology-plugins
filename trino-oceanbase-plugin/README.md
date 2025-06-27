# trino-oceanbase-plugin

## Plugin Overview

This plugin enables **Trino** to connect and query **OceanBase** databases in both **MySQL** and **Oracle modes**. It provides compatibility with OceanBase's SQL syntax, decimal handling, and connection management.

------

## Building the Plugin

### Prerequisites

- Java 17.0.4+ (64-bit)

Run the following command from the project root directory:

```shell
./mvnw clean package -DskipTests
```

The plugin JAR file will be generated in the `target` directory.

------

## Running with Docker

### Step 1: Start a Trino Docker Container

```shell
docker run --name trino -d trinodb/trino:468
```

------

### Step 2: Create Configuration Files

#### 1. `log.properties`

```text
io.trino=DEBUG
```

#### 2. `oceanbase.properties`

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

> ⚠️ **Notes**:
>
> - `${ENV:USER}`, `${ENV:USERNAME}`, and `${ENV:PASSWORD}` are environment variables.
> - `oceanbase.compatible-mode=oracle` specifies the Oracle mode compatibility.

------

### Step 3: Deploy Plugin and Config Files to Container

Execute the following commands to copy files to the container and restart it:

```shell
# Add plugin file
docker cp target/trino-oceanbase-468.jar trino:/data/trino/plugin/oceanbase/

# Add log configuration file
docker cp log.properties trino:/etc/trino/

# Add OceanBase catalog configuration file
docker cp oceanbase.properties trino:/etc/trino/catalog/

# Add timezone files (set container timezone to Shanghai)
docker cp /usr/share/zoneinfo trino:/usr/share/zoneinfo
docker cp /usr/share/zoneinfo/Asia/Shanghai trino:/etc/localtime

# Restart container
docker restart trino
```

------

### Step 4: Verify Plugin Functionality

Use the Trino CLI to verify the plugin is working:

```shell
# Enter container and launch Trino CLI
docker exec -it trino trino
```

```sql
-- Check available catalogs
SHOW CATALOGS;
```

If `oceanbase` appears in the output, the plugin is successfully loaded.

------

## Configuration Details

### OceanBase Connector Parameters

| Parameter                             | Description                                                  |
| ------------------------------------- | ------------------------------------------------------------ |
| `connector.name`                      | Specifies the connector type as OceanBase                    |
| `connection-url`                      | OceanBase database connection URL (supports environment variable substitution) |
| `connection-user`                     | Database username                                            |
| `connection-password`                 | Database password                                            |
| `oceanbase.compatible-mode`           | Compatibility mode (`oracle` or `mysql`)                     |
| `oceanbase.auto-reconnect`            | Enables automatic reconnection                               |
| `oceanbase.remarks-reporting.enabled` | Enables remarks reporting                                    |
| `decimal-mapping`                     | Decimal mapping strategy (`ALLOW_OVERFLOW` allows overflow)  |
| `decimal-rounding-mode`               | Decimal rounding mode (`HALF_UP` for standard rounding)      |

------

## Common Issues

### Q1: Plugin not loaded, error: `Catalog not found`?

**A1: Solutions**

1. Confirm the plugin file is correctly copied to `/data/trino/plugin/oceanbase/`.
2. Ensure `oceanbase.properties` is placed in `/etc/trino/catalog/`.
3. Verify the container timezone files are set correctly.

------

### Q2: Connection error: `Connection refused`?

**A2: Solutions**

1. Ensure OceanBase is running and listening on port `2883`.
2. Check the `connection-url` for correct host and port.
3. Validate the user permissions allow remote connections.

------

## Project Structure Example

```
project-root/
├── log.properties
├── oceanbase.properties
├── target/
│   └── trino-oceanbase-468.jar
└── README.md
```

------

## Contributing & Feedback
We welcome issues and pull requests to improve this project. For questions or suggestions, visit [GitHub Issues](https://github.com/oceanbase/ecology-plugins/issues).

------

## 📄 License

This project is licensed under the [Apache License 2.0](https://github.com/oceanbase/ecology-plugins/LICENSE).


------

With this plugin, Trino can seamlessly connect to OceanBase databases (both MySQL and Oracle modes), enabling efficient data querying and analysis.