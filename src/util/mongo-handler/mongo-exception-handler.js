var mongoErrorCodes = Object.freeze({
    "11000": "You are probebly trying to register identical information!"
});

function tryGetErrorMessage(mongoErr) {

    let message = null;
    let errorCode = mongoErr.code;

    if (errorCode in mongoErrorCodes)
        message = mongoErrorCodes[errorCode];

    return message;
}

module.exports.tryGetErrorMessage = tryGetErrorMessage;