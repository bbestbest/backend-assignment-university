# Example API of student and university

## API Version : v1

## Student-Side

### Show every students

#### REQUEST 
    GET api/v1/student
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
    GET api/v1/student/:id
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
