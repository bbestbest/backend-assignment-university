'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BridgesSchema extends Schema {
  up () {
    this.create('bridges', (table) => {
      table.increments()
      table.integer('student_id').unsigned()
      table.integer('university_id').unsigned()

      table
        .foreign('student_id')
        .references('students.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .foreign('university_id')
        .references('universities.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.timestamps()
    })
  }

  down () {
    this.drop('bridges')
  }
}

module.exports = BridgesSchema
