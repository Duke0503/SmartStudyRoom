#include <OneWire.h>
#include <DallasTemperature.h>
#include <ArduinoJson.h>
#include <TimerOne.h>

#define SENSOR_LIGHT_PIN A5
#define SENSOR_TEMPERATURE_PIN 3
#define SENSOR_SOUND_PIN A1
#define AC_PIN 11

#define SOUND_THRESHOLD 338
#define DELAY_TIME 500

volatile int count = 0; // Variable to use as a counter volatile as it is in an interrupt
volatile boolean zero_cross = 0; // Boolean to store a "switch" to tell us if we have crossed zero

int read_light;
int read_temp;
int read_sound;
int write_lamp = 0;

int dim = 0; // Dimming level (0-128)  0 = on, 128 = 0ff
int count_up = 1; // Counting up or down, 1 = up, -1 = down
int freq_step = 65; // This is the delay-per-brightness step in microseconds

String inString = "";

OneWire oneWire(SENSOR_TEMPERATURE_PIN); // Setup a oneWire instance to communicate with any OneWire devices
DallasTemperature sensors(&oneWire); // Pass our oneWire reference to Dallas Temperature sensor 

void setup() {
  // Start the serial monitor
  Serial.begin(9600);

  // Start up the library
  sensors.begin();

  // Initiate digital pins as inputs
  pinMode(SENSOR_LIGHT_PIN, INPUT);
  pinMode(SENSOR_TEMPERATURE_PIN, INPUT);
  pinMode(SENSOR_SOUND_PIN, INPUT);

  // Set the Triac pin as output
  pinMode(AC_PIN, OUTPUT);
  attachInterrupt(0, zero_cross_detect, RISING);

  // Initialize TimerOne library for the freq we need
  Timer1.initialize(freq_step);
  Timer1.attachInterrupt(dim_check, freq_step);
}

void zero_cross_detect() {
  // Set the boolean to true to tell our dimming function that a zero cross has occured
  zero_cross = true;          
  count = 0;
  digitalWrite(AC_PIN, LOW);
}

void dim_check() {
  if (zero_cross == true) {
    if (count >= dim) {
      digitalWrite(AC_PIN, HIGH);
      count = 0;
      zero_cross = false;
    } else {
      count++;
    }
  }
}

void loop() {
  // Declare Json document to store data
  StaticJsonDocument<200> doc;
  StaticJsonDocument<200> doc2;

  // Read lamp's data from raspberry
  while (Serial.available() > 0) {
    inString = Serial.readStringUntil('\n');

    Serial.print(inString);

    deserializeJson(doc2, inString);
    write_lamp = doc2["lamp"];
    write_lamp = 120 - write_lamp;

    inString = "";
  }

  dim = map(write_lamp, 0, 100, 0, 128);

  // Reading analog signal from light sensor
  read_light = analogRead(SENSOR_LIGHT_PIN);
  doc["light_data"] = read_light;

  // Call sensors.requestTemperatures() to issue a global temperature and Requests to all devices on the bus
  sensors.requestTemperatures(); 
  read_temp = sensors.getTempCByIndex(0);
  doc["temp_data"] = read_temp;

  // Reading analog signal from sound sensor
  read_sound = analogRead(SENSOR_SOUND_PIN) - SOUND_THRESHOLD;
  if (read_sound < 0) {
    read_sound = -read_sound;
  }
  doc["sound_data"] = read_sound;

  // Turn Json document into string, send to serial monitor
  serializeJson(doc, Serial);
  Serial.println();

  // Delay time
 delay(DELAY_TIME);
}