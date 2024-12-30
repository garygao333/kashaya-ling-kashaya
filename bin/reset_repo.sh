#! /bin/bash
## filename: repo_reset.sh
## desciption: download data after webhook call
## version: 0.1.0
## usage: repo_reset.sh <repo> <repo_dir> <repo_branch>
##
## dconover:20190917:20230616:process positional variables:reset local repo to remote branch


## _download:dconover:20201125:20201125:tested:download data after webhook call
_download () {   ## download data after webhook call

    local _repo=$1
    local _repo_dir=$2
    local _repo_branch=$3
    
    ## debug
    logger -p local0.info -i -t reset repo: $repo
    
    
    ## check for repo
    if [[ ! -d $repo_dir ]]; then
        mkdir -p $(dirname $repo_dir)

	## --single-branch requires modern version of git
        #git clone --single-branch --branch $repo_branch $repo $repo_dir
        git clone --branch $repo_branch $repo $repo_dir
        return 0
    fi
    
    
    ## reset directory to current repo contents
    (cd $repo_dir &&
        git fetch &&
        git reset --hard origin/$repo_branch  &&
        git clean -d -f
    )
    
}



## prod data
repo=$1                 ## like: 'git:web/kashaya-ling'
repo_dir=$HOME/git/$2   ## like: kashaya-ling
repo_branch=$3          ## like: kashaya



_download $repo $repo_dir $repo_branch


