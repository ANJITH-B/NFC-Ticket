
#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>
#include <MFRC522.h>
// Faz a Conexão o Banco de dados
#define FIREBASE_HOST "https://nfc-payment-242ac-default-rtdb.firebaseio.com/" 
#define FIREBASE_AUTH "IXKk6m6GOe6BHCmopUSMQOqai8f4rwcC3cEcgsNT" 

#define WIFI_SSID "TP-Link_35C8" 
#define WIFI_PASSWORD "86369954"
// Objeto da classe FirebaseData
FirebaseData firebaseData;
#define SS_PIN 15
#define RST_PIN 16
MFRC522 mfrc522(SS_PIN, RST_PIN);   // Cria instância com MFRC522
// --- Variáveis Globais --- 
char st[20];
// -|-- Configurações Iniciais --|-
void setup() 
{
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Serial.println("Aproxime o seu cartao do leitor 1...");
  Serial.begin(9600);   // Inicia comunicação Serial em 9600 baud rate
  SPI.begin();          // Inicia comunicação SPI bus
  mfrc522.PCD_Init();   // Inicia MFRC522

  Serial.println();
} //Final do setup
// |-- Loop Infinito --|
void loop() 
{
  // Nome do Banco de dados no Firebase
  String path = "/Pessoa/";
  
  // Faz a verificação de novos cartões
  if ( !mfrc522.PICC_IsNewCardPresent()) 
  {
    return;
  }
  // Faz a seleção de um dos cartões
  if ( !mfrc522.PICC_ReadCardSerial()) 
  {
    return;
  }
  
  String conteudo= "";
  //byte letra;
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
     Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
     Serial.print(mfrc522.uid.uidByte[i], HEX);
     conteudo.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
     conteudo.concat(String(mfrc522.uid.uidByte[i], HEX));
  }

  Serial.println();
  conteudo.toUpperCase();

    if (conteudo.substring(1) == "E0 10 59 1B"){
  conteudo = "Ariele Sousa";
    }
    if (conteudo.substring(1) == "5C 65 8C 10"){ 
  conteudo = "Herbet Silva";
    }
    if (conteudo.substring(1) == "FB B0 B3 2E"){ 
  conteudo = "Prof. Luís Cláudio";
    }
      if (conteudo.substring(1) == "B6 1B AE AC"){
  conteudo = "Otavio Belfort";
  }
    if (conteudo.substring(1) == "AA A6 8E 4B"){ 
  conteudo = "Anna Olivia";
    }
    
     
  // Contatena/associa o valor da Tag com um dos nós de referencia no banco de dados 
    String mensagem1 = String(conteudo) + "/tag";
    String mensagem2 = String(conteudo) + "/piso";
    String mensagem3 = String(conteudo) + "/ponto";
    String mensagem4 = String(conteudo) + "/complemento";
    
    Firebase.setString(firebaseData, path + mensagem1 ,String(conteudo));
    Firebase.setString(firebaseData, path + mensagem2 ,"Segundo Andar");
    Firebase.setString(firebaseData, path + mensagem3 ,"Loja iByte");
    Firebase.setString(firebaseData, path + mensagem4 ,"Próximo a Bibli Leitura");
    if (firebaseData.dataType() == "int"){
        Serial.println(firebaseData.intData());}
    //}
    else {
      Serial.println("REASON: " + firebaseData.errorReason());
    }
   
  }