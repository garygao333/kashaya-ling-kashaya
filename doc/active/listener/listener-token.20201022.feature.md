# authenticate requests
owner: dconover:20201022   
status: archive


## overview
update url processing to limit script calls:
  - posts with the correct header token should run script
  - resops-test should simply return a success message (without the token)


## manifest
working docs archived as normal, and:
  - update bin/listener.py


## metadata
```bash
_o=bin/listener.py
```


## code
code to handle token comparison:
```diff
kashaya-dev@babel[listener:~/git/kashaya-ling/doc/active/listener]$ diff -U1 -wB {$n,$o}
--- /home/kashaya-dev/git/kashaya-ling-system/doc/active/listener/listener.20201022.assets/listener.py
2020-10-22 20:30:29.970247598 -0400
+++ /home/kashaya-dev/git/kashaya-ling-system/bin/listener.py    2020-10-22 19:37:44.925118392 -0400
@@ -67,11 +67,2 @@

-        self.auth_token = webhook_token
-        self.token = web.ctx.env.get( 'HTTP_X_GITLAB_TOKEN' )
-
-
-    def check_header( self ):
-
-        return self.token == self.auth_token
-
-

@@ -83,4 +74,2 @@

-        if self.check_header():
-
             subprocess.check_call( reset_script )
@@ -88,6 +77,2 @@

-        else:
-
-            return f'{ self.token } does not match { self.auth_token } - auth failure\n'
-

kashaya-dev@babel[listener:~/git/kashaya-ling/doc/active/listener]$
```


## result
test:
```bash
kashaya-dev@babel[/]$ grep ^webhook ~/.config/listener/config
webhook_token = test-token
kashaya-dev@babel[/]$
kashaya-dev@babel[/]$ curl -i -H 'X-Gitlab-Token: test-token' --data 'test=1' localhost:8080/gitlabhook
HTTP/1.1 200 OK
Transfer-Encoding: chunked
Date: Fri, 23 Oct 2020 00:29:43 GMT
Server: localhost

post-gitlab-hook
kashaya-dev@babel[/]$ curl -i -H 'X-Gitlab-Token: test-tokenx' --data 'test=1' localhost:8080/gitlabhook
HTTP/1.1 200 OK
Transfer-Encoding: chunked
Date: Fri, 23 Oct 2020 00:29:55 GMT
Server: localhost

test-tokenx does not match test-token - auth failure
```


## refactor
  - update whitespacing


## reference
  - https://stackoverflow.com/a/15394493
  - https://stackoverflow.com/a/19217512


## log
  - overview
  - code 
  - test 
  - deploy


template_name: default.standard.feature.md
template_version: 0.2.0   
keywords: feature listener
