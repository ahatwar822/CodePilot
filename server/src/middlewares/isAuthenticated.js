import jwt from 'jsonwebtoken';
import { customError } from '../utils/response.utils.js';
import userModel from '../models/user.model.js';

const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from Authorization header or cookies
        let accessToken = req.headers.authorization?.split(' ')[1];

        if (!accessToken) {
            accessToken = req.cookies?.accessToken;
        }

        if (!accessToken) {
            return customError(res, 401, "Access token is required.");
        }

        try {
            // Try to verify access token
            const decoded = jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET
            );

            req.userId = decoded.userId;
            return next();

        } catch (error) {
            // If token expired, try to refresh it
            if (error.name === 'TokenExpiredError') {
                const refreshToken = req.cookies?.refreshToken;

                if (!refreshToken) {
                    return customError(res, 401, "Refresh token is required. Please login again.");
                }

                try {
                    // Verify refresh token
                    const decoded = jwt.verify(
                        refreshToken,
                        process.env.REFRESH_TOKEN_SECRET
                    );

                    // Validate refresh token against database
                    const user = await userModel.findById(decoded.userId);

                    if (!user) {
                        return customError(res, 401, "User not found. Please login again.");
                    }

                    if (user.refreshToken !== refreshToken) {
                        return customError(res, 401, "Invalid refresh token. Please login again.");
                    }

                    // Generate new access token
                    const newAccessToken = jwt.sign(
                        { userId: user._id },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '15m' }
                    );

                    // Set new access token in cookie
                    res.cookie('accessToken', newAccessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        secure: true,
                        sameSite: "none",
                        maxAge: 15 * 60 * 1000 // 15 minutes
                    });

                    req.userId = decoded.userId;
                    return next();

                } catch (refreshError) {
                    if (refreshError.name === 'TokenExpiredError') {
                        return customError(res, 401, "Refresh token expired. Please login again.");
                    }
                    return customError(res, 401, "Invalid refresh token. Please login again.");
                }
            } else {
                return customError(res, 401, "Invalid access token.");
            }
        }

    } catch (error) {
        return customError(res, 500, "Authentication error: " + error.message);
    }
}

export default isAuthenticated;