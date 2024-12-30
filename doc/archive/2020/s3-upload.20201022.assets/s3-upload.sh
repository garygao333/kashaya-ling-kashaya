#! /bin/bash
## filename: bin/s3-upload.sh
## description: upload data directory to s3 bucket
##
## dconover:20201021:20201021:tested: upload data directory to s3 bucket

bucket=s3://kashaya.ling.upenn.edu
data=$HOME/git/kashaya-ling/data

aws s3 sync --delete $data $bucket



