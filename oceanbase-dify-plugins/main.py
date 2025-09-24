from dify_plugin import Plugin, DifyPluginEnv
import time
import signal
import sys

def signal_handler(sig, frame):
    print('Plugin shutting down...')
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

plugin = Plugin(DifyPluginEnv(MAX_REQUEST_TIMEOUT=120))

if __name__ == '__main__':
    try:
        print('Starting OceanBase plugin...')
        plugin.run()
    except KeyboardInterrupt:
        print('Plugin stopped by user')
    except Exception as e:
        print(f'Plugin error: {e}')
        sys.exit(1)
