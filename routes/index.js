const express = require("express")
const router = express.Router()

router.use("/apikeys", require("./api_key"))
router.use("/codes", require("./code"))

module.exports = router