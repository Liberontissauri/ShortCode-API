const express = require("express")
const router = express.Router()
const rateLimit = require("express-rate-limit")
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

const limiter = rateLimit({
    windowMs: 1 * 20 * 1000,
    max: 10,
})

router.use(limiter)

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

router.get("/:codeId", async (req, res) => {
    const code_id = req.params.codeId
    const code_content = await utils.code.codeExists(code_id)
    if(code_content) {
        return res.json({
            "code_id": code_content.code_id,
            "title": code_content.title,
            "code": code_content.code,
            "lang": code_content.lang
        })
    }
    return res.send("")
})

router.delete("/:codeId", async (req, res) => {
    const code_id = req.params.codeId
    const api_key = req.body.api_key
    const key_content = await utils.api_key.keyExists(api_key)
    const code_content = await utils.code.codeExists(code_id)
    if(code_content && key_content.key_id == code_content.key_id) {
        await knex("CODES").where("code_id", code_id).del()
        return res.json(code_content)
    }
    return res.json({})
})

module.exports = router