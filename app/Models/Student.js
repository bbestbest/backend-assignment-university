'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Student extends Model {
    Universities() {
        return this.belongsToMany('App/Models/University')
    }
}

module.exports = Student
