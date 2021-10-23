#!/bin/bash

# This script changes screen orientation to horizontal
# or vertical
#
# Usage:
# ./changeScreenOrientation.sh [ normal | left | right ]
#

if ! [ -z "${1}" ]
then
	if [ "${1}" = "normal" ];
	then
		ORIENTATION="normal"
	elif [ "${1}" = "left" ];
	then
		ORIENTATION="left"
	elif [ "${1}" = "right" ];
	then
		ORIENTATION="right"
	else
		echo "Unknown parameter: ${1}"
		echo "Use 'normal' or 'left' or 'right'"
		exit 1
	fi
else
	ORIENTATION="normal"
fi

xrandr --output LVDS-1-1 --rotate ${ORIENTATION}

