'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Universities extends Model {
    students () {
        return this.belongsToMany('App/Models/Student').pivotTable('bridges')
    }
}

module.exports = Universities 
