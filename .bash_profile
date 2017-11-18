# the following is an alias for refreshing .bash_profile and getting git status
alias source="source .bash_profile && status"

# the following is an alias for moving up one directory
alias up="cd .."

# the following is an alias to run mongod
alias mongod="~/workspace/run_mongod"

# the following is an alias for npm init
alias init="npm init"

# the following is an alias for npm start
alias start="npm start"

# the following is an alias for npm update
alias update="npm update & echo 'Updating' && echo 'Update Complete'"

# the following is an alias for npm install (packages can be specified)
alias i="npm install"

# the following is an alias to install to devDependencies (packages can be specified)
alias S="i -S"

# the following is an alias to install to dependencies (packages can be specified)
alias D="i -D"

# the following is an alias to install npm packages globally
alias G="i -g"

# the following is an alias for npm uninstall (packages can be specified)
alias ui="npm uninstall -S -D"

# the following is an alias for npm run build
alias build="npm run build"

# the following is an alias for npm run watch
alias watch="npm run watch"

# the following is an alias for npm run begin
alias begin="npm run begin"

# the following is an alias for npm run lint
alias lint="npm run lint"

# the following is an alias for npm run serve
alias serve="npm run serve"

# the following is an alias for npm test
alias test="npm run test"

# the following is an alias for git status
alias status="git status"

# the following is an alias for adding to git
alias add="git add --all"

# the following is an alias for committing to git
alias commit="git commit -m $1"

# the following is an alias for both adding and committing
alias ac="add && commit"

# the following is an alias for pushing to git, and calling status after
alias push="git push origin master && status"

# the following is an alias for pulling from git, and calling status after
alias pull="git pull origin master && status"

# the following is an alias for pushing to gh-pages and calling status after
alias pages="git push origin gh-pages && status"

# the following is an alias to setup a new gh-pages
alias newPages="git checkout -b gh-pages"

# the following is an alias for singly removing a file or folder from git
alias remove="git rm -rf $1"

# the following is an alias to switch between master branch and gh-pages
alias switch="git checkout $1"