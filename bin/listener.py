#! /bin/env python3
## filename: listener.py
## description: listen for webhook and update s3 buck on verified push events
##
## dconover:20190917:20230613:parse payload for repo information:listen on port 8080 and run reset_repo.sh on post


__author__ = 'Dareus Conover'
__version__ = '1.0.0'



import os, sys
import web
import subprocess
import logging
import configparser
import hashlib
import hmac
import json



## setup_logger:dconover:20210802:20210802:tested:setup logger
def setup_logger( name, log_file, level=logging.INFO ):

    """
    setup logger
      - currently only logging to file
      - https://stackoverflow.com/questions/11232230/logging-to-two-files-with-different-settings
      - https://stackoverflow.com/questions/13733552/logger-configuration-to-log-to-file-and-print-to-stdout
    """

    formatter = logging.Formatter( '%(asctime)s|%(message)s' )

    handler = logging.FileHandler( log_file )
    handler.setFormatter( formatter )

    logger = logging.getLogger( name )
    logger.setLevel( level )
    logger.addHandler( handler )

    return logger



## resopstest:dconover:20210802:20210802:tested:handle /resopstest url requests
class resopstest:

    ## __init__:dconover:20210802:20210802:tested:initialize
    def __init__( self ):

        self.data = web.data()



    ## POST:dconover:20210802:20210802:tested:respond to post requests
    def POST( self ):

        ## just run the update
        post_log.info( 'test post received' )
        post_log.info( self.data.decode( 'utf-8' ) )

        return 'post-gitlab-hook success\n'



    ## GET:dconover:20210802:20210802:tested:respond to get requests
    def GET( self ):

        get_log.info( 'test get received' )
        return "get-gitlab-hook success\n"



## gitlabhook:dconover:20210802:20210802:tested:handle /gitlabhook url requests
class gitlabhook:

    """
    process /gitlabhook
    """

    ## __init__:dconover:20210802:20230613:set payload variables:initialize
    def __init__( self ):

        """
        initialize
        """

        self.data = web.data()
        self.json = self.read_json()
        self.repo_name = self.json[ 'repository' ][ 'name' ]

        self.auth_token =  bytes( self.json[ self.repo_name ][ 'webhook_token' ], 'utf-8' )
        self.token = web.ctx.env.get( 'HTTP_X_GITLAB_TOKEN' )
        self.signature = web.ctx.env.get( 'HTTP_X_HUB_SIGNATURE' )



    ## check_header:dconover:20210802:20210802:tested:check the gitlab header token ( no signature )
    def check_header( self ):

        """
        check the gitlab header token 
          - gitlab sends a token in the header
          - this is not a signature ( github uses a signature )
        """

        ### add github signature support
        self.check_github_signature()


        post_log.info( f"check_header" )
        return self.token == self.auth_token



    ## check_github_signature:dconover:20210802:20210802:tested:given a payload, signature, and secret, confirm signature
    def check_github_signature( self ):

        """
        given a payload, signature, and secret, confirm signature
        """

        payload = self.data
        signature = self.signature
        secret = self.auth_token


        post_log.info( f"check_signature" )
        calculated = f"sha1={ hmac.new( secret, payload, hashlib.sha1 ).hexdigest() }"


        post_log.info( f"signature:{ calculated } { signature }" )
        return calculated == signature



    ## POST:dconover:20210802:20210802:tested:respond to post requests
    def POST( self ):

        ## just run the update
        post_log.info( 'post received' )
        post_log.info( self.data.decode( 'utf-8' ) )

        if self.check_github_signature():

            _repo_name     = self.repo_name
            _reset_script  = self.json[ _repo_name ][ 'reset_script' ]
            _upload_script = self.json[ _repo_name ][ 'upload_script' ]


            for _upload_info in self.json[ _repo_name ][ 'upload' ].split( ' ' ):

                _repo_dir, _repo_branch, _data_dir, _s3_bucket = _upload_info.split( ':' )


                ## reset script: reset_repo.sh gitlab:_repo_name 
                subprocess.check_call( [ _reset_script, _repo_name, _repo_dir, _repo_branch ] )

                ## upload script: s3_upload.sh _repo_dir _data_dir _s3_bucket
                subprocess.check_call( [ _upload_script, _repo_dir, _data_dir, _s3_bucket ] )


            return 'post-gitlab-hook\n'


        else:

            return f'{ self.token } does not match auth_token - auth failure\n'



    ## GET:dconover:20210802:20210802:tested:respond to get requests
    def GET( self ):

        get_log.info( 'get received' )
        return "get-gitlab-hook\n"



    ## read_json:dconover:20230613:20230623:tested:read json data
    def read_json( self ):

        """
        read json data
        """

        post_log.info( f"read_json" )
        return json.loads( self.data )



    ## select_repo:dconover:20230623:20230613:tested:select the repo to update
    def select_repo( self ):

        """
        select the repo to update
        """

        _config = self.config


        post_log.info( f"select_repo" )
        _repo_name = self.json[ 'repository' ][ 'name' ]

        _webhook_token = bytes( _config[ _repo_name ][ 'webhook_token' ], 'utf-8' )
        _reset_script = _config[ _repo_name ][ 'reset_script' ]
        
        return self.json[ 'repository' ][ 'name' ]



## Server:dconover:20230613:20230613:tested:server
class Server:

    """
    server
    """

    ## __init__:dconover:20230613:20230613:tested:initialize
    def __init__( self, config_file ):

        """
        initialize and run web server
        """

        _config_file = config_file
        self.parse_config( _config_file )


        ## for debugging just update ~/.config/listener/config to include debug = true
        if self.debug != "true":
    
            sys.stdout = silenceoutput()
            sys.stderr = silenceoutput()


        global post_log
        global get_log

        post_log = setup_logger( 'post_log', self.post_log_file )
        get_log = setup_logger( 'get_log', self.get_log_file )

    
        self.app()



    ## app:dconover:20230613:20230613:tested:run the app
    def app( self ):

        """
        run the app
        """

        _urls = ( 

            '/gitlabhook', 'gitlabhook',
            '/resops-test', resopstest
    
        )


        web.config.debug = False
        _app = web.application( _urls, globals() )

        _app.run() 



    ## parse_config:dconover:20230623:20230613:tested:parse the config file
    def parse_config( self, config_file ):

        """
        parse the config file
        """

        _config_file = config_file


        _config = configparser.ConfigParser()
        _config.read( _config_file )


        self.config = _config
        self.debug = _config[ 'default' ][ 'debug' ]

        self.post_log_file = _config[ 'default' ][ 'post_log' ]
        self.get_log_file = _config[ 'default' ][ 'get_log' ]



## silenceoutput:dconover:20210802:20210802:tested: silence output
class silenceoutput( object ):

    def write( self, data ):

        pass   # Ignore output



## main:dconover:20210802:20210802:tested:main
def main():

    """
    main
    """
    
    config_file = f"{ os.environ['HOME'] }/.config/listener/config.test"


    Server( config_file )



if __name__ == '__main__':

    main()


