#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <OneWire.h>
#include <ArduinoJson.h>


// Replace with your network credentials
const char* ssid = "MOVISTAR_0342";
const char* password = "00D2E426FB42601C40EF";
const char* host = "192.168.0.62";
int sensor_id = 2;
HTTPClient http;

OneWire  ds(2);  // on pin 2 (a 4.7K resistor is necessary)

void setup() {
Serial.begin(115200);
delay(10);

// Connect to WiFi network
Serial.println();
Serial.println();
Serial.print("Connecting to ");
Serial.println(ssid);

WiFi.begin(ssid, password);

while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".....");
    delay(500);

}




// Print the IP address
Serial.println(WiFi.localIP());
}

void loop() {

byte i;
byte present = 0;
byte type_s;
byte data[12];
byte addr[8];
float celsius, fahrenheit;

// if ( !ds.search(addr)) {
// Serial.println("No more addresses.");
// ds.reset_search();
// delay(250);
// return;
// }


// // the first ROM byte indicates which chip
// switch (addr[0]) {
// case 0x10:
// Serial.println("  Chip = DS18S20");  // or old DS1820
// type_s = 1;
// break;
// case 0x28:
// Serial.println("  Chip = DS18B20");
// type_s = 0;
// break;
// case 0x22:
// Serial.println("  Chip = DS1822");
// type_s = 0;
// break;
// default:
// Serial.println("Device is not a DS18x20 family device.");
// return;
// }

// ds.reset();
// ds.select(addr);
// ds.write(0x44, 1);        // start conversion, with parasite power on at the end

// delay(1000);     // maybe 750ms is enough, maybe not
// // we might do a ds.depower() here, but the reset will take care of it.

// present = ds.reset();
// ds.select(addr);
// ds.write(0xBE);         // Read Scratchpad

// Serial.print("  Data = ");
// Serial.print(present, HEX);
// Serial.print(" ");
// for ( i = 0; i < 9; i++) {           // we need 9 bytes
// data[i] = ds.read();
// Serial.print(data[i], HEX);
// Serial.print(" ");
// }
// Serial.print(" CRC=");
// Serial.print(OneWire::crc8(data, 8), HEX);
// Serial.println();

// int16_t raw = (data[1] << 8) | data[0];
// if (type_s) {
// raw = raw << 3; // 9 bit resolution default
// if (data[7] == 0x10) {
// // "count remain" gives full 12 bit resolution
// raw = (raw & 0xFFF0) + 12 - data[6];
// }
// } else {
// byte cfg = (data[4] & 0x60);
// // at lower res, the low bits are undefined, so let's zero them
// if (cfg == 0x00) raw = raw & ~7;  // 9 bit resolution, 93.75 ms
// else if (cfg == 0x20) raw = raw & ~3; // 10 bit res, 187.5 ms
// else if (cfg == 0x40) raw = raw & ~1; // 11 bit res, 375 ms
// //// default is 12 bit resolution, 750 ms conversion time
// }
// celsius = (float)raw / 16.0;
StaticJsonDocument<300> doc;   //Declaring static JSON buffer
doc["sensor_id"] = sensor_id;
doc["value"] = 2;
doc["type"] = "temperature";
String output;
serializeJson(doc, output);
http.begin("http://192.168.1.40:3001/data");
int httpCode = http.POST(output);
Serial.println(output);
http.end();


delay(5000);
}