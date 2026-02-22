# Docker — ตัวอย่างและข้อมูลสำหรับรัน MySQL ด้วย Docker

ตัวอย่างเซ็ตอัพ Docker สำหรับรัน MySQL พร้อมข้อมูลตัวอย่างเพื่อการทดสอบ, สำรอง และกู้คืน

คำอธิบาย
- repo นี้เก็บตัวอย่างการรัน MySQL (ผ่าน Docker / Docker Compose) และชุดไฟล์ข้อมูลฐานข้อมูลที่ใช้ทดสอบ/สำรองข้อมูล
- เหมาะสำหรับการทดลอง เรียนรู้การ mount data directory, การจัดการ binlog และการรีสโตร์ข้อมูลแบบ local

โครงสร้างโปรเจค (สำคัญ)
- [example/docker-compose.yml](example/docker-compose.yml) : คอนฟิก Docker Compose สำหรับรันบริการ
- [example/Dockerfile](example/Dockerfile) :image build ขั้นตอนเสริม
- [example/index.js](example/index.js) : ตัวอย่างสคริปต์/ยูทิลิตี้ที่ร่วมใช้งาน (ถ้ามี)
- [example/data/](example/data/) : โฟลเดอร์ข้อมูลของ MySQL (ไฟล์ ibdata, binlog, undo, log ต่าง ๆ)

ข้อควรระวังเกี่ยวกับโฟลเดอร์ `example/data`
- ไฟล์ในนี้เป็นไฟล์ข้อมูลของ MySQL จริง (สามารถมีขนาดใหญ่) — อย่าแก้หรือลบทิ้งโดยไม่แน่ใจ
- หากนำไปใช้ ให้หยุดคอนเทนเนอร์ MySQL ก่อนแก้ไฟล์ในโฟลเดอร์นี้ เพื่อป้องกันความเสียหายของข้อมูล

ความต้องการ (Prerequisites)
- ติดตั้ง Docker และ Docker Compose (หรือ Docker Desktop ที่มี Compose)
- พื้นที่ดิสก์เพียงพอสำหรับไฟล์ข้อมูล MySQL

## Workshop — ตัวอย่างเว็บ (client + server)
ตัวอย่างเว็บ: [go to site](https://powerful-cyan-tvgn1xakgz.edgeone.app/)
- ตำแหน่ง: `workshop/`
- โครงสร้างย่อย:
	- `workshop/client` : เว็บหน้า frontend แบบ static (ไฟล์ `index.html`, `index.js`, `style.css`, `user.html`, `user.js`)
	- `workshop/server` : แอพ Node.js (Express) ที่ให้ API สำหรับจัดการ `users` และให้บริการไฟล์ static ของ `client`

คำอธิบายสั้น ๆ:
- แอพตัวอย่างนี้ประกอบด้วย frontend แบบ static ที่ส่งคำขอไปยัง backend (ฐานข้อมูล MySQL) เพื่อสร้าง/อ่าน/แก้ไข/ลบ user
- backend ใช้ MySQL container (กำหนดใน `workshop/server/docker-compose.yml`) และเปิดพอร์ต `8000` สำหรับ API

เรียกใช้งานแบบรวดเร็ว (ด้วย Docker Compose)

1. เข้าไปที่โฟลเดอร์ `workshop/server`

```bash
cd workshop/server
```

2. สร้างและรัน container (จะสร้าง `node-server`, `db` และ `phpmyadmin` ตามคอนฟิก)

```bash
docker compose up -d --build
```

3. เปิดเว็บตัวอย่าง
- Frontend (จาก container node): http://localhost:8000/
- phpMyAdmin: http://localhost:8080/ (user: `root`, password: `root` ตามคอนฟิก)

4. หยุดและลบคอนเทนเนอร์เมื่อเสร็จ

```bash
docker compose down
```

อ้างอิง
- บทความต้นฉบับที่เป็นแนวทาง: https://docs.mikelopster.dev/c/basic/docker/intro
<<<<<<< HEAD

=======
>>>>>>> 61fef072b55382b2cd85f4cdbe826968e4f8b3b9
