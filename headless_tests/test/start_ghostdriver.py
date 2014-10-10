import os
from settings import *  # noqa

os.system('export APP_NAME')
os.environ['APP_NAME'] = 'varify'
os.system('export DEVELOPMENT_SERVER_HOST')
os.environ['DEVELOPMENT_SERVER_HOST'] = 'localhost'
os.system('export DEVELOPMENT_SERVER_PORT')
os.environ['DEVELOPMENT_SERVER_PORT'] = '8004'
os.system('export PHANTOMJS_PORT')
os.environ['PHANTOMJS_PORT'] = '8150'
os.system('export PHANTOMJS_HOST')
os.environ['PHANTOMJS_HOST'] = 'localhost'
os.system('export LOG_FILE')
os.environ['LOG_FILE'] = '$APP_NAME_phantomjs.log'

PHANTOMJS_PORT = os.environ['PHANTOMJS_PORT'] or None
LOG_FILE = os.environ['LOG_FILE'] or None

if not PHANTOMJS_PORT and not LOG_FILE:
    print "Please set the environment variables PHANTOMJS_PORT and LOG_FILE"
else:
    os.system('phantomjs --webdriver={0} 2>&1 > {1} &'.format(PHANTOMJS_PORT,
                                                              LOG_FILE))
