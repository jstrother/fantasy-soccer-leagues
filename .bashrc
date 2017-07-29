function clone {
  git clone git@github.com:$1/$2.git
}

function remote {
  echo "# "$2 >> README.md &&
  git init &&
  ac "first commit" &&
  git remote add origin git@github.com:$1/$2.git &&
  push
}

function setup {
  mkdir $1 &&
  cd $1 &&
  mkdir public &&
  gitignore &&
  init
}

export NODE_ENV=development