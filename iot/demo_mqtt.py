import paho.mqtt.client as mqtt
import time

lamp = 0
image = ""

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    
    client.subscribe("DADN/iot/lamp")

def on_message(client, userdata, msg):
    message = msg.payload.decode("utf-8")

    # Print the received message for debugging
    print(msg.topic + " receiving: " + message)

    if msg.topic == "DADN/iot/lamp":
        global lamp
        try:
            lamp = int(message)
        except ValueError:
            print("'" + message + "' did not contain a number!")

def on_publish(client, userdata, result):
    print(userdata + " sending: " + result)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("test.mosquitto.org", 1883, 60)
client.loop_start()

while True:
    # Print the lamp data for debugging
    print(lamp)

    # Publish the sensor data
    client.publish("DADN/iot/sensor", "send_sensor")
    
    # Publish image link
    client.publish("DADN/iot/camera", "send_image")

    time.sleep(3)

client.disconnect()
client.loop_stop()
