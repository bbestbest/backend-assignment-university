'use strict'

const StudentModel = use('App/Models/Student')

class StudentController {
    async index () {
        const data = await StudentModel.query().fetch()

        return { status: 200, error: undefined, data: data}
    }
    async show ({ request }) {
        const { id } = request.params
        const data = await StudentModel.find({id})

        return { status: 200, error: undefined, data: data}
    }
    async store ({ request }) {
        const { first_name, last_name } = request.body
        const data = await StudentModel.create(body)

        return { status: 200, error: undefined, data: data}
    }
}

module.exports = StudentController
