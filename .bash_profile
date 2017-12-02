if [ -f ~/.bashrc ]; then
  . ~/.bashrc
fi

# the following sets up an alias for sourcing .bash_profile

alias source="cd && source .bash_profile && echo '.bash_profile updated'"


# the following is an alias for cd ..

alias up="cd .."


# the following is an alias to get to my Projects folder

alias projects="cd ~/Projects"


# the following is an alias to jump to the fantasy soccer leagues project

alias soccer="projects && cd fantasy-soccer-leagues && status"


# the following is an alias to jump to the inventory project

alias inventory="projects && cd real-time-inventory && status"


# the following is an alias to jump to the big, major inventory/business software project

alias bigProject="projects && cd full-inventory-business-software && status"


# the following is an alias to jump to responsive portfolio

alias portfolio="projects && cd responsive-portfolio && status"


# the following is an alias to setup a .gitignore

alias gitignore="touch .gitignore && echo 'node_modules/
*.log
*.zip
*.pem
*.ppk
rethinkdb_data/
src/scss/bourbon
src/scss/neat
src/scss/base' >> .gitignore"


# the following is an alias for npm init

alias init="npm init"


# the following is an alias for npm start

alias start="npm start"


# the following is an alias for npm update

alias update="npm update & echo 'Updating' && echo 'Update Complete'"


# the following is an alias for npm install (packages can be specified)

alias i="npm install"


# the following is an alias to install to dependencies (packages can be specified)

alias S="i --save"


# the following is an alias to install to devDependencies (packages can be specified)

alias D="i --save-dev"


# the following is an alias to install npm packages globally

alias G="i -g"


# the following is an alias for npm uninstall (packages can be specified)

alias ui="npm uninstall --save --save-dev"


# the following is an alias for npm run build

alias build="npm run build"


# the following is an alias for npm run watch

alias watch="npm run watch"


# the following is an alias for npm run begin

alias begin="npm run begin"


# the following is an alias for npm run start

alias start="npm run start"


# the following is an alias for npm test

alias test="npm test"


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


# the following is an alias to start rethink on port 8081

alias rethink="rethinkdb --bind all --http-port 8081"

