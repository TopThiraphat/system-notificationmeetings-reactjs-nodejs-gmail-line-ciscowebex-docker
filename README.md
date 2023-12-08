# notificationmeetings-reactjs-nodejs-gmail-line-ciscowebex-docker

- เป็นระบบ notification meetings ที่สามารถแจ้งเตือนการประชุมผ่าน Gmail และ Line  ที่พัฒนาด้วย ReactJS เป็น frontend และใช้ NodeJS เป็น Webservice API โดยใช้ framework ที่ชื่อว่า Express 
- โดยระบบสร้างห้องประชุมผ่าน Web Conference ชื่อ Cisco Webex Meetings
- ใช้ฐานข้อมูล SQLite 
- โดยระบบทั้งหมด deploy บน virtualization technology คือ Docker

## Tech Stack in Project 

- **Language**
    - javascript(reactjs)
    - javascript(nodejs)
- **State Management**
    - react redux
    - redux logger
    - redux thunk
- **Framework**
    - bootstrap v3.3.7 
    - template adminLTE v2.4.0
- **Virtualization Technology**
    - docker
- **Database**
    - sqlite
- **Object Relational Mapping**
    - sequelize

## Get Started
1. install Docker
- [Installation Docker](https://docs.docker.com/engine/install/)

2. install project with Shell script for Linux

```bash
  cd notificationmeetings-reactjs-nodejs-gmail-line-ciscowebex-docker
  cd sh
  su
  Password: <password admin>
  ./install.sh 
```

## Screenshots
![App Screenshot](./screenshots/login.png)
to search for Webex Token [webex](https://developer.webex.com/docs/getting-started)

![App Screenshot](./screenshots/main.png)
![App Screenshot](./screenshots/invit_to_gmail.png)
![App Screenshot](./screenshots/detail_invit_to_gmail.png)
![App Screenshot](./screenshots/gmail.png)
![App Screenshot](./screenshots/invit_to_line.png)
![App Screenshot](./screenshots/detail_invit_to_line2.png)
![App Screenshot](./screenshots/line.png)

## Used By
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/TopThiraphat)

## Support Me
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/R5R0RDJVK)














