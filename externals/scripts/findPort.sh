#!/bin/bash

# This script contains a function that
# is seeking for free port on localhost
# and then prints it to stdout

function findPort {
	read LOWERPORT UPPERPORT < /proc/sys/net/ipv4/ip_local_port_range
	while :
	do
		PORT="`shuf -i $LOWERPORT-$UPPERPORT -n 1`"
		ss -lpn | grep -q ":$PORT " || break
	done

	echo "${PORT}"
}
