# การใช้งาน API ข้อมูลนักศึกษากับมหาลัย
## แสดงรายชื่อของ มหาวิทยาลัย ทั้งหมด
### Request
`GET /univercities`
### Response
`{
    "status": 200,
    "data": [
        {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "created_at": null,
            "updated_at": null,
            "universities": [
                {
                    "id": 1,
                    "short_name": "Hogwarts",
                    "full_name": "Hogwarts School of Witchcraft and Wizardry",
                    "created_at": null,
                    "updated_at": null,
                    "pivot": {
                        "university_id": 1,
                        "student_id": 1
                    }
                },
            ]
}`
GET /univercities/:id -> แสดงข้อมูลของ มหาวิทยาลัย ที่ id ตรงกับใน database พร้อมทั้งรายชื่อของ นักศึกษา ที่ศึกษาอยู่ทั้งหมด
POST /univercities -> เพิ่มมหาวิทยาลัย
PUT /univercities/:id -> แก้ไขข้อมูล มหาวิทยาลัย ที่ id ตรงกับใน database
DELETE /univercities/:id -> ลบ มหาวิทยาลัย ที่ id ตรงกับใน database
GET /students -> แสดงรายชื่อของ นักศึกษา ทั้งหมด
GET /students/:id -> แสดงข้อมูลของ นักศึกษา ที่ id ตรงกับใน database พร้อมทั้งรายชื่อของ มหาวิทยาลัย ที่นักศึกษาศึกษาอยู่ทั้งหมด
POST /students -> เพิ่ม นักศึกษา
PUT /students/:id -> แก้ไขข้อมูล นักศึกษา ที่ id ตรงกับใน database
DELETE /students/:id -> ลบ นักศึกษา ที่ id ตรงกับใน database
