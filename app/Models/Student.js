'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Student extends Model {
    universities() {
        return this.belongsToMany('App/Models/University').pivotTable('bridges')
    }
}

module.exports = Student
