'use strict'

const UniversityModel = use('App/Models/University')

class StudentController {
    async index () {
        const data = await UniversityModel.query().fetch()

        return { status: 200, error: undefined, data: data}
    }
    async show ({ request }) {
        const { id } = request.params
        const data = await UniversityModel.query().with('students').where({id}).fetch()

        return { status: 200, error: undefined, data: data}
    }
    async store ({ request }) {
        const { body } = request
        const { short_name, full_name } = body
        const data = await UniversityModel.create(body)

        return { status: 200, error: undefined, data: data}
    }
    async update ({ request }) {
        const { params, body } = request
        const { id } = params
        const { short_name, full_name } = body
        let data = await UniversityModel.find(id)
        data.merge(body)
        await data.save()

        return { status: 200, error: undefined, data: data}
    }
    async delete ({ request }) {
        const { params } = request
        const { id } = params
        let message = "";
        let data = await UniversityModel.find(id)
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
