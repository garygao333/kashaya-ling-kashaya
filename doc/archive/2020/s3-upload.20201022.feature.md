# s3-upload feature code
owner: dconover:20201022   
status: archive


## overview
_get_block


## manifest
working docs archived as normal, and:
  - update bin/s3-upload.sh


## metadata
```bash
_o=bin/s3-upload.sh
```


## result
test confirms upload with deletion of missing files:
```bash
kashaya-dev@babel[s3-upload:~/git/kashaya-ling-system/doc/active/s3-upload]$ $n
delete: s3://kashaya.ling.upenn.edu/resops-test.html
delete: s3://kashaya.ling.upenn.edu/index.html
kashaya-dev@babel[s3-upload:~/git/kashaya-ling-system/doc/active/s3-upload]$
```


## log
  - overview
  - code 
  - test 
  - deploy




template_name: default.standard.feature.md
template_version: 0.2.0   
keywords: feature s3-upload
