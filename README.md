![gruppo lineCode](https://imagizer.imageshack.com/img923/557/86bUrf.png)

# Sensors - PORTACS
Componente Sensors per l'applicativo PORTACS sviluppato come attività progettuale per il corso di Ingegneria del Software dell'Università degli Studi di Padova sotto il nominativo di Progetto _PORTACS_.

## Overview
L'applicativo funge da simulatore per la generazione degli ostacoli da servire all'unità robotica a guida autonoma in un contesto di ristorazione, ed é pensato per funzionare in collegamento alla componente della stessa.

## Installazione, dipendenze ed esecuzione
Dipendenze:
 - Node.js
 - npm
 - Docker
 
 Clonare repo con:
 ```shell
 git clone https://github.com/lineCode-swe/sensors.git
 ```
 
Compilazione dell'applicativo con:
 ```shell
npx tsc main.ts
 ```
 
Creazione della Docker image:
  ```shell
docker build -t portacs-sensors
 ```
 
Avvio della Docker image:
 ```shell
 docker run --network portacs-net
 ```
 
Viene precisato che per interagire con la componente é necessario stabilire una connessione tramite websocket con la stessa.
Ció é possibile, in ambienti UNIX-like, attraverso l'utilizzo dell'applicativo [websocat](https://github.com/vi/websocat), collegandosi all'indirizzo ws://127.0.0.1:8082
