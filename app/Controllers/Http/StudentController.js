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
        const { body } = request
        const { first_name, last_name, university_id } = body
        const data = await StudentModel.create(body)

        return { status: 200, error: undefined, data: data}
    }
    async update ({ request }) {
        const { params, body } = request
        const { id } = params
        const { first_name, last_name, university_id } = body
        let data = await StudentModel.find(id)
        data.merge(body)
        await data.save()

        return { status: 200, error: undefined, data: data}
    }
    async delete ({ request }) {
        const { params } = request
        const { id } = params
        let message = "";
        let data = await StudentModel.find(id)
        if(data !== null) {
            await data.delete()
            message = "Delete Success`"
        } else {
            message = "Delete Fail"
        }
        return { status: 200, error: undefined, message: message}
    }
}

module.exports = StudentController
