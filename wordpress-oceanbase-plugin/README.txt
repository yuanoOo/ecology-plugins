=== OceanBase Compatibility ===
Contributors: laochou
Tags: oceanbase, database, sql
Requires at least: 6.1
Tested up to: 6.8
Stable tag: 1.0.1
Requires PHP: 7.2
License: Apache License Version 2.0
License URI: http://www.apache.org/licenses/LICENSE-2.0

This plugin is an official tool provided by OceanBase, designed to solve compatibility issues between OceanBase and WordPress.

== Description ==

OceanBase is a high-performance database compatible with the MySQL protocol. 

When running WordPress on OceanBase database, you may encounter the following database error:

`WordPress database error: [multiple aliases to same table not supported]`

This error occurs when WordPress attempts to execute DELETE queries that use multiple table aliases for the same table, which OceanBase does not support. The problematic queries typically look like:

```sql
DELETE a, b FROM wp_options a, wp_options b WHERE a.option_name LIKE '_transient_%' 
AND a.option_name NOT LIKE '_transient_timeout_%' 
AND b.option_name = CONCAT('_transient_timeout_', SUBSTRING( a.option_name, 12)) 
AND b.option_value < 1724379418
```

```sql
DELETE a, b FROM wp_options a, wp_options b WHERE a.option_name LIKE '_site_transient_%' 
AND a.option_name NOT LIKE '_site_transient_timeout_%' 
AND b.option_name = CONCAT('_site_transient_timeout_', SUBSTRING( a.option_name, 17)) 
AND b.option_value < 1724379418
```

These queries are used by WordPress to clean up expired transient data, but they fail on OceanBase due to the "multiple aliases to same table not supported" limitation.

This plugin will automatically intercept these problematic DELETE queries and rewrite them to be compatible with OceanBase. This ensures that WordPress functions normally on OceanBase without requiring any code changes to WordPress core or other plugins.

== Screenshots ==



== Changelog ==

= 1.0.1 =