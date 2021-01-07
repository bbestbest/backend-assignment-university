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
        const { first_name, last_name, university_name, degree} = body
        const student_infomation = await StudentModel.query().where({ first_name, last_name }).fetch().then(response => JSON.parse(JSON.stringify(response)))
        const university_infomation = await UniversityModel.query().where({ full_name: university_name, education_degree: degree}).fetch().then(response => JSON.parse(JSON.stringify(response)))
        if(student_infomation.length && university_infomation.length) {
            const getStudentId = await StudentModel.query().where({ first_name, last_name }).fetch().then(response => JSON.parse(JSON.stringify(response)))
            const getUniversityId = await UniversityModel.query().where({ full_name: university_name, education_degree: degree }).fetch().then(response => JSON.parse(JSON.stringify(response)))
            const checkBridge = await BridgeModel.query().where({student_id: getStudentId[0].id, university_id: getUniversityId[0].id}).fetch().then(response => JSON.parse(JSON.stringify(response)))
            if (!checkBridge.length) {
                const bridge = await BridgeModel.create({ student_id: getStudentId[0].id, university_id: getUniversityId[0].id})
            }
            return { status: 200, error: undefined, data: { student: student_infomation, universty_name: university_name, education_degree: degree }, message: 'Success'}
        } else if (!student_infomation.length && university_infomation.length) {
            const student = await StudentModel.create({ first_name, last_name })
            const getStudentId = await StudentModel.query().max('id as id').then(response => JSON.parse(JSON.stringify(response)))
            const getUniversityId = await UniversityModel.query().where({ full_name: university_name }).fetch().then(response => JSON.parse(JSON.stringify(response)))
            const checkBridge = await BridgeModel.query().where({student_id: getStudentId[0].id, university_id: getUniversityId[0].id}).fetch().then(response => JSON.parse(JSON.stringify(response)))
            if (!checkBridge.length) {
                const bridge = await BridgeModel.create({ student_id: getStudentId[0].id, university_id: getUniversityId[0].id})
            }
            return { status: 200, error: undefined, data: { student: [student], universty_name: university_name, education_degree: degree }, message: 'Success'}
        } else if (!university_infomation.length) {
            const checkUniversity = await UniversityModel.query().where({ full_name: university_name }).fetch().then(response => JSON.parse(JSON.stringify(response)))
            if(checkUniversity.length) {
                const education = await UniversityModel.create({ full_name: university_name, education_degree: degree})
                return { status: 200, error: undefined, message: 'Create degree for university'}
            } else {
                return { status: 200, error: undefined, message:'University not found'}
            }
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
