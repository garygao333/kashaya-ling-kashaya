# kashaya-ling project repo
owner: dconover:20201021   

## set-up and deployment instructions
### Cloning from GitHub
1. `git clone https://github.com/upenn/kashaya-ling.git`

2. `git pull` to get recent changes (unnecessary if you've just done the clone operation)

### Updating word and sentence data 
3. Place the updated `Files` directory in `./data/static`, or add new files to the existing `./data/static/Files` folder

4. Add the sentence and word `.csv` files to `./data_cleaning`
    - The sentence file must be named `Kashaya web list - sentences.csv`
    - The word file must be named `Kashaya web list - words.csv`

5. Run scripts from `./data_cleaning` to create the `.json` files
    - `python3 create_words_json.py`
    - `python3 create_sentences_json.py`

6. Move the generated `json` files to `./src/static`, overwriting the existing versions if necessary

### ReactJS web framework
#### `yarn` installation (first time only)
7. Download and install `yarn`. Installation guide [here](https://classic.yarnpkg.com/en/docs/install)
8. Run `yarn install` from the root directory

#### build instructions
9. To enter development mode, run `yarn start`
    - Not usually needed, but opens a provisional version of the web site in a browser
10. To build the project for deployment, run `yarn build` and this will create the `./build` directory
    - Any changes to the React components or other website source code will be reflected in the new build

### Deployment
11. Move `./data/static/Files` to `./build/static/Files`
12. Rename `./build` to `./data`
13. Run the following commands from the project root:
    - `git add . `
    - `git commit -m "short description of the update"`
    - `git push` 

## overview
  - [bin/readme.md](bin/readme.md) - management scripts 
  - [etc/readme.md](etc/readme.md) - server environment
  - [salt/readme.md](salt/readme.md) - salt configuration
  - [doc/readme.md](doc/readme.md) - documentation
  - [data/readme.md](data/readme.md) - website data 
  - [src/readme.md](src/readme.md) - application source files


## discussion 
this repo is configured and deployed with two distinct workflows in mind, to support both developement
(site maintainer) and deployment (isus sysadmins).


## workflow
maintainers
  - maintainers have developer accounts with access to the "kashaya" branch
  - feature branches should be forked from the "kashaya" branch 
  - feature code can be merged into kashaya-dev and tested at s3 url:
    http://kashaya.ling.upenn.edu.s3-website-us-west-2.amazonaws.com
  - test code should be merged back into the kashaya branch

isus sysadmins
  - isus sysadmins also have write access to the "rev" branch
  - tested code and documentation is merged into rev
  - rev is merged into kashaya via merge request to be reviewed by the maintainers
  - production server code (deployed on babel-ling) will only be served from the rev branch
  - changes to the repo will trigger s3 pushes (from the 'data' directory to s3://kashaya.ling.upenn.edu)
  - api credentials will be written to disk on babel-ling in the kashaya-dev account


## help
  - for any problems or service requests please email: manager@ling.upenn.edu


keywords: readme kashaya-ling aws s3 workflow isus 
