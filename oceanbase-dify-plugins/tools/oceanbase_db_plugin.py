import mysql.connector
from typing import Generator, Any

from dify_plugin import Tool
from dify_plugin.entities.tool import ToolInvokeMessage

class OceanBaseDbPluginTool(Tool):
    def __init__(self, runtime=None, session=None):
        super().__init__(runtime, session)
        # 获取当前语言环境，默认为英文
        self.language = self.get_language()
    
    def get_language(self):
        # 从运行环境中获取语言设置，默认返回'en_US'
        try:
            # 实际应用中可能需要从不同位置获取语言设置
            # 这里仅作为示例
            return 'en_US'
        except:
            return 'en_US'
    
    def get_message(self, messages_dict):
        # 根据当前语言返回对应消息，如果没有对应语言的消息，返回英文消息
        return messages_dict.get(self.language, messages_dict.get('en_US', ''))
    
    def _invoke(self, tool_parameters: dict[str, Any]) -> Generator[ToolInvokeMessage, None, None]:
        conn = None
        try:
            # 获取连接参数
            host = tool_parameters.get('host')
            port = tool_parameters.get('port', 2881)  # 使用默认端口2881
            user = tool_parameters.get('user')
            password = tool_parameters.get('password')
            database = tool_parameters.get('database')
            sql_query = tool_parameters.get('query')
            
            # 验证必要参数
            if not all([host, user, password, database, sql_query]):
                messages = {
                    'en_US': 'Missing required parameters: host, user, password, database, query are all required',
                    'zh_Hans': '缺少必要参数：host、user、password、database、query都是必需的'
                }
                yield self.create_json_message({
                    "status": "error",
                    "message": self.get_message(messages)
                })
                return
            
            # 构建连接字符串（隐藏密码）
            print(f'Connecting to OceanBase: {host}:{port}/{database}, user: {user}')
            
            # 连接数据库
            conn = mysql.connector.connect(
                host=host,
                port=port,
                user=user,
                password=password,
                database=database,
                charset='utf8mb4'
            )
            print(f'Connected to OceanBase successfully')
            
            # 创建游标
            with conn.cursor() as cursor:
                # 执行查询
                cursor.execute(sql_query)
                
                # 获取列名
                if cursor.description:
                    columns = [col[0] for col in cursor.description]
                else:
                    columns = []
                
                # 获取查询结果
                results = []
                if cursor.description:
                    # SELECT查询
                    for row in cursor.fetchall():
                        # 将每行数据转换为字典
                        row_dict = {columns[i]: value for i, value in enumerate(row)}
                        # 处理可能的特殊类型
                        for key, value in row_dict.items():
                            # 转换datetime对象为字符串
                            if hasattr(value, 'strftime'):
                                row_dict[key] = value.strftime('%Y-%m-%d %H:%M:%S')
                            elif value is None:
                                row_dict[key] = None
                        results.append(row_dict)
                else:
                    # 非SELECT查询（INSERT, UPDATE, DELETE等）
                    affected_rows = cursor.rowcount
                    results = [{"affected_rows": affected_rows}]
                
                # 返回结果
                messages = {
                    'en_US': f'Query executed successfully, returned {len(results)} rows.',
                    'zh_Hans': f'查询执行成功，返回了{len(results)}行数据。'
                }
                yield self.create_json_message({
                    "status": "success",
                    "data": results,
                    "columns": columns,
                    "message": self.get_message(messages)
                })
        except Exception as e:
            # 处理异常并返回错误信息
            yield self.create_json_message({
                "status": "error",
                "message": str(e)
            })
        finally:
            # 确保连接关闭
            if conn:
                try:
                    conn.close()
                except:
                    pass