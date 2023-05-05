/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

    exports.up = (knex) => knex.schema.createTable('posts', (table) => {
        table.increments('id'); 
        table.integer('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.string('url').notNullable();
        table.string('caption').notNullable();
        table.timestamps(true, true);
      });
      

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('posts');

