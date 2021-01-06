'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentsSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments()
      table.string("first_name",20).notNullable()
      table.string("last_name",20).notNullable()
      table.timestamps()      
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentsSchema
