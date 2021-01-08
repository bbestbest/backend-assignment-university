# About the project
This is Adonis CRUD api project for student side and university side, you can store student data when there are university in datbase

## API Version : v1
so url will be api/:version/ 

## Run the apllication
    adonis serve --dev

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
    
### Show student by id

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
### Create student infomation by following requirement
#### REQUEST
    medthod: POST api/:version/student
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringsify({
      first_name: "John",
      last_name: "Doe",
      university_name: "Hogwarts"
    })
#### RESPONSE
##### FOUND University
    "status": 200,
    "data": {
        "student": [
            {
                "first_name": "John",
                "last_name": "Doe",
                "created_at": "NULL",
                "updated_at": "NULL",
                "id": 1
            }
        ],
        "universty_name": "Hogwarts",
        "education_degree": "master"
    },
    "message": "Success"
##### NOT FOUND University
    "status": 200,
    "message": "University not found"
##### IF NOT FOUND Degree then will create degree
    "status": 200,
    "message": "Create degree for university"
### Update student infomation
#### REQUEST
    medthod: PUT api/:version/student/:id
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringsify({
      first_name: "Jack",
      last_name: "Snow",
    })
#### RESPONSE
##### BEFORE
    "status": 200,
    "data": {
        "first_name": "John",
        "last_name": "Doe",
        "created_at": "null",
        "updated_at": "null",
        "id": 1
    }
##### AFTER
    "status": 200,
    "data": {
        "first_name": "Jack",
        "last_name": "Snow",
        "created_at": "null",
        "updated_at": "null",
        "id": 1
    }
### Delete student infomation by id
#### REQUEST
    medthod: DELETE api/:version/student/:id
#### RESPONSE 
    "status": 200,
    "message": "Item ${id} is destroying"
## University-Side

### Show every university

#### REQUEST 
    medthod: GET api/:version/university
#### RESPONSE
    "status": 200,
    "data": [
        {
            "id": 1,
            "short_name": "HW",
            "last_name": "Hogwarts",
            "created_at": null,
            "updated_at": null
        }
    ]
    
### Show university by id

#### REQUEST
    medthod: GET api/:version/university/:id
#### RESPONSE
    "status": 200,
    "data": [
        {
            "id": 1,
            "short_name": "HW",
            "full_name": "Hogwarts",
            "created_at": null,
            "updated_at": null,
            "students": [
                {
                    "id": 1,
                    "first_name": "John",
                    "full_name": "Doe",
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
### Create university infomation by following requirement
#### REQUEST
    medthod: POST api/:version/university
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringsify({
      short_name: "HW",
      full_name: "Hogwarts",
      university_name: "Hogwarts"
    })
#### RESPONSE
    "status": 200,
    "data": {
        "short_name": "HW",
        "last_name": "Hogwarts",
        "created_at": "null",
        "updated_at": "null",
        "id": 1
    }
### Update university infomation
#### REQUEST
    medthod: PUT api/:version/university/:id
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringsify({
      short_name: "Todai",
      full_name: "The University of Tokyo",
    })
#### RESPONSE
##### BEFORE
    "status": 200,
    "data": {
        "short_name": "HW",
        "full_name": "Hogwarts",
        "created_at": "null",
        "updated_at": "null",
        "id": 1
    }
##### AFTER
    "status": 200,
    "data": {
        "short_name": "Todai",
        "full_name": "The University of Tokyo",
        "created_at": "null",
        "updated_at": "null",
        "id": 1
    }
### Delete university infomation by id
#### REQUEST
    medthod: DELETE api/:version/university/:id
#### RESPONSE 
    "status": 200,
    "message": "Item ${id} is destroying"
