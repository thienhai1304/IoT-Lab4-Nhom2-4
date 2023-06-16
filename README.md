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

![Dashboard1](https://github.com/thienhai1304/IoT-Lab4-Nhom2-4/blob/main/images/dashboard1.png)
![Dashboard2](https://github.com/thienhai1304/IoT-Lab4-Nhom2-4/blob/main/images/dashboard2.png)

## Main Page
![info_sensors](https://github.com/thienhai1304/IoT-Lab4-Nhom2-4/blob/main/images/info_sensors.png)

## Log Page
![log](https://github.com/thienhai1304/IoT-Lab4-Nhom2-4/blob/main/images/log.png)

## Chart Page
![chart](https://github.com/thienhai1304/IoT-Lab4-Nhom2-4/blob/main/images/chart.png)

## Sign up Page
![signup](https://github.com/thienhai1304/IoT-Lab4-Nhom2-4/blob/main/images/signin.png)

## Sign in Page
![signin](https://github.com/thienhai1304/IoT-Lab4-Nhom2-4/blob/main/images/signup.png)
