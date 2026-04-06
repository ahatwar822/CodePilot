import { serverError } from "./response.utils.js"

const errorMiddleware = (err, req, res, next) => {
    return serverError(res, err.message || 'Internal Server Error', { error: err.stack });
}

export default errorMiddleware;