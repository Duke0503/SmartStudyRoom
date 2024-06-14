#!/usr/bin/env python3
import serial
import json
import sys

ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
ser.flush()

while True:
    if ser.in_waiting > 0:
        line = ser.readline().decode('utf-8').rstrip()
        print(line)
        try:
            jsonObj = json.loads(line)
            ser.reset_input_buffer()
        except:
            print("Error")
