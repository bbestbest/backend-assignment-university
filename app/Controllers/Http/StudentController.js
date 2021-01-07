'use strict'

const StudentModel = use('App/Models/Student')
const BridgeModel = use('App/Models/Bridge')
const UniversityModel = use('App/Models/University')

class StudentController {
    async index () {
        const data = await StudentModel.query().fetch()

        return { status: 200, error: undefined, data: data}
    }
    async show ({ request }) {
        const { id } = request.params
        const data = await StudentModel.query().with('universities').where({id}).fetch()

        return { status: 200, error: undefined, data: data}
    }
    async store ({ request }) {
        const { body } = request
        const { first_name, last_name, university_name} = body
        const universityData = await UniversityModel.query().where({full_name: university_name}).fetch().then(response => JSON.parse(JSON.stringify(response)))
        if(universityData.length) {
                const data = await StudentModel.create({ first_name, last_name })
                const testData = universityData.map(item => item.id)
                const testId = await StudentModel.query().max('id as id').then(response => JSON.parse(JSON.stringify(response)))
                const bridge = await BridgeModel.create({ student_id: testId[0].id, university_id: testData[0]})
                return { status: 200, error: undefined, data: data, message: 'Success'}
            } else {
                return { status: 200, error: undefined, message: 'University not found'}
            }
    }
    async update ({ request }) {
        const { params, body } = request
        const { id } = params
        const { first_name, last_name } = body
        let data = await StudentModel.find(id)
        data.merge(body)
        await data.save()

        return { status: 200, error: undefined, data: data}
    }
    async destroy ({ request }) {
        const { params } = request
        const { id } = params
        let message = "";
        let data = await StudentModel.find(id)
        if(data !== null) {
            await data.delete()
            message = `Item ${id} is destroying`
        } else {
            message = "Item was missing or destroyed"
        }
        return { status: 200, error: undefined, message: message}
    }
}

module.exports = StudentController
