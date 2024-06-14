import time

from picamera2 import Picamera2

picam2 = Picamera2()
capture_config = picam2.create_still_configuration()

picam2.start()
time.sleep(2)
picam2.switch_mode_and_capture_file(capture_config, "test_full.jpg")

