import logging
from typing import Any

from dify_plugin import ToolProvider
from dify_plugin.errors.tool import ToolProviderCredentialValidationError

# Configure logging
logger = logging.getLogger(__name__)


class OceanBaseDbPluginProvider(ToolProvider):
    def _validate_credentials(self, credentials: dict[str, Any]) -> None:
        try:
            # Simple validation for required fields only
            user = credentials.get('ob_user')
            database = credentials.get('ob_database')
            
            if not user:
                raise ValueError("OceanBase username is required")
            if not database:
                raise ValueError("OceanBase database name is required")
                
            logger.info(f"Credentials validation passed for user: {user}, database: {database}")
                
        except Exception as e:
            logger.error(f"Credentials validation failed: {str(e)}")
            raise ToolProviderCredentialValidationError(str(e))
