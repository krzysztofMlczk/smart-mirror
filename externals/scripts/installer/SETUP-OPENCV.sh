#!/bin/bash

# This script setups the Smart Mirror OpenCV environment

# Install minimal prerequisites (Ubuntu 18.04 as reference)
sudo apt install -y cmake g++ wget unzip
cd ~/smart-mirror-dev

# Download and unpack sources
wget -O opencv.zip https://github.com/opencv/opencv/archive/4.4.0.zip
wget -O opencv_contrib.zip https://github.com/opencv/opencv_contrib/archive/4.4.0.zip

unzip opencv.zip
mv opencv-4.4.0 opencv
rm opencv.zip

unzip opencv_contrib.zip
mv opencv_contrib-4.4.0 opencv_contrib
rm opencv_contrib.zip

# Install prerequisites
sudo apt update && sudo apt upgrade -y
sudo apt-get dist-upgrade -y --autoremove

sudo apt install -y \
        build-essential \
        cmake \
        git \
        pkg-config

sudo apt install -y \
    gfortran \
    libatlas-base-dev \
    liblapacke-dev \
    liblapack-dev \
    libavcodec-dev \
    libavformat-dev \
    libswscale-dev \
    libv4l-dev \
    v4l-utils \
    libxvidcore-dev \
    libx264-dev \
    libfontconfig1-dev \
    libcairo2-dev \
    libgdk-pixbuf2.0-dev \
    libpango1.0-dev \
    libgtk2.0-dev \
    libgtk-3-dev \
    libcanberra-gtk3* \
    libhdf5-dev \
    libhdf5-serial-dev \
    libhdf5-103 \
    libqtgui4 \
    libqtwebkit4 \
    libqt4-test \
    python3-pyqt5 \
        libgstreamer1.0-dev \
        libgstreamer-plugins-base1.0-dev \
    libjpeg-dev \
    libtiff-dev \
    libpng-dev \
    libjasper-dev \
    libtbb-dev \
    libtbb2 \
    python3-dev \
    python3-pip \
    python3-numpy


CMAKEFLAGS="
    -D CMAKE_BUILD_TYPE=RELEASE
    -D CMAKE_INSTALL_PREFIX=/usr/local
    -D OPENCV_EXTRA_MODULES_PATH=../opencv_contrib/modules
    -D BUILD_EXAMPLES=OFF
    -D BUILD_TESTS=OFF
    -D BUILD_PERF_TESTS=OFF
    -D INSTALL_PYTHON_EXAMPLES=OFF
    -D INSTALL_C_EXAMPLES=OFF
    -D ENABLE_NEON=ON
    -D ENABLE_VFPV3=ON
    -D OPENCV_ENABLE_NONFREE=ON
    -D CMAKE_SHARED_LINKER_FLAGS=-latomic
    -D WITH_FFMPEG=ON
    -D WITH_TBB=ON
    -D BUILD_TBB=ON
    -D WITH_GSTREAMER=ON
    -D WITH_V4L=ON
    -D WITH_LIBV4L=ON
    -D BUILD_NEW_PYTHON_SUPPORT=ON
    -D ENABLE_PRECOMPILED_HEADERS=ON
    -D OPENCV_GENERATE_PKGCONFIG=ON"

# Create build directory and switch into it
mkdir -p opencv-build && cd opencv-build

# Configure
cmake ${CMAKEFLAGS} ../opencv

# Build
make -j4

# Install
sudo make install
