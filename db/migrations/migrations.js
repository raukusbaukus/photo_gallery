exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.enu('user_type', ['admin', 'artist']).notNullable().defaultTo('artist');
    }),

    knex.schema.createTable('artist', function(table) {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users');
      table.text('bio');
      table.string('display_name');
      table.string('logo_url');
      table.string('email');
      table.boolean('email_form_active').defaultTo(false);
    }),

    knex.schema.createTable('contact', function(table) {
      table.increments('id').primary();
      table.integer('artist_id').references('id').inTable('artist');
      table.string('display_name');
      table.string('contact_url');
      table.enu('icon', ['twitter', 'instagram', 'email', 'phone']);
      table.boolean('is_active').defaultTo(true);
    }),

    knex.schema.createTable('image', function(table) {
      table.increments('id').primary();
      table.integer('artist_id').references('id').inTable('artist');
      table.string('title').notNullable();
      table.text('description');
      table.date('date_taken');
      table.boolean('is_active').defaultTo(true);
      table.boolean('is_featured').defaultTo(false);
    }),

    knex.schema.createTable('tag', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.boolean('is_active').defaultTo(true);
      table.boolean('is_gallery').defaultTo(false);
    }),

    knex.schema.createTable('image_tag', function(table) {
      table.increments('id').primary();
      table.integer('artist_id').references('id').inTable('artist').notNullable();
      table.integer('tag_id').references('id').inTable('tag').onDelete('cascade');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user'),
    knex.schema.dropTable('artist'),
    knex.schema.dropTable('contact'),
    knex.schema.dropTable('image'),
    knex.schema.dropTable('tag'),
    knex.schema.dropTable('image_tag')
  ])
};
