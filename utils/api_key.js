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

async function keyExists(key_id) {
    if(!validator.isUUID(key_id)) return false

    stored_key = await knex("API_KEYS").where("key_id", key_id)
    if (stored_key.length == 0) return false

    return stored_key[0]
}
async function emailExists(email) {
    if(!validator.isEmail(email)) return false

    stored_key = await knex("API_KEYS").where("email", email)
    if (stored_key.length == 0) return false

    return stored_key[0]
}

module.exports.keyExists = keyExists
module.exports.emailExists = emailExists
