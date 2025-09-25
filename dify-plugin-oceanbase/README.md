# OceanBase Dify Plugin

## 🔗 Repository Address

**GitHub**: https://github.com/oceanbase/dify-plugin-oceanbase

## 📖 Project Description

This is a Dify plugin for connecting to and querying OceanBase databases.

## 🌟 Features

### Tools Introduction

#### 1. Execute SQL

- **Function**: Execute SQL queries on existing OceanBase databases
- **Usage**: Directly execute SQL statements starting with SELECT, SHOW, or WITH
- **Output Format**: Supports multiple formats including JSON, CSV, YAML, Markdown, Excel, HTML, etc.
- **Security Restrictions**: Only supports query statements to ensure database security

#### 2. Get Table Schema

- **Function**: Get table structure information from the database
- **Usage**: Provide database context for LLM to help understand table structure
- **Flexibility**: Can specify specific tables or get structure information for all tables
- **Use Cases**: Understand database structure before generating SQL queries

#### 3. Text to SQL

- **Function**: Use LLM to convert natural language queries into SQL statements
- **Usage**: Allow users to describe query requirements in natural language and automatically generate corresponding SQL
- **Intelligence**: Generate accurate SQL based on database context and table structure information
- **Model Selection**: Support selecting different large language models for conversion

## 🚀 Usage Instructions

1. **Database Connection**: Configure OceanBase database connection information
2. **Select Tools**: Choose appropriate tools based on requirements
3. **Execute Queries**: Query data through natural language or direct SQL
4. **Get Results**: Obtain query results in specified format

## ⚠️ Notes

- This plugin only supports query operations and does not support data modification
- It is recommended to use read-only database accounts to ensure security
- Supports multiple output formats that can be selected as needed

## 📝 License

This project is licensed under the Apache-2.0 License.

## 🤝 Contributing

Please visit the repository to contribute: https://github.com/oceanbase/dify-plugin-oceanbase

## 📞 Support

For issues and questions, please submit an Issue in the repository: https://github.com/oceanbase/dify-plugin-oceanbase/issues
