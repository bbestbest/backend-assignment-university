'use strict'

const UniversityModel = use('App/Models/University')

class UniversityController {
    async index () {
        const data = await UniversityModel.query().fetch()
        
        return { status: 200, error: undefined, data: data}
    }
}

module.exports = UniversityController
