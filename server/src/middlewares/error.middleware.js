import { serverError } from "../utils/response.utils.js"

const errorMiddleware = (err, req, res, next) => {
    const isDev = process.env.NODE_ENV === "development";

    return serverError(
        res,
        err.message || "Internal Server Error",
        isDev ? { error: err.stack } : {}
    );
};

export default errorMiddleware;