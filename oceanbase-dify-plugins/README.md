# OceanBase Database Tools for Dify

A simple OceanBase database plugin that enables secure SQL query execution on OceanBase databases through Dify applications.

## 🌟 Features

### Database Operations
- **Execute SQL Statements**: Run any SQL command including SELECT, INSERT, UPDATE, DELETE, SHOW, DESCRIBE, CALL, etc.
- **Smart Result Formatting**: Automatically formats query results for better readability
- **Comprehensive Error Handling**: Provides detailed error messages for troubleshooting

## 🚀 Quick Start

### 1. Installation
1. Install the plugin in your Dify environment
2. Configure your OceanBase connection credentials
3. Start using the SQL execution tool in your Dify applications

### 2. Configuration
Configure the following connection parameters:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| ob_host | text-input | Yes | localhost | OceanBase server address |
| ob_port | text-input | Yes | 2881 | OceanBase service port |
| ob_user | text-input | Yes | - | Database username |
| ob_password | secret-input | Yes | - | Database password |
| ob_database | text-input | Yes | - | Database name |

### 3. Usage Examples

#### Execute SQL Query
```
Execute SQL: SELECT * FROM users LIMIT 10
```

#### Show Tables
```
Execute SQL: SHOW TABLES
```

#### Describe Table Structure
```
Execute SQL: DESCRIBE users
```

#### Insert Data
```
Execute SQL: INSERT INTO users (name, email) VALUES ('John', 'john@example.com')
```

## 🛠️ Available Tools

### Execute SQL
Execute SQL statements on OceanBase database with comprehensive error handling and result formatting.

**Parameters:**
- `sql` (string, required): The SQL statement to execute

**Supported SQL Types:**
- SELECT queries with formatted results
- INSERT, UPDATE, DELETE operations
- SHOW commands (TABLES, COLUMNS, etc.)
- DESCRIBE table structure
- CALL stored procedures
- CREATE, ALTER, DROP DDL statements

## 🔧 Development

### Project Structure
```
oceanbase-dify-plugins/
├── main.py                          # Plugin entry point
├── manifest.yaml                    # Plugin metadata
├── requirements.txt                 # Python dependencies
├── provider/
│   ├── oceanbase-dify-plugins.yaml  # Provider configuration
│   └── oceanbase-dify-plugins.py    # Provider implementation
└── tools/
    ├── execute_sql.yaml             # SQL execution tool config
    └── execute_sql.py               # SQL execution tool implementation
```

### Local Development
1. Clone the repository
2. Install dependencies: `pip install -r requirements.txt`
3. Configure environment variables
4. Run locally: `python -m main`

## 🔒 Security

- All database credentials are securely stored and encrypted
- SQL injection protection through parameterized queries
- Connection validation before tool execution
- No sensitive data logging

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions:
- Check the documentation
- Review the troubleshooting guide

## 🔗 Related Projects

- OceanBase MCP Server - The underlying MCP server implementation
- Dify Plugin SDK - Dify plugin development framework