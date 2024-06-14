#!/usr/bin/env python3
import serial
import json
import sys
import time
import socket
import paho.mqtt.client as mqtt
from picamera2 import Picamera2
import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url

# Variables
jsonObj_receive = {}		# Store json file for receiving data
jsonObj_send = {}			# Store json file for sending data
line_receive = "dumb_data"	# Store string of jsonObj_receive
line_send = "dumb_data"		# Store string of jsonObj_send
link  = "dumb_link"			# Store image's link
id_rasp = 1					# Store sensor and device's id
ip_rasp = ""				# Store IP address of raspberry pi
flag = str(id_rasp)			# Store cloudinary's flag
lamp = 20

# Define serial protocol with port
ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
ser.flush()

# Object Picamera
picam2 = Picamera2()
capture_config = picam2.create_still_configuration()

# Define function for mqtt protocol
def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    
    client.subscribe("DADN/iot/lamp/id1")

def on_message(client, userdata, msg):
    message = msg.payload.decode("utf-8")

    # Print the received message for debugging
    print(msg.topic + " receiving: " + message)

    if msg.topic == "DADN/iot/lamp/id1":
        global lamp
        try:
            lamp = int(message)
        except ValueError:
            print("'" + message + "' did not contain a number!")

def on_publish(client, userdata, result):
    print(userdata + " sending: " + result)
    
# Define function for detecting IP address
def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # This IP address is used to get the local IP address. It does not need to be reachable.
        s.connect(("8.8.8.8", 80))
        ip_address = s.getsockname()[0]
    except Exception:
        ip_address = "Unable to get IP address"
    finally:
        s.close()
    return ip_address

# Get IP address
ip_rasp = get_ip_address()

# Config cloudinary
cloudinary.config( 
  cloud_name = "dostnfbfw", 
  api_key = "473299891486395", 
  api_secret = "CJcWa8NG8T1ZsxuN9283ZK0NvSk" 
)

# Start mqtt protocol
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("test.mosquitto.org", 1883, 60)
client.loop_start()

while True:    
    # Get data from sensors
    if ser.in_waiting > 0:
        line_receive = ser.readline().decode('utf-8').rstrip()
        try:
            jsonObj_receive = json.loads(line_receive)
            ser.reset_input_buffer()
        except:
            print("Error")
    
    # Capture image
    picam2.start()
    time.sleep(2)
    picam2.switch_mode_and_capture_file(capture_config, "test_full.jpg")
    
    cloudinary.uploader.upload("test_full.jpg",
                            public_id=flag)
    link = cloudinary_url(flag)
    
    # Add image's link to json file
    jsonObj_receive["camera_data"] = link[0]
    
    # Add sensor and device's id, add IP address
    jsonObj_receive["id_sensor"] = id_rasp
    jsonObj_receive["ip_address"] = ip_rasp
    
    # Add lamp's data
    jsonObj_send["lamp"] = lamp;
    
    # Convert JSON file into string
    line_receive = json.dumps(jsonObj_receive)
    line_send = json.dumps(jsonObj_send)
    
    # Check valid
    if "light_data" in jsonObj_receive and "temp_data" in jsonObj_receive and "sound_data" in jsonObj_receive:
        # Publish the input data
        client.publish("DADN/iot/sensor/id1", line_receive)
        
    ser.write(line_send.encode('utf-8'))
    
    # Print the data for debugging
    print(line_receive)
    print(line_send)

    time.sleep(5)

client.disconnect()
client.loop_stop()