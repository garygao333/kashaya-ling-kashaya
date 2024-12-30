#! /bin/bash
## filename: bin/s3-upload.sh
## description: upload data directory to s3 bucket
## version: 0.0.0
##
## dconover:20201021:20201021:tested: upload data directory to s3 bucket

## _upload:dconover:20201125:20201125:tested:upload a given data dir to a given bucket
_upload () {   ## upload a given data dir to a given bucket

    local _data_dir=$1
    local _bucket=$2


    aws s3 sync --delete $_data_dir $_bucket

}


## prod data
repo=$HOME/git/$1   ## like: kashaya-ling
data=$repo/$2   ## like: data
bucket=s3://$3      ## like: kashaya.ling.upenn.edu

_upload $data $bucket



