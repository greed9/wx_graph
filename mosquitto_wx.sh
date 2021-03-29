#!/bin/bash
tail -f wx.csv |  awk -f indoor_outdoor.awk | mosquitto_pub -h 192.168.119 -l -t sensors/wx

