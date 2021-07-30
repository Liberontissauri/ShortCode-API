
function generateErrorResponse(type, message) {
    return {
        type: type,
        message: message
    }
}

module.exports.generateErrorResponse = generateErrorResponse