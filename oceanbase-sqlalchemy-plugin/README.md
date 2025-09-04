# SQLAlchemy OceanBase Dialect

SQLAlchemy dialect for OceanBase Oracle mode (supports SQLAlchemy 1.3+ and 2.0+)

## Features

- Full compatibility with SQLAlchemy 1.3.x and 2.0+
- Optimized SQL queries for OceanBase
- Support for cx_oracle driver
- Enhanced constraint reflection with OceanBase-specific optimizations

## Installation

```bash
pip install oceanbase-sqlalchemy
```

## Usage

```python
from sqlalchemy import create_engine
from oceanbase_sqlalchemy.utils import build_safe_connection_string

# Build connection string
connection_string = build_safe_connection_string(
    username="your_username",
    password="your_password", 
    host="your_host",
    port="2881",
    service_name="your_service_name"
)

# Create engine
engine = create_engine(connection_string)
```

## License

Apache License 2.0
