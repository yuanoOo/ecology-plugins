# OceanBase Compatibility Plugin for WordPress

OceanBase Compatibility Plugin for WordPress

OceanBase is a high-performance database compatible with the MySQL protocol. In real-world usage with WordPress, there are rare cases where certain queries may fail to execute properly. This plugin is specifically designed for OceanBase MySQL tenant databases, automatically detecting and fixing compatibility issues between WordPress and OceanBase MySQL tenants to ensure WordPress runs smoothly on OceanBase.

## Currently Resolved Issues

1.   **"multiple aliases to same table not supported" error:** OceanBase currently does not support using multiple aliases for the same table in a single SQL query for delete/update operations.

## Features

- Automatically intercepts and rewrites incompatible SQL queries
- Ensures compatibility for WordPress and popular plugins on OceanBase
- No need to modify WordPress core or plugin code—just activate and it works

## Installation

### Install via WordPress Plugin Directory

If this plugin is available in the WordPress Plugin Directory, you can simply search for "oceanbase-compatibility" in your WordPress admin dashboard and install it directly.

### Manual Installation

1.   **Download the Plugin:** Download the plugin package from https://github.com/oceanbase/ecology-plugins.git.
2.   **Upload the Plugin:** Use your hosting control panel (such as cPanel) or an FTP client to upload the `ecology-plugins/wordpress-oceanbase-plugin` directory to the `wp-content/plugins` directory.
3.   **Activate the Plugin:** Log in to your WordPress admin area, go to "Plugins," find the newly uploaded plugin, and click "Activate."

## Contributing & Feedback
We welcome issues and pull requests to improve this project. For questions or suggestions, visit [GitHub Issues](https://github.com/ecology-plugins/issues).

------

## 📄 License

This project is licensed under the [Apache License 2.0](https://github.com/ecology-plugins/LICENSE).