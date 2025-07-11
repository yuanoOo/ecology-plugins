-- 测试多词关键词功能
-- 这个文件用于测试 OceanBase SQL Keywords Helper 插件的多词关键词支持

-- 1. ALTER 系列关键词
ALTER TABLE users ADD COLUMN email VARCHAR(255);
ALTER OUTLINE outline_name ON table_name;
ALTER EXTERNAL TABLE external_table_name;
ALTER MATERIALIZED VIEW mv_name;
ALTER MATERIALIZED VIEW LOG log_name;
ALTER SEQUENCE seq_name;
ALTER SYSTEM SET parameter_name = 'value';
ALTER TABLEGROUP tg_name;
ALTER TABLESPACE ts_name;
ALTER USER username;
ALTER VIEW view_name;

-- 2. CREATE 系列关键词
CREATE DATABASE test_db;
CREATE INDEX idx_name ON table_name(column_name);
CREATE MATERIALIZED VIEW mv_name AS SELECT * FROM table_name;
CREATE MATERIALIZED VIEW LOG ON table_name;
CREATE OUTLINE outline_name ON table_name;
CREATE RESTORE POINT rp_name;
CREATE ROLE role_name;
CREATE SEQUENCE seq_name;
CREATE TABLE test_table (id INT, name VARCHAR(100));
CREATE TABLEGROUP tg_name;
CREATE TABLESPACE ts_name;
CREATE USER username;
CREATE VIEW view_name AS SELECT * FROM table_name;

-- 3. DROP 系列关键词
DROP DATABASE test_db;
DROP INDEX idx_name;
DROP MATERIALIZED VIEW mv_name;
DROP MATERIALIZED VIEW LOG log_name;
DROP OUTLINE outline_name;
DROP ROLE role_name;
DROP TABLE test_table;
DROP TABLEGROUP tg_name;
DROP TABLESPACE ts_name;
DROP SEQUENCE seq_name;
DROP USER username;
DROP VIEW view_name;
DROP RESTORE POINT rp_name;

-- 4. 其他多词关键词
CACHE INDEX table_name;
LOAD DATA INFILE 'data.txt' INTO TABLE table_name;
LOAD INDEX INTO CACHE table_name;
LOCK TABLES table_name READ;
UNLOCK TABLES;
PURGE RECYCLEBIN;
RENAME USER old_name TO new_name;
SET CATALOG catalog_name;
SET CHARSET charset_name;
SET NAMES charset_name;
SET PASSWORD FOR user = 'new_password';
SET ROLE role_name;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SHOW JOB STATUS;
SUBMIT JOB job_name;
CANCEL JOB job_name;
TRUNCATE TABLE table_name;

-- 5. 单个关键词测试
SELECT * FROM users;
INSERT INTO users VALUES (1, 'test');
UPDATE users SET name = 'new_name' WHERE id = 1;
DELETE FROM users WHERE id = 1;
DESCRIBE users;
EXPLAIN SELECT * FROM users;
FLASHBACK TABLE users TO BEFORE DROP;
GRANT SELECT ON users TO user1;
HELP 'SELECT';
KILL CONNECTION 123;
OPTIMIZE TABLE users;
PREPARE stmt FROM 'SELECT * FROM users';
PURGE TABLE users;
REPLACE INTO users VALUES (1, 'test');
REVOKE SELECT ON users FROM user1;
SAVEPOINT sp1;
SHOW TABLES;
TRANSACTION;
USE test_db;
VALUES (1, 'test'), (2, 'test2');
XA START 'transaction_id'; 