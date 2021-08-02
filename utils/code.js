const validator = require("validator")
const knex = require("knex")({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    searchPath: ['knex', 'public'],
})

async function codeExists(code_id) {
    if(!validator.isUUID(code_id)) return false

    stored_code = await knex("codes").where("code_id", code_id)
    if (stored_code.length == 0) return false

    return stored_code[0]
}

module.exports.codeExists = codeExists