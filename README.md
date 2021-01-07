# Example API of student and university

## API Version : v1

## Student-Side

### Show every students

#### REQUEST 
    medthod: GET api/:version/student
#### RESPONSE
    "status": 200,
    "data": [
        {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "created_at": null,
            "updated_at": null
        }
    ]
    
### Show student by following id

#### REQUEST
    medthod: GET api/:version/student/:id
#### RESPONSE
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
                    "short_name": "HW",
                    "full_name": "Hogwarts",
                    "created_at": null,
                    "updated_at": null,
                    "pivot": {
                        "university_id": 1,
                        "student_id": 1
                    }
                }
            ]
        }
    ]
### Create student infomation by requirement
#### REQUEST
    medthod: POST api/:version/student
    
    body: JSON.stringsify({
      first_name: "John",
      last_name: "Doe",
      university_name: "Hogwarts"
    })
#### RESPONSE
    "status": 200,
    "data": {
        "first_name": "John",
        "last_name": "Doe",
        "created_at": "null",
        "updated_at": "null",
        "id": 1
    }
