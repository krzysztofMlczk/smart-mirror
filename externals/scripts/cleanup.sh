#!/bin/bash

# This script performs a cleanup operation and
# tries to shut down all external modules
#

# face recognition module
RECOGNIZER_PID=$(pgrep face-recognizer)

if ! [ -z "$RECOGNIZER_PID" ]
then
	kill ${RECOGNIZER_PID}
fi

# v4l2loopback
GST_PID=$(pgrep gst-launch-1.0)

if ! [ -z "$GST_PID" ]
then
	kill ${GST_PID}
fi

sudo modprobe -r v4l2loopback
