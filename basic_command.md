# Basic Command
- เปิด `Power sell`, `Docek destop` ขึ้นมาเพื่อ run คำสั่งเหล่านี้

## For Dockerfile
### 1. `docker ps`
- เอาไว้เช็คว่ามี docker ตัวไหนทำงานอยู่ไหม
- ถ้าได้แบบนี้คือไม่มีตัวไหนกำลังทำงานอยู่

```
PS C:\Users\nur> docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```
- ถ้าขึ้นแบบนี้
```
PS C:\Users\nur> docker ps
CONTAINER ID   IMAGE         COMMAND                  CREATED          STATUS          PORTS      NAMES
aecf1fdbd24b   node-server   "docker-entrypoint.s…"   13 minutes ago   Up 13 minutes   8000/tcp   awesome_dijkstra
```
- แปลว่ามีอะไร run อยู่ ถ้า kill terminal ไม่ได้ให้เปิดใหม่
- แล้วใช้คำสั่ง
   `docker rm -f $(docker ps -a -q)` ลบ container ทั้งหมด
- จากนั้นลอง `docker ps` ดูอีกรอบก็จะกลับไปเป็นแบบแรก

### 2. `docker rm -f`
- เอาไว้ลบเฉพาะ container ที่ต้องการ

   `docker rm -f <contain name>`

### 3. `docker pull`
- เอาไว้ดึง docker ที่มีคนทำไว้แล้วบน [docker hub](https://hub.docker.com/)
- ในที่นี้ดึงตัว `hello-world` มา
- กรณี pull มาครั้งแรกจะโหลดนานหน่อย
- ถ้าทุกอย่างถูกต้องจะได้แบบนี้

```
PS C:\Users\nur> docker pull hello-world
Using default tag: latest
latest: Pulling from library/hello-world
17eec7bbc9d7: Pull complete
ea52d2000f90: Download complete
Digest: sha256:ef54e839ef541993b4e87f25e752f7cf4238fa55f017957c2eb44077083d7a6a
Status: Downloaded newer image for hello-world:latest
docker.io/library/hello-world:latest
PS C:\Users\nur> docker images
```

### 4. `docker images`
- เอาไว้เช็คว่าตอนนี้เรามี docker ตัวไหนอยู่บ้าง
- จะเห็นว่ามีตัว `hello-world` อยู่อันเดียว
```
PS C:\Users\nur> docker images
                                                                                                    i Info →   U  In Use
IMAGE                ID             DISK USAGE   CONTENT SIZE   EXTRA
hello-world:latest   ef54e839ef54       25.9kB         9.52kB
```

### 5. `docker run`
- เอาไว้ run images
- ลองรัน `hello-world` ที่พึ่ง pull มา
- จะได้ข้อความยาวๆนี้มา

```
PS C:\Users\nur> docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/

PS C:\Users\nur> cd D:\ect\docker
PS D:\ect\docker> ls
```

## For Docker-compose
- run ใน terminal vscode 
- path จะได้ตรงกับที่อยู่ไฟล์จริง
###  1. คำสั่ง run
- หลังจากเขียนไฟล์ Docker-compose เสร็จให้ run คำสั่งนี้
`docker-compose up -d --build`

### 2. คำสั่ง down
- ใช้ตอนที่แก้ไขไฟล์ Docker-compose
- แก้เสร็จต้องสั่ง `down` ก่อนแล้วค่อย run ใหม่
`docker-compose down`