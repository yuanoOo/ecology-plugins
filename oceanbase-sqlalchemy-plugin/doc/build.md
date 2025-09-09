# Build Guide

## Quick Start

### 1. Environment Setup
```bash
# Ensure Python 3.7+ is installed
python --version

# Install necessary packaging tools
pip install build twine wheel
```

### 2. Project Configuration Check
Ensure the following files exist and are properly configured:
- `setup.py` - Package configuration and metadata
- `README.md` - Project documentation
- `LICENSE` - License file
- `__init__.py` - Package initialization file

### 3. Build Distribution Packages
```bash
# Build source distribution and wheel distribution
python -m build

# Check generated files
ls dist/
# You should see:
# - oceanbase-sqlalchemy-0.2.0.tar.gz (source package)
# - oceanbase_sqlalchemy-0.2.0-py3-none-any.whl (wheel package)
```

### 4. Validate Distribution Packages
```bash
# Check distribution package quality
twine check dist/*

# Local test installation
pip install dist/oceanbase_sqlalchemy-0.2.0-py3-none-any.whl
```

### 5. Upload to PyPI

#### Test PyPI (Recommended first)
```bash
# Upload to Test PyPI
twine upload --repository testpypi dist/*

# Install and verify from Test PyPI
pip install --index-url https://test.pypi.org/simple/ oceanbase-sqlalchemy
```

#### Production PyPI
```bash
# Upload to Production PyPI
twine upload dist/*

# Install from Production PyPI
pip install oceanbase-sqlalchemy
```

## Important Reminders

1. **Package Name Uniqueness**: Ensure the package name is not already taken on PyPI
2. **Version Management**: Update version number before each release
3. **Test First**: Recommend publishing to Test PyPI first for verification
4. **Account Preparation**: PyPI account and API token required

## Common Issues

### Q: What to do if build fails?
A: Check setup.py configuration and ensure all dependencies are installed

### Q: What to do if upload fails?
A: Check network connection and PyPI account permissions

### Q: How to update a published package?
A: Modify version number and rebuild/upload

## Version Management Recommendations

- Use semantic versioning: `major.minor.patch`
- Breaking changes: increment major version
- New features: increment minor version
- Bug fixes: increment patch version

## Related Links

- [PyPI Official Site](https://pypi.org/)
- [Test PyPI](https://test.pypi.org/)
- [Python Packaging User Guide](https://packaging.python.org/)
