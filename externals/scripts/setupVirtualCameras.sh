#!/bin/bash

# This script takes an index of physical video device
# and creates a virtual v4l2loopback device that will
# mirror the source device
#
# Usage:
# ./setupVirtualCameras.sh [source camera id] [optional : desired loopback video id]
#

if [ $# -lt 1 ]
then
	echo "Not enough arguments were provided, see the usage:"
	echo "./setupVirtualCameras.sh [source camera id] [desired loopback video id]"
fi

sudo modprobe -r v4l2loopback

if [ $# -gt 1 ]
then
	DEVICEID=${2}
else
	DEVICEID=0
	DEVICENAME="video${DEVICEID}"

	while ! [[ -z $(ls /dev | grep ${DEVICENAME}) ]]
	do
		DEVICEID=$((DEVICEID+1))
	   	DEVICENAME="video${DEVICEID}"
	done
fi

eval "sudo modprobe v4l2loopback exclusive_caps=1 video_nr=${DEVICEID}"
eval "ffmpeg -i /dev/video${1} -f v4l2 -codec:v rawvideo -pix_fmt yuv420p /dev/video${DEVICEID}"
