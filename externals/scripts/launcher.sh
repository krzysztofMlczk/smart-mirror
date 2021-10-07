#!/bin/bash

# This script launches the cpp face recognition module;
# if there is already running instance, it is killed first
#
# Usage:
# ./launcher.sh [sender port] [receiver port] [camera id]
#

source ./findPort.sh

PATH_TO_RECOGNIZER="../face_recognizer/output/face-recognizer"

if [ -z "${3}" ]
then
	CAMERA_ID="1"
else
	CAMERA_ID=${3}
fi

PARAMS="--cameraId ${CAMERA_ID}"

RECOGNIZER_PID=$(pgrep face-recognizer)

if ! [ -z "$RECOGNIZER_PID" ]
then
	kill ${RECOGNIZER_PID}
fi

if [ -z "${1}" ]
then
	PORT_SENDER=$(findPort)
else
	PORT_SENDER=${1}
fi

if [ -z "${2}" ]
then
	PORT_RECEIVER=$(findPort)
else
	PORT_RECEIVER=${2}
fi

eval "${PATH_TO_RECOGNIZER} --portSend ${PORT_SENDER} --portReceive ${PORT_RECEIVER} ${PARAMS}"
