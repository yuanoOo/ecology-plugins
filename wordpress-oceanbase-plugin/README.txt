===OceanBase Compatibility ===
Contributors: sc-source
Tags: oceanbase, database, sql
Requires at least: 5.2
Tested up to: 6.8
Stable tag: 1.0.1
Requires PHP: 7.2
License: Apache License Version 2.0
License URI: http://www.apache.org/licenses/LICENSE-2.0

This plugin is an official tool provided by OceanBase, designed to solve compatibility issues between OceanBase and WordPress.

== Description ==

OceanBase is a high-performance database compatible with the MySQL protocol.         This plugin is specifically designed for OceanBase MySQL tenant databases, automatically detecting and fixing compatibility issues between WordPress and OceanBase MySQL tenants to ensure WordPress runs smoothly on OceanBase.

## Currently Resolved Issues

1.          **"multiple aliases to same table not supported" error:** OceanBase MySQL tenant currently does not support using multiple aliases for the same table in a single SQL query for delete/update operations.


== Contribute ==

Contribute to this plugin on [https://github.com/oceanbase/ecology-plugins/tree/main/wordpress-oceanbase-plugin]

== Changelog ==

= 1.0.1 =

* Update README, tags and compatibility info
