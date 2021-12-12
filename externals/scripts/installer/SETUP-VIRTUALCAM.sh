#!/bin/bash

# This script sets up the camera virtualization module

# linux headers
sudo apt install raspberrypi-kernel-headers

# v4l2loopback
cd ~/smart-mirror-dev
git clone https://github.com/umlaeute/v4l2loopback.git
cd v4l2loopback

make && sudo make install
sudo depmod -a

# FFMPEG
sudo apt install ffmpeg
