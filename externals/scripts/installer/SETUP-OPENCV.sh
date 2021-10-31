#!/bin/bash

# This script setups the Smart Mirror OpenCV environment

# Install minimal prerequisites (Ubuntu 18.04 as reference)
sudo apt install -y cmake g++ wget unzip
cd ~/smart-mirror-dev

# Download and unpack sources
wget -O opencv.zip https://github.com/opencv/opencv/archive/master.zip
wget -O opencv_contrib.zip https://github.com/opencv/opencv_contrib/archive/master.zip

unzip opencv.zip
mv opencv-master opencv
rm opencv.zip

unzip opencv_contrib.zip
mv opencv_contrib-master opencv_contrib
rm opencv_contrib.zip

# Create build directory and switch into it
mkdir -p opencv-build && cd opencv-build

# Configure
cmake -DOPENCV_EXTRA_MODULES_PATH=../opencv_contrib/modules ../opencv

# Build
cmake --build .

# Install
sudo make install
