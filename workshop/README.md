# Workshop — ตัวอย่างเว็บพื้นฐาน (Client + Server)
![ex_docker](https://github.com/user-attachments/assets/4a66239f-7cce-4d0a-9547-d3846d7695e9)

- โฟลเดอร์ `workshop` เป็นตัวอย่างโปรเจคขนาดเล็กประกอบด้วย frontend แบบ static (HTML/JS/CSS) และ backend แบบ Node.js (Express) ที่เชื่อมต่อกับ MySQL
- ใช้เพื่อสาธิตการพัฒนาเว็บแบบเต็มสแตก, การเชื่อมต่อฐานข้อมูล และการรันด้วย Docker Compose

โครงสร้างไฟล์สำคัญ
- `workshop/client/` — ไฟล์ frontend (static): `index.html`, `index.js`, `style.css`, `user.html`, `user.js`
- `workshop/server/` — แอพ Node.js ที่ให้ API และให้บริการไฟล์ static ของ client
  - `workshop/server/index.js` — โค้ด Express ที่มี REST API สำหรับ `users`
  - `workshop/server/package.json` — ขึ้นตอน dependency
  - `workshop/server/docker-compose.yml` — คอนฟิกสำหรับรัน `node-server`, `db` (MySQL) และ `phpmyadmin`

สรุปฟังก์ชันหลักของตัวอย่าง
- Frontend: ฟอร์มสร้าง/แก้ไข user และเรียก API เพื่อบันทึกข้อมูล
- Backend: REST API สำหรับ CRUD users และเชื่อมต่อกับฐานข้อมูล MySQL

API (ที่ backend มีให้)
- `GET /users` — ดึงรายการผู้ใช้ทั้งหมด
- `POST /users` — สร้างผู้ใช้ใหม่ (body เป็น JSON fields ตามตาราง users)
- `GET /users/:id` — ดึงข้อมูลผู้ใช้ตาม `id`
- `PUT /users/:id` — แก้ไขผู้ใช้ตาม `id`
- `DELETE /users/:id` — ลบผู้ใช้ตาม `id`

ตัวอย่างฟิลด์ของตาราง `users` (ตามที่ frontend/โค้ดคาดหวัง)
- `id` (INT, PK, AUTO_INCREMENT)
- `firstname` (VARCHAR)
- `lastname` (VARCHAR)
- `age` (INT)
- `gender` (VARCHAR)
- `interests` (TEXT) — ค่าเช่น `coding, drawing`
- `description` (TEXT)

เรียกใช้งาน (Docker Compose)
1. เปลี่ยนไดเรกทอรีเป็น `workshop/server`

```bash
cd workshop/server
```

2. สร้างและรันบริการทั้งหมด (node server + mysql + phpMyAdmin)

```bash
docker compose up -d --build
```

3. หน้าเว็บตัวอย่าง
- เปิด `http://localhost:8000/` เพื่อเข้าถึง frontend (served โดย node)
- เปิด `http://localhost:8080/` เพื่อเข้าถึง phpMyAdmin (user: `root`, password: `root` ตามคอนฟิก)

4. หยุดและลบ container

```bash
docker compose down
```

รันแบบ local (ไม่ใช้ Docker)
- ติดตั้ง dependencies ใน `workshop/server` ด้วย `npm install` และรัน `node index.js` (ต้องมี MySQL ที่เชื่อมต่อได้ หรือปรับ `initMySQL` ใน `index.js` ให้ชี้ไปยังฐานข้อมูลที่มีอยู่)
- หากรัน server แบบ local ให้ตั้ง `BASE_URL` ใน `workshop/client/index.js` เป็น `http://localhost:8000` หรือที่อยู่ของ backend

หมายเหตุและคำแนะนำ
- พอร์ต: server เปิดที่ `8000` ในคอนฟิก; MySQL แมปเป็น `3307` บน host (ดู `workshop/server/docker-compose.yml`)
- หากฐานข้อมูลยังไม่มีตาราง `users` ให้สร้างตารางด้วย SQL ตัวอย่าง:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  age INT,
  gender VARCHAR(16),
  interests TEXT,
  description TEXT
);
```

- ไฟล์ `workshop/server/index.js` จะคาดหวังว่าฐานข้อมูลและตารางพร้อมใช้งานเมื่อเซิร์ฟเวอร์เริ่มต้น หากต้องการให้สร้างอัตโนมัติ ให้เพิ่มสคริปต์ migration เล็ก ๆ ก่อนเริ่ม server

ปัญหาที่อาจเจอ
- หาก `node` container เริ่มไม่สำเร็จ: ดู logs ของ container ด้วย `docker compose logs node-server` เพื่อตรวจสอบ error
- หากเชื่อมต่อ MySQL ไม่ได้: ตรวจสอบ environment variables (`MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`) และสถานะของ `db` container

ถ้าต้องการให้ผม:
- สร้าง SQL migration อัตโนมัติสำหรับตาราง `users`
- ปรับ `workshop/client/index.js` ให้รองรับ CORS/BASE_URL แบบอัตโนมัติ
- เพิ่มตัวอย่าง data หรือสคริปต์ seed

ให้บอกผมมาได้เลย ผมจัดให้ครับ
