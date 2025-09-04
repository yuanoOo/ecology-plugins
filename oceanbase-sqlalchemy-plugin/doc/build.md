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
- `README.md` - Project description document
- `LICENSE` - License file
- `__init__.py` - Package initialization file

### 3. Build Distribution Packages
```bash
# Build source distribution and wheel packages
python -m build

# Check generated files
ls dist/
# You should see:
# - oceanbase-sqlalchemy-0.2.0.tar.gz (source package)
# - oceanbase_sqlalchemy-0.2.0-py3-none-any.whl (wheel package)
```

### 4. Validate Distribution Packages
```bash
# Check package quality
twine check dist/*

# Test local installation
pip install dist/oceanbase_sqlalchemy-0.2.0-py3-none-any.whl
```

### 5. Upload to PyPI

#### Test PyPI (Recommended first)
```bash
# Upload to test PyPI
twine upload --repository testpypi dist/*

# Install and verify from test PyPI
pip install --index-url https://test.pypi.org/simple/ oceanbase-sqlalchemy
```

#### Production PyPI
```bash
# Upload to production PyPI
twine upload dist/*

# Install from production PyPI
pip install oceanbase-sqlalchemy
```

## Important Reminders

1. **Package Name Uniqueness**: Ensure the package name is not already taken on PyPI
2. **Version Management**: Update version number before each release
3. **Test First**: Recommend publishing to test PyPI for verification
4. **Account Preparation**: Need PyPI account and API token

## Common Issues

### Q: What if build fails?
A: Check setup.py configuration and ensure all dependencies are installed

### Q: What if upload fails?
A: Check network connection and PyPI account permissions

### Q: How to update an already published package?
A: Modify version number, then rebuild and upload

## Version Management Recommendations

- Use semantic versioning: `Major.Minor.Patch`
- Breaking changes: Increment major version
- New features: Increment minor version
- Bug fixes: Increment patch version

## Related Links

- [PyPI Official Site](https://pypi.org/)
- [Test PyPI](https://test.pypi.org/)
- [Python Packaging User Guide](https://packaging.python.org/)

## Environment Variables (Optional)

For automated uploads, you can set environment variables:
```bash
export TWINE_USERNAME=your_username
export TWINE_PASSWORD=your_api_token
```

## Best Practices

1. **Always test on test PyPI first**
2. **Use descriptive version numbers**
3. **Include comprehensive documentation**
4. **Test installation from PyPI before announcing**
5. **Keep dependencies up to date**
