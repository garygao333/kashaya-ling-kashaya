# init script for listener.py
owner: dconover:20201022   
status: active


## overview
create an init script to run listener.py as service
  - we can also kill the output from the script since we already have the logs


## manifest
working docs archived as normal, and:
  - update bin/listener.py


## metadata
```bash
_o=bin/listener.py
_o2=bin/listener
```


## code
code to silence output:
```bash
kashaya-dev@babel[listener:~/git/kashaya-ling/doc/active/listener]$ diff -U1 -wB {$n,$o}
--- /home/kashaya-dev/git/kashaya-ling-system/doc/active/listener/listener.20201022.assets/listener.py
2020-10-22 21:32:40.848462571 -0400
+++ /home/kashaya-dev/git/kashaya-ling-system/bin/listener.py    2020-10-22 21:26:27.953058877 -0400
@@ -9,3 +9,3 @@

-import os, sys
+import os
 import web
@@ -100,15 +100,4 @@

-class silenceoutput(object):
-
-    def write(self, data):
-        pass   # Ignore output
-
-
-
 if __name__ == '__main__':

-    web.config.debug = False
-    sys.stdout = silenceoutput()
-    sys.stderr = silenceoutput()
-
     config = configparser.ConfigParser()
kashaya-dev@babel[listener:~/git/kashaya-ling/doc/active/listener]$
```


## result
test:
```bash
```


## reference
  - https://stackoverflow.com/a/7210709


## todo
  - code 
  - test 
  - deploy


## log
  - overview


template_name: default.standard.feature.md
template_version: 0.2.0   
keywords: feature listener
