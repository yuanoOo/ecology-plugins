# Metabase OceanBase Plugin

## Project Overview

The Metabase OceanBase Plugin is specifically designed for integrating **Metabase** with **OceanBase** databases. This plugin supports both MySQL and Oracle compatibility modes of OceanBase, automatically detects database compatibility modes, and adapts corresponding SQL syntax.

------

## ✅ Issues Resolved

| Issue               | Description                                               | Solution                                                     |
| ------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| Compatibility Mode Detection | Metabase cannot automatically identify OceanBase's compatibility mode. | Automatically detect compatibility mode via `SHOW VARIABLES LIKE 'ob_compatibility_mode'`. |
| SQL Syntax Adaptation | SQL syntax differences between compatibility modes cause query failures. | Automatically select appropriate SQL syntax and functions based on detected compatibility mode. |
| Metadata Sync       | Unable to correctly retrieve OceanBase table structure and field information. | Implement metadata query logic for both MySQL and Oracle modes. |
| Connection Parameter Config | Missing OceanBase-specific connection parameters and configuration options. | Provide complete OceanBase connection parameter configuration including timeout, reconnection, etc. |
| Data Type Mapping   | OceanBase-specific data types cannot be correctly mapped to Metabase. | Implement complete data type mapping table supporting MySQL and Oracle modes. |

------

## 🛠️ Features

- ✅ **Automatic Compatibility Mode Detection**：Automatically identify OceanBase's MySQL or Oracle compatibility mode by querying `ob_compatibility_mode` variable.
- ✅ **Dual-Mode SQL Adaptation**：Automatically select appropriate SQL syntax, functions, and query methods based on detected compatibility mode.
- ✅ **Complete Metadata Support**：Support correct retrieval and synchronization of table structure, field information, indexes, constraints, and other metadata.
- ✅ **Data Type Mapping**：Complete support for all data type mappings in OceanBase MySQL and Oracle modes.

------

## 📦 Installation & Configuration

### 📌 Prerequisites

- Metabase version ≥ **0.48.0**
- Java 11 or higher
- OceanBase version ≥ **3.1.0**

### 🛠️ Installation Steps

#### 1. Download Plugin

The Metabase OceanBase plugin is included in this repository. Navigate to the plugin directory:

```bash
cd metabase-oceanbase-plugin
```

#### 2. Build Plugin

```bash
# Build all drivers
./bin/build-drivers.sh

# Or build only OceanBase driver
cd modules/drivers/oceanbase
clojure -M:build
```

#### 3. Deploy Plugin

Copy the built plugin file to Metabase's plugin directory:

```bash
# Copy plugin to Metabase plugin directory
cp modules/drivers/oceanbase/target/metabase-driver-oceanbase.jar /path/to/metabase/plugins/
```

#### 4. Run Metabase with Docker

Start Metabase container:

```bash
docker run -d -p 3000:3000 --name metabase metabase/metabase
```

Copy plugin to container:

```bash
docker cp /path/to/oceanbase.metabase-driver.jar metabase:/plugins
```

Restart container to load plugin:

```bash
docker restart metabase
```

------

### 🔧 Database Connection Configuration

#### 1. Add Database in Metabase

1. Log in to Metabase admin interface
2. Go to **Admin** → **Databases**
3. Click **Add Database**
4. Select **OceanBase** as database type

#### 2. Configure Connection Parameters

| Parameter Name     | Description                           | Example Value     |
| ------------------ | ------------------------------------- | ----------------- |
| **Host**     | OceanBase server address              | `localhost`     |
| **Port**     | OceanBase service port (default 2881) | `2881`          |
| **Database** | Database name to connect to           | `your_database` |
| **Username** | Database username                     | `your_username` |
| **Password** | Database password                     | `your_password` |

------

## 🧪 Usage Examples

### 1. Connection Test

After configuration, click the **Test Connection** button to verify if the configuration is correct. The plugin will automatically:

- Detect OceanBase compatibility mode
- Verify connection parameters
- Test basic query functionality

### 2. SQL Queries

In **Native Query** mode, you can use SQL syntax corresponding to the compatibility mode:

**MySQL Mode Example:**

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

**Oracle Mode Example:**

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

## ❓ FAQ & Troubleshooting

### Q1: Connection failed with "Unknown database" error?

**A1: Solution**

1. Confirm the database name is correct
2. Check if the user has permission to access the database
3. Verify OceanBase service is running normally

```sql
-- Check if database exists
SHOW DATABASES;

-- Check user permissions
SHOW GRANTS FOR 'your_username'@'%';
```

------

### Q2: Queries are slow or timeout?

**A2: Solution**

1. Adjust connection timeout parameters:

   ```properties
   connectTimeout=60000
   socketTimeout=60000
   ```

2. Optimize query statements and add appropriate indexes
3. Check OceanBase server performance

------

## 🛠️ Contributing & Feedback

We welcome contributions to help improve plugin functionality.

------

## 📄 License

This project is licensed under the Apache License 2.0.

------

Through this plugin, Metabase can seamlessly connect to OceanBase databases, achieving efficient data analysis and visualization functionality.
