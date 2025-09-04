# OceanBase Ecosystem Plugins Collection

This repository includes multiple plugins designed to resolve compatibility issues between **OceanBase** and various frameworks/tools (such as Flyway, Trino, and WordPress). Each plugin is optimized for specific scenarios to ensure stable and efficient database operations.

------

## 🧩 Project Overview

OceanBase is a high-performance database compatible with both MySQL and Oracle protocols. This repository provides the following plugins to help developers address common compatibility issues in real-world applications:

| Plugin Name                                                  | Use Case           | Key Features                                                 |
| ------------------------------------------------------------ | ------------------ | ------------------------------------------------------------ |
| [Flyway OceanBase Plugin](./flyway-oceanbase-plugin/README.md) | Database Migration | Resolves compatibility issues when using Flyway with OceanBase in MySQL mode |
| [Trino OceanBase Plugin](./trino-oceanbase-plugin/README.md) | Data Analysis      | Enables Trino to connect to OceanBase (MySQL/Oracle mode)    |
| [WordPress OceanBase Plugin](./wordpress-oceanbase-plugin/README.md) | Content Management | Fixes compatibility issues between WordPress and OceanBase MySQL tenants |
| [OceanBase SQL Helper Plugin](./oceanbase-sql-helper-plugin/README.md) | Development Tools  | VSCode extension for quick access to OceanBase SQL keywords documentation |
| [OceanBase SQLAlchemy Plugin](./oceanbase-sqlalchemy-plugin/README.md) | Python ORM         | SQLAlchemy dialect for OceanBase Oracle mode, compatible with SQLAlchemy 1.3+ and 2.0+ |

------

## 📁 Plugin Details

### ✅ Flyway OceanBase MySQL Plugin

- **Function**: Resolves compatibility issues when using Flyway with OceanBase in MySQL mode (e.g., `version` column conflicts, driver compatibility).
- **Use Case**: Managing database migrations for OceanBase MySQL mode using Flyway.
- **Documentation**: [Flyway OceanBase Plugin](./flyway-oceanbase-plugin/README.md)

------

### ✅ Trino OceanBase Plugin

- **Function**: Enables Trino to connect to OceanBase (MySQL/Oracle mode), optimizing SQL queries and transaction handling.
- **Use Case**: Querying OceanBase databases via Trino (supports both modes).
- **Documentation**: [Trino OceanBase Plugin](./trino-oceanbase-plugin/README.md)

------

### ✅ WordPress OceanBase Plugin

- **Function**: Fixes compatibility issues between WordPress and OceanBase MySQL tenants (e.g., table alias restrictions).
- **Use Case**: Ensuring WordPress compatibility when deployed on OceanBase MySQL tenants.
- **Documentation**: [WordPress OceanBase Plugin](./wordpress-oceanbase-plugin/README.md)

------

### ✅ OceanBase SQL Helper Plugin

- **Function**: VSCode extension that provides quick access to OceanBase SQL keywords documentation with hover tooltips and direct navigation.
- **Use Case**: Enhancing developer experience when writing SQL queries for OceanBase databases.
- **Documentation**: [OceanBase SQL Helper Plugin](./oceanbase-sql-helper-plugin/README.md)

------

### ✅ OceanBase SQLAlchemy Plugin

- **Function**: SQLAlchemy dialect for OceanBase Oracle mode, fully compatible with SQLAlchemy 1.3.x and 2.0+, providing optimized SQL queries and constraint reflection.
- **Use Case**: Using Python SQLAlchemy ORM framework to connect and operate OceanBase Oracle mode databases.
- **Documentation**: [OceanBase SQLAlchemy Plugin](./oceanbase-sqlalchemy-plugin/README.md)

------

## 📚 Full Documentation Links

全屏复制

| Plugin Name                | Documentation Link                                           |
| -------------------------- | ------------------------------------------------------------ |
| Flyway OceanBase Plugin    | [Flyway OceanBase Plugin](./flyway-oceanbase-plugin/README.md) |
| Trino OceanBase Plugin     | [Trino OceanBase Plugin](./trino-oceanbase-plugin/README.md) |
| WordPress OceanBase Plugin | [WordPress OceanBase Plugin](./wordpress-oceanbase-plugin/README.md) |
| OceanBase SQL Helper Plugin | [OceanBase SQL Helper Plugin](./oceanbase-sql-helper-plugin/README.md) |
| OceanBase SQLAlchemy Plugin | [OceanBase SQLAlchemy Plugin](./oceanbase-sqlalchemy-plugin/README.md) |

------

## 🛠️ Contributing & Feedback

We welcome contributions via **Issues** or **Pull Requests**.
For questions or suggestions, visit [GitHub Issues](https://github.com/oceanbase/ecology-plugins/issues).

------

## 📄 License

This project is licensed under the [Apache License 2.0](./LICENSE).

------

## 📌 Notes

- For detailed configuration and usage instructions, refer to the respective plugin documentation.
- Ensure OceanBase version compatibility (recommended ≥ 3.1.0).
- Plugins support MySQL/Oracle modes; select the appropriate version based on your environment.