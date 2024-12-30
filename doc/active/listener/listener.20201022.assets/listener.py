#! /bin/env python3
## filename: listener.py
##
## dconover:20190917:20201022:add config support:listen on port 8080 and run reset_repo.sh on post

__author__ = 'Dareus Conover'
__version__ = '0.1.0'


import os, sys
import web
import subprocess
import logging
import configparser
    

## read local config
config_file = f"{ os.environ['HOME'] }/.config/listener/config"




def setup_logger( name, log_file, level=logging.INFO ):

    """Function setup as many loggers as you want"""

    formatter = logging.Formatter( '%(asctime)s|%(message)s' )

    handler = logging.FileHandler( log_file )
    handler.setFormatter( formatter )

    logger = logging.getLogger( name )
    logger.setLevel( level )
    logger.addHandler( handler )

    return logger



class resopstest:

    def __init__( self ):
        self.data = web.data()


    def POST( self ):

        ## just run the update
        post_log.info( 'test post received' )
        post_log.info( self.data.decode( 'utf-8' ) )

        return 'post-gitlab-hook success\n'


    def GET( self ):

        get_log.info( 'test get received' )
        return "get-gitlab-hook success\n"



class gitlabhook:

    def __init__( self ):

        self.data = web.data()

        self.auth_token = webhook_token 
        self.token = web.ctx.env.get( 'HTTP_X_GITLAB_TOKEN' )


    def check_header( self ): 

        return self.token == self.auth_token
     


    def POST( self ):

        ## just run the update
        post_log.info( 'post received' )
        post_log.info( self.data.decode( 'utf-8' ) )
        
        if self.check_header(): 

            subprocess.check_call( reset_script )
            return 'post-gitlab-hook\n'
    
        else:

            return f'{ self.token } does not match { self.auth_token } - auth failure\n'


    def GET( self ):

        get_log.info( 'get received' )
        return "get-gitlab-hook\n"



class silenceoutput(object):

    def write(self, data):
        pass   # Ignore output



if __name__ == '__main__':

    web.config.debug = False
    sys.stdout = silenceoutput()
    sys.stderr = silenceoutput()

    config = configparser.ConfigParser()
    config.read( config_file )

    webhook_token = config['default']['webhook_token']
    reset_script = config['default']['reset_script']
    post_log_file = config['default']['post_log']
    get_log_file = config['default']['get_log']

    urls = (
        '/gitlabhook', 'gitlabhook',
        '/resops-test', resopstest
    )

    global post_log 
    global get_log 

    post_log = setup_logger( 'post_log', post_log_file )
    get_log = setup_logger( 'get_log', get_log_file )

	
    web.config.debug = False
    app = web.application( urls, globals() )
    app.run()


