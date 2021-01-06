'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UniversitiesSchema extends Schema {
  up() {
    this.create('universities', (table) => {
      table.increments()
      table.string("short_name", 5).notNullable()
      table.string("full_name", 30).notNullable().unique()
      table.timestamps()
    })
  }

  down() {
    this.drop('universities')
  }
}

module.exports = UniversitiesSchema
