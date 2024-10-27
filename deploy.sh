#!/bin/bash

SCRIPT_DIR=$(readlink -f "$0" | xargs dirname)
. "$SCRIPT_DIR"/utils.sh

unset -v profile

usage() {
  echo "Usage: $0 -p <PROFILE>"
  echo "  -p <Antho|Papa>        Profile used for deployment"
  echo ""
}

check_args() {
  if [ -z "$profile" ]; then
    exit_error "Error: Profile is required"
  fi

  if [ "$profile" != "Antho" ] && [ "$profile" != "Papa" ]; then
    exit_error "Error: Unsupported profile: $profile"
  fi
}

build() {
  log_info "🛠️Building application"
  execute yarn build
}

deploy() {
  log_info "🚀Deploying application"

  case "$profile" in
    Antho) TARGET=pi@home.local:/var/www/html ;;
    Papa) TARGET=bb@192.168.1.222:/var/www/html ;;
    *) log_error "Unsupported profile: $profile"; exit 1 ;;
  esac

  execute scp -r dist/* $TARGET
}

while getopts p:h flag
do
    case "${flag}" in
        p) profile=${OPTARG};;
        h) usage; exit 0;;
        *) usage; exit 1;;
    esac
done
shift "$(( OPTIND - 1 ))"

check_args

build || exit_error "☠️Build failed"

if ask "OK to continue"; then
  deploy || exit_error "☠️Deploy failed"
fi

log_success "🎉All done!"

