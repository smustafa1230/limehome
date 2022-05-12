'use strict';

const ResponseSuccessForController = function(req  , res , data , message) {
    try {
        let successObj = {};
        successObj.data = data;
        successObj.error = false;
        successObj.message = message;
        if(req && req.tokenRefreshed) {
            successObj.token = req.token;
        }
        return res.json(successObj);
    } catch(err) {
    }

}


const ResponseMiddlewareBadParamError = function(res , data , message, arr) {
    try {
        let errorObj = {};
        errorObj.data = data;
        errorObj.error = true;
        errorObj.err = message;
        errorObj.message = arr;
        return res.status(400).send(errorObj);
    } catch(err) {
        return err;
    }

}

const ResponseErrorForbidden = function(res , data , message) {
    try {
        let errorObj = {};
        errorObj.data = data;
        errorObj.error = true;
        errorObj.message = message;
        return res.status(403).send(errorObj);
    } catch(err) {
    }

}


const ResponseMiddlewareError = function(res , data , message) {
    try {
        let errorObj = {};
        errorObj.data = data;
        errorObj.error = true;
        errorObj.message = message;
        return res.status(400).json(errorObj);
    } catch(err) {
    }

}

module.exports.ResponseMiddlewareBadParamError = ResponseMiddlewareBadParamError;
module.exports.ResponseErrorForbidden = ResponseErrorForbidden;
module.exports.ResponseSuccessForController = ResponseSuccessForController;
module.exports.ResponseMiddlewareError = ResponseMiddlewareError;





