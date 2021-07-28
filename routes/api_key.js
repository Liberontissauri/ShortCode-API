const express = require("express")
const router = express.Router()
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

router.post("/", async (req, res) => {
    const email = req.body.email

    await knex("API_KEYS").insert({email: email})
    // so, here knex returns key_id value inside an object which is inside a list, hence why the need for [0].key_id
    const api_key = (await knex("API_KEYS").where("email", email).select("key_id"))[0].key_id

    res.json({
        api_key: api_key,
        email: email,
    })
})

module.exports = router