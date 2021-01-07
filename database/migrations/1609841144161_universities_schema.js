'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UniversitiesSchema extends Schema {
  up() {
    this.create('universities', (table) => {
      table.increments()
      table.string("full_name", 30).notNullable()
      table.string("education_degree",20).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('universities')
  }
}

module.exports = UniversitiesSchema
