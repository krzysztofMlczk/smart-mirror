#!/bin/bash

# This script sets up the Smart Mirror environment

# Git
sudo apt-get install git

# Smart Mirror
cd ~
mkdir smart-mirror-dev
cd smart-mirror-dev

git clone https://github.com/krzysztofMlczk/smart-mirror.git

# Update
sudo apt update
sudo apt upgrade

# OpenCV
# bash ./SETUP-OPENCV.sh

# Virtual camera
bash ./SETUP-VIRTUALCAM.sh

# Face recognizer 
bash ./SETUP-RECOGNIZE.sh
