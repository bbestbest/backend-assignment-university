'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentsSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments()
      table.string("first_name",20).notNullable()
      table.string("last_name",20).notNullable()
      table.integer("university_id").unsigned()
      table.timestamps()      

      table
        .foreign('university_id')
        .references('universities.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentsSchema
