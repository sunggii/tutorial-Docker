const express = require('express')
const mysql = require('mysql2/promise')
const path = require('path')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 8000
app.use(bodyparser.json())
app.use(cors())
//เพื่อให้เข้า http://localhost:8000/index.htmlแล้วเจอเว็บที่เข็น
//(เอาเว็บขึ้น server)
app.use(express.static(path.join(__dirname, 'client')))


/*
✅GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
✅POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
✅GET /users/:id สำหรับการดึง users รายคนออกมา
✅PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
✅DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
*/

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'db', // หรือใส่เป็น localhost ก็ได้
    user: 'root',
    password: 'root',
    database: 'tutorial'
  })
}

app.get('/server', (req, res) => {
  res.send('connected to server')
})

/*---------------------------------*/
const validateData = (userData) => {
    let errors = []

    if (!userData.firstname) {
        errors.push('input firstname')
    }
    if (!userData.lastname) {
        errors.push('input lastname')
    }
    if (!userData.age) {
        errors.push('input age')
    }
    if (!userData.gender) {
        errors.push('input gender')
    }
    if (!userData.interests) {
      errors.push('input interests')
    }
    if (!userData.description) {
        errors.push('input description')
    }

    return errors
}
/*---------------------------------*/

// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/users', async (req, res) => {
  const [results] = await conn.query('SELECT * FROM users')
  res.json(results)
})

// path  = POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/users', async (req, res) => {
  try {
    const userData = req.body    
    const errors = validateData(userData)
    if (errors.length > 0){
      throw {
        message: 'missing data' ,
        errors: errors
      }
    }                     
    const results  = await conn.query('INSERT INTO users SET ?', userData) //ใส่ ? เพื่อจะได้ใส่ userData

    res.json({ 
      message: 'insert ok', 
      data: results[0] 
    })

  } catch (error) {
    const errorMassage = error.message || 'somthing wrong'
    const errors = error.errors || []

    console.error('Error message', error.message)
    res.status(500).json({
      message: errorMassage ,
      errors: errors
    })
  }
})

//path = GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/users/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('SELECT * FROM users WHERE id = ?' , id) //ชื่อต้องตรงกับ DB
    console.log('result: ', results)

    //if check ว่ามีไหม เพราะถ้าไม่มีมันจะเป็นค่าว่าง หรือ == 0
    if (results[0].length == 0 ){
      throw {statusCode: 404, message: 'not found'}
    }
    res.json(results[0][0]) //จะได้ออกมาเป็น obj
    //res.json(results[0]) //จะได้ออกมาเป็น array

  } catch (error) {
    console.error('Error message', error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: 'somthing wrong' ,
      errorMassage: error.message
    })
  }
})

//path = PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id', async (req, res) => {
  try {
    let id = req.params.id
    let updateUser = req.body
    const results  = await conn.query(
      'UPDATE users SET ? WHERE id = ?', 
      [updateUser , id]
    )

    res.json({ 
      message: 'update ok', 
      data: results[0] 
    })

  } catch (error) {
    console.error('Error message', error.message)
    res.status(500).json({
      message: 'somthing wrong'
    })
  }
})

// path = DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/users/:id', async (req, res) => {
 try {
    let id = req.params.id
    const results  = await conn.query('DELETE FROM users WHERE id = ?', id)

    res.json({ 
      message: 'delete ok', 
      data: results[0] 
    })

  } catch (error) {
    console.error('Error message', error.message)
    res.status(500).json({
      message: 'somthing wrong'
    })
  }
})

app.listen(port, async () => {
  await initMySQL()
  console.log(`Server running at http://localhost:${port}/`)
})