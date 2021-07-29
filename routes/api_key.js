const express = require("express")
const router = express.Router()
const validator = require("validator")
const utils = require("../utils")
const { keyExists } = require("../utils/api_key")
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
    if(!validator.isEmail(email)) return res.json({})
    if(await utils.api_key.emailExists(email)) return res.json({})

    await knex("API_KEYS").insert({email: email})
    // so, here knex returns key_id value inside an object which is inside a list, hence why the need for [0].key_id
    const api_key = (await knex("API_KEYS").where("email", email).select("key_id"))[0].key_id

    res.json({
        api_key: api_key,
        email: email,
    })
})

router.get("/:keyId", async (req, res) => {
    const key_id = req.params.keyId
    const key_content = await utils.api_key.keyExists(key_id)
    if(key_content) {
        return res.json(key_content)
    }
    return res.send("")
})

router.delete("/:keyId", async (req, res) => {
    const key_id = req.params.keyId
    const key_content = await utils.api_key.keyExists(key_id)
    if(key_content) {
        await knex("API_KEYS").where("key_id", key_id).del()
    }
    return res.json(key_content)
})

module.exports = router