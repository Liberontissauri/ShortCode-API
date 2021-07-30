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
const utils = require("../utils")

router.post("/", async (req, res) => {
    const api_key = req.body.keyId
    const title = req.body.title
    const code = req.body.code
    const language = req.body.language
    if(await utils.api_key.keyExists(api_key)) {
        const code_id = (await knex("CODES").returning("code_id").insert({key_id: api_key, title: title, code: code, lang: language}))[0]

        return res.json({
            code_id: code_id
        })
    }
    return res.json({})
})

module.exports = router