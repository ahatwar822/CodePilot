// Base response handler
function sendResponse(res, statusCode, success, message, data = {}) {
    res.status(statusCode).json({
        success,
        status: statusCode,
        message,
        data,
        timestamp: new Date().toISOString()
    });
}

// 2xx Success Responses
export function success(res, data = {}, message = 'Success') {
    sendResponse(res, 200, true, message, data);
}

export function created(res, data = {}, message = 'Resource created successfully') {
    sendResponse(res, 201, true, message, data);
}

export function updated(res, data = {}, message = 'Resource updated successfully') {
    sendResponse(res, 200, true, message, data);
}

export function deleted(res, data = {}, message = 'Resource deleted successfully') {
    sendResponse(res, 200, true, message, data);
}

// 4xx Client Error Responses
export function badRequest(res, message = 'Bad Request', data = {}) {
    sendResponse(res, 400, false, message, data);
}
export function notFound(res, message = 'Resource not found', data = {}) {
    sendResponse(res, 404, false, message, data);
}

export function unauthorized(res, message = 'Unauthorized', data = {}) {
    sendResponse(res, 401, false, message, data);
}

export function forbidden(res, message = 'Forbidden', data = {}) {
    sendResponse(res, 403, false, message, data);
}


export function conflict(res, message = 'Conflict', data = {}) {
    sendResponse(res, 409, false, message, data);
}

// 5xx Server Error Responses
export function serverError(res, message = 'Internal Server Error', data = {}) {
    sendResponse(res, 500, false, message, data);
}

export function notImplemented(res, message = 'Not Implemented', data = {}) {
    sendResponse(res, 501, false, message, data);
}

export function customError(res, status = 500, message = "Error", data = {}) {
  sendResponse(res, status, false, message, data);
}