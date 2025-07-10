# OceanBase SQL Keywords Documentation Helper

A VSCode extension that helps developers quickly find OceanBase SQL keywords documentation.

<main id="notice" type="notice">
<h4>Note</h4>
<p>This extension only supports <strong>VSCode 1.101.0 and above</strong>. Please ensure your VSCode is upgraded to May 2025 or later.</p>
</main>

## ✅ Implemented Features

- **🔍 Smart Keyword Recognition**: Supports single keywords and multi-word keywords (such as `ALTER OUTLINE`, `ALTER EXTERNAL TABLE`)
- **🖱️ Hover Tooltips**: Hover over keywords to display description information
- **🖱️ Double-click Navigation**: Double-click keywords to directly jump to corresponding documentation
- **📖 CodeLens Links**: Display "📖 View Documentation" links above keywords, click to jump
- **🔄 Hot Reload Configuration**: Automatically takes effect after modifying `keywords.json` file
- **⚙️ Custom Keywords**: Supports user-defined keywords and documentation links

## 🚀 Installation

1. Search and install this extension in the VSCode extension marketplace, or download the `.vsix` package and install it with the following command:

   ```bash
   code --install-extension oceanbase-sql-keywords-helper-*.vsix
   ```

2. Restart VSCode after installation.

## 📖 Usage Instructions

1. Open or create a `.sql` file, ensure the language mode in the bottom right corner is SQL.
2. Hover over OceanBase SQL keywords to view descriptions.
3. Double-click keywords to directly jump to official documentation.
4. "📖 View Documentation" links will appear above keywords, click to access detailed documentation.

## 🔧 Supported Keyword Types

- Single keywords: such as `SELECT`, `INSERT`, `UPDATE`, `DELETE`, etc.
- Multi-word keywords: such as `ALTER OUTLINE`, `CREATE MATERIALIZED VIEW`, etc.
- Case-insensitive

## ❓ Common Issues

- **Extension not working?**
  - Please confirm VSCode version is 1.101.0 or above.
  - Confirm the SQL file language mode is correct.
  - Restart VSCode if you encounter issues.

- **How to customize keywords?**
  - Only source code developers can customize, regular users cannot directly modify keywords.

- **Extension errors or invalid navigation?**
  - Please ensure network connectivity, or report to the extension repository.

## 💬 Feedback and Support

For suggestions, issues, or requirements, please leave a message in the extension marketplace or submit an Issue through GitHub.

## 📄 License

Apache License 2.0

## 🔗 Related Links

- [OceanBase Official Documentation](https://www.oceanbase.com/docs)
- [GitHub Repository](https://github.com/oceanbase/ecology-plugins/tree/main/oceanbase-sql-helper-plugin) 