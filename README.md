# IoT-Lab4

We collect data from sensors every 3s and publish them by MQTT to topics. Next, we build NodeJS server to receive data by subscribing topics. Finally, we display realtime data sent from server to website through websocket.

- On [Dashboard](#dashboard-page) page, display status of Wemos and Raspberry Pi (PENDING, INACTIVE, ACTIVE).
- On [Main](#main-page) page, data obtained from sensors (DHT11, BH1750) and allow users to activate/ deactivate LED on the website.
- On [Log](#log-page) page, logs of information sent to Server and also enable users to export information displayed on the screen as CSV file.
- On [Chart](#chart-page) page, every 3.5s, data are automatically updated.
- We also provide [Sign up](#sign-up-page), [Sign in](#sign-in-page) function for users.

## Dashboard Page
- PENDING: yellow
- INACTIVE: red
- ACTIVE: green

![Dashboard1](images\dashboard1.png)
![Dashboard2](images\dashboard2.png)

## Main Page
![info_sensors](images\info_sensors.png)

## Log Page
![log](images\log.png)

## Chart Page
![chart](images\chart.png)

## Sign up Page
![signup](images\signup.png)

## Sign in Page
![signin](images\signin.png)