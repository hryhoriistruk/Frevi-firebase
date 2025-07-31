exports.up = async (knex) => {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary();
        table.string('email').unique().notNullable();
        table.string('password_hash').notNullable();
        table.jsonb('profile_data');
        table.timestamps(true, true);
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable('users');
};