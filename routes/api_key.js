const express = require("express")
const router = express.Router()
const rateLimit = require("express-rate-limit")
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

const limiter = rateLimit({
    windowMs: 1 * 30 * 1000,
    max: 15,
})
router.use(limiter)

router.post("/", async (req, res) => {
    const email = req.body.email
    if(!validator.isEmail(email)) return res.status(400).json(utils.error.generateErrorResponse("InvalidInput","The email field contains an invalid email"))
    if(await utils.api_key.emailExists(email)) return res.status(403).json(utils.error.generateErrorResponse("DuplicateContent","The email in the email field already has a registred API"))

    await knex("API_KEYS").insert({email: email})
    // so, here knex returns key_id value inside an object which is inside a list, hence why the need for [0].key_id
    const api_key = (await knex("API_KEYS").where("email", email).select("key_id"))[0].key_id

    res.status(200).json({
        api_key: api_key,
        email: email,
    })
})

router.get("/:keyId", async (req, res) => {
    const key_id = req.params.keyId
    if(!validator.isUUID(key_id)) return res.status(400).json(utils.error.generateErrorResponse("InvalidInput","The keyId field was supplied with a string that is not in the format of an UUID"))

    const key_content = await utils.api_key.keyExists(key_id)
    if(key_content) {
        return res.json(key_content)
    }
    return res.status(404).json(utils.error.generateErrorResponse("NotFound","The requested API key was not found"))
})

router.delete("/:keyId", async (req, res) => {
    const key_id = req.params.keyId
    if(!validator.isUUID(key_id)) return res.status(400).json(utils.error.generateErrorResponse("InvalidInput","The keyId field was supplied with a string that is not in the format of an UUID"))

    const key_content = await utils.api_key.keyExists(key_id)
    if(key_content) {
        await knex("API_KEYS").where("key_id", key_id).del()
    }
    return res.status(404).json(utils.error.generateErrorResponse("NotFound","The requested API key was not found"))
})

module.exports = router