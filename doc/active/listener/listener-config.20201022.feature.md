# local config processing
owner: dconover:20201022   
status: archive


## overview
some new features
  - read local config from kashaya-dev/.config/listener/config


## manifest
working docs archived as normal, and:
  - update bin/listener.py


## metadata
```bash
_o=bin/listener.py
```


## code
code update to support a local config file and resops-test url:
```diff
kashaya-dev@babel[listener:~/git/kashaya-ling/doc/active/listener]$ diff -U1 -wB {$n,$o}
--- /home/kashaya-dev/git/kashaya-ling/doc/active/listener/listener.20201022.assets/listener.py    2020-10-22 18:43:34.693102291 -0400
+++ /home/kashaya-dev/git/kashaya-ling/bin/listener.py    2020-10-22 17:17:50.118003258 -0400
@@ -3,9 +3,5 @@
 ##
-## dconover:20190917:20201022:add config support:listen on port 8080 and run reset_repo.sh on post
+## dconover:20190917:20190917:tested:listen on port 8080 and run reset_repo.sh on post

-__author__ = 'Dareus Conover'
-__version__ = '0.1.0'

-
-import os
 import web
@@ -17,3 +13,6 @@
 ## read local config
-config_file = f"{ os.environ['HOME'] }/.config/listener/config"
+config = configparser()
+webhook_token = ''
+reset_script = '/home/kashaya-dev/git/kashaya-ling/bin/reset_repo.sh'
+

@@ -42,6 +41,7 @@
         ## just run the update
-        post_log.info('test post received')
+        post_log.info('post received')
         post_log.info(self.data.decode('utf-8'))

-        return 'post-gitlab-hook success\n'
+        subprocess.check_call(reset_script)
+        return 'post-gitlab-hook\n'

@@ -49,4 +49,4 @@
     def GET(self):
-        get_log.info('test get received')
-        return "get-gitlab-hook success\n"
+        get_log.info('get received')
+        return "get-gitlab-hook\n"

@@ -75,12 +75,4 @@

-    config = configparser.ConfigParser()
-    config.read( config_file )
-
-    webhook_token = config['default']['webhook_token']
-    reset_script = config['default']['reset_script']
-    post_log_file = config['default']['post_log']
-    get_log_file = config['default']['get_log']
-
     urls = (
-        '/gitlabhook', 'gitlabhook',
+        '/.*', 'gitlabhook'
         '/resops-test', resopstest
@@ -88,2 +80,5 @@

+    post_log_file = '/var/log/webhook/listen-post.log'
+    get_log_file = '/var/log/webhook/listen-get.log'
+
     global post_log
kashaya-dev@babel[listener:~/git/kashaya-ling/doc/active/listener]$
```


## result
test:
```bash
kashaya-dev@babel[listener:~/git/kashaya-ling/doc/active/listener]$ python3 $n
/var/log/webhook/listen-post.log
http://0.0.0.0:8080/
10.1.2.10:31618 - - [22/Oct/2020 18:37:20] "HTTP/1.1 GET /resops-test" - 200 OK
10.1.1.91:57876 - - [22/Oct/2020 18:37:28] "HTTP/1.1 GET /resops-test" - 200 OK
10.1.0.94:45626 - - [22/Oct/2020 18:37:28] "HTTP/1.1 GET /resops-test" - 200 OK
[... output truncated]
```


## reference
  - https://webpy.org/cookbook/url_handling
  - https://docs.python.org/3/library/configparser.html


## log
  - overview
  - code 
  - test 
  - deploy


template_name: default.standard.feature.md
template_version: 0.2.0   
keywords: feature listener
