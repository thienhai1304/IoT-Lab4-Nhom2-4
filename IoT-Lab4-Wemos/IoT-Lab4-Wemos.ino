#include <ESP8266WiFi.h>               
#include <WebSocketsClient.h>         
#include <Wire.h>
#include <BH1750.h>
#include <DHT.h>
#include <PubSubClient.h>

#define DHTPIN 14
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
BH1750 lightMeter;
WebSocketsClient webSocket;
WiFiClient espClient;
PubSubClient client(espClient);

float lux;
float h;
float t;
String IP;
String message;
String dataTemp;
String dataHumid;
String dataLight;

const char* ssid = "UiTiOt-E3.1";
const char* password = "UiTiOtAP";   

const char* mqttServer = "172.31.251.191";
const int mqttPort = 1883;
const char* mqttUser = "";
const char* mqttPassword = "";

const int led_1 = 13;                      
const int led_2 = 12;

unsigned long lastTime = 0;

char* char_arr;
String str_obj;

void setup() {
  Serial.begin(115200);                 

  pinMode(led_1, OUTPUT);
  pinMode(led_2, OUTPUT);
  
  startWiFi();
  
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
  
  startMQTT();
  
  connectWebSocket();
  
  dht.begin();
  Wire.begin();  
  lightMeter.begin();
}

void loop() {
  webSocket.loop();
  client.loop();
  if(millis() - lastTime > 3000) {
    lux = lightMeter.readLightLevel();
 
    h = dht.readHumidity();
    t = dht.readTemperature();
  
    if (isnan(h) || isnan(t)) {
      Serial.println(F("Failed to read from DHT sensor!"));
    }
    
    dataTemp = IP + " " + (String)t;
    char_arr = &dataTemp[0];
    client.publish("lab4/nhom24/dht/temp", char_arr);
    
    dataHumid = IP + " " + (String)h;
    char_arr = &dataHumid[0];
    client.publish("lab4/nhom24/dht/humid", char_arr);
    
    dataLight = IP + " " + (String)lux;
    char_arr = &dataLight[0];
    client.publish("lab4/nhom24/bh1750/lux", char_arr);
    
    str_obj = IP + " " + (String)digitalRead(led_1);
    char_arr = &str_obj[0];
    client.publish("lab4/nhom24/led/1", char_arr);

    str_obj = IP + " " + (String)digitalRead(led_2);
    char_arr = &str_obj[0];
    client.publish("lab4/nhom24/led/2", char_arr);
 
    Serial.println((String)t + " " + (String)h + " " + (String)lux);
    webSocket.sendTXT("Insert");
    lastTime = millis();
  }
  
}

void startMQTT() {
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
 
    if (client.connect("ESP8266Client", mqttUser, mqttPassword )) {
 
      Serial.println("connected");  
 
    } else {
 
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
 
    }
  }
  client.subscribe("lab4/nhom24/controller/led/1");
  client.subscribe("lab4/nhom24/controller/led/2");
}

void callback(char* topic, byte* payload, unsigned int length) {
 
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
 
  Serial.print("Message:");

  message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
    Serial.print((char)payload[i]);
  }
  Serial.println();
  
  if ((String)topic == "lab4/nhom24/controller/led/1") {
    if (message == "on") {
      digitalWrite(led_1,1);
      str_obj = IP + " " + 1;
      char_arr = &str_obj[0];
      client.publish("lab4/nhom24/led/1", char_arr);
    }
    else {
      digitalWrite(led_1,0);
      str_obj = IP + " " + 0;
      char_arr = &str_obj[0];
      client.publish("lab4/nhom24/led/1", char_arr);
    }
  }
  else if ((String)topic == "lab4/nhom24/controller/led/2") {
    if (message == "on") {
      digitalWrite(led_2,1);
      str_obj = IP + " " + 1;
      char_arr = &str_obj[0];
      client.publish("lab4/nhom24/led/2", char_arr);
    }
    else {
      digitalWrite(led_2,0);
      str_obj = IP + " " + 0;
      char_arr = &str_obj[0];
      client.publish("lab4/nhom24/led/2", char_arr);
    }
  }
}
 
void startWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to ");
  Serial.print(ssid);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\n");
  Serial.println("Connection established!");
  Serial.print("IP address: ");
  IP = IpAddressToString(WiFi.localIP());
  Serial.println(WiFi.localIP());     
}

void connectWebSocket() {
  webSocket.begin("172.31.250.140", 8081);          // Địa chỉ websocket server, port và URL
  webSocket.onEvent(webSocketEvent);

  webSocket.setReconnectInterval(5000);                     // Thử lại sau 5s nếu kết nối không thành công
}

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  
  switch (type) {
    case WStype_DISCONNECTED:                         
      Serial.printf("[WSc] Disconnected!\n");
      break;
      
    case WStype_CONNECTED:                            
      Serial.printf("[WSc] Connected to url: %s\n", payload);
      webSocket.sendTXT("Wemos D1 connected");          
      break;
  }
}

String IpAddressToString(const IPAddress& ipAddress) {
  return String(ipAddress[0]) + String(".") +\
  String(ipAddress[1]) + String(".") +\
  String(ipAddress[2]) + String(".") +\
  String(ipAddress[3])  ;
}
