# Build指南

## 快速开始

### 1. 环境准备
```bash
# 确保Python 3.7+已安装
python --version

# 安装必要的打包工具
pip install build twine wheel
```

### 2. 项目配置检查
确保以下文件存在且配置正确：
- `setup.py` - 包配置和元数据
- `README.md` - 项目说明文档
- `LICENSE` - 许可证文件
- `__init__.py` - 包初始化文件

### 3. 构建分发包
```bash
# 构建源码分发包和wheel分发包
python -m build

# 检查生成的文件
ls dist/
# 应该看到：
# - oceanbase-sqlalchemy-0.2.0.tar.gz (源码包)
# - oceanbase_sqlalchemy-0.2.0-py3-none-any.whl (wheel包)
```

### 4. 验证分发包
```bash
# 检查分发包质量
twine check dist/*

# 本地测试安装
pip install dist/oceanbase_sqlalchemy-0.2.0-py3-none-any.whl
```

### 5. 上传到PyPI

#### 测试PyPI（推荐先使用）
```bash
# 上传到测试PyPI
twine upload --repository testpypi dist/*

# 从测试PyPI安装验证
pip install --index-url https://test.pypi.org/simple/ oceanbase-sqlalchemy
```

#### 正式PyPI
```bash
# 上传到正式PyPI
twine upload dist/*

# 从正式PyPI安装
pip install oceanbase-sqlalchemy
```

## 重要提醒

1. **包名唯一性**：确保包名在PyPI上未被占用
2. **版本管理**：每次发布前更新版本号
3. **测试优先**：建议先发布到测试PyPI进行验证
4. **账号准备**：需要PyPI账号和API令牌

## 常见问题

### Q: 构建失败怎么办？
A: 检查setup.py配置，确保所有依赖都已安装

### Q: 上传失败怎么办？
A: 检查网络连接和PyPI账号权限

### Q: 如何更新已发布的包？
A: 修改版本号后重新构建和上传

## 版本管理建议

- 使用语义化版本号：`主版本.次版本.修订版本`
- 重大变更：主版本号+1
- 新功能：次版本号+1
- 问题修复：修订版本号+1

## 相关链接

- [PyPI官网](https://pypi.org/)
- [测试PyPI](https://test.pypi.org/)
- [Python打包用户指南](https://packaging.python.org/)
