#!/bin/bash
print_status() {
    echo
    echo "## $1"
    echo
}

bail() {
    echo 'Error executing command, exiting'
    exit 1
}

exec_cmd_nobail() {
    echo "+ $1"
    bash -c "$1"
}

exec_cmd() {
    exec_cmd_nobail "$1" || bail
}

if [[ $EUID > 0 ]]
  then bail "Please run as root"
fi

setup() {
    exec_cmd "apt-get update -y"
    exec_cmd "apt-get install -y imagemagick lightdm unclutter chromium-browser"
    exec_cmd "raspi-config nonint do_boot_behaviour B4"
    exec_cmd `sed /etc/lightdm/lightdm.conf -i -e "s/^#autologin-user=.*/autologin-user=lazr-pck-webkiosk/"`
}

setup