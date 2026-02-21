# Docker — ตัวอย่างและข้อมูลสำหรับรัน MySQL ด้วย Docker

คำอธิบายสั้น ๆ: ตัวอย่างเซ็ตอัพ Docker สำหรับรัน MySQL พร้อมข้อมูลตัวอย่างเพื่อการทดสอบ, สำรอง และกู้คืน

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

เริ่มใช้งาน (Quick start)
1. เปลี่ยนไปที่โฟลเดอร์ `example`

```bash
cd example
```

2. เรียกใช้ Docker Compose (สร้าง image ถ้าจำเป็น และรันเป็น background)

```bash
docker compose up -d --build
```

3. ดู logs ของบริการ

```bash
docker compose logs -f
```

4. หยุดและลบคอนเทนเนอร์ (เมื่อเลิกใช้งาน)

```bash
docker compose down
```

การใช้งานเพิ่มเติม
- หากต้องการเชื่อมต่อเข้า MySQL จากเครื่อง host ให้ดูการตั้งค่า port ใน `example/docker-compose.yml` (ปกติจะเป็น `3306:3306`)
- หากต้องการรีสโตร์ข้อมูลโดยใช้โฟลเดอร์ `example/data` ให้แน่ใจว่า permission และ ownership ของไฟล์ถูกต้องสำหรับ user ที่รัน MySQL

อ้างอิง
- บทความต้นฉบับที่เป็นแนวทาง: https://docs.mikelopster.dev/c/basic/docker/intro