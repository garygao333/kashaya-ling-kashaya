# management scripts 
owner: dconover:20201021   


## overview
scripts used for management or deployment of application
  - listener.py - webhook listener calls reset.sh
  - reset.sh - reset local copy of repo to current contents, and call s3-upload.sh
  - s3-upload.sh - upload contents in data dir to s3://kasha.ling.upenn.edu
  - new content can be view immediately at (to bypass content caching by cloudfront):
    http://kashaya.ling.upenn.edu.s3-website-us-west-2.amazonaws.com 


## discussion
branches
  - isus admins will be given master acces to all branches for deployment of infrastructure scripts
    (deployed from the rev branch)


keywords: readme script bash python deploy
