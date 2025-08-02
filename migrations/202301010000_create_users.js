// migrations/202301010000_create_users.js
exports.up = knex => knex.schema.createTable('users', table => {
    table.uuid('id').primary();
    table.string('email').unique();
    table.string('password_hash');
    table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('users');