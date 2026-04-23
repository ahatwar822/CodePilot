import userModel from "../../models/user.model.js";
import { conflict, customError, serverError, success } from "../../utils/response.utils.js";
import jwt from 'jsonwebtoken';

const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        { userId },
        process.env.ACCESS_TOKEN_SECRET || 'access-secret-key',
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { userId },
        process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key',
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
}

const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return customError(res, 400, "All fields are required.");
        }

        // Check if email is valid
        if (!email.match(/\S+@\S+\.\S+/)) {
            return customError(res, 400, "Please use a valid email address.");
        }

        // Check if user exists
        const isExistUser = await userModel.findOne({ email });
        if (isExistUser) {
            return conflict(res, "Email already registered.");
        }

        // Create new user
        const newUser = await userModel.create({ username, email, password });

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(newUser._id);

        // Save refresh token to database
        newUser.refreshToken = refreshToken;
        await newUser.save();

        // Set accessToken cookie (15 minutes)
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            secure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000
        });

        // Set refreshToken cookie (7 days)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return success(res, {
            message: "User registered successfully",
            statusCode: 201,
            accessToken,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        if (error.code === 11000) {
            return customError(res, 409, "Email already registered.");
        }
        return serverError(res, error.message);
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return customError(res, 400, "Email and password are required.");
        }

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return customError(res, 401, "Invalid email or password.");
        }

        // Compare passwords
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return customError(res, 401, "Invalid email or password.");
        }

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id);

        // Save refresh token to database
        user.refreshToken = refreshToken;
        await user.save();

        // Set accessToken cookie (15 minutes)
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            secure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000
        });

        // Set refreshToken cookie (7 days)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return success(res, {
            message: "Login successful",
            statusCode: 200,
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        return serverError(res, error.message);
    }
}

const refreshTokenController = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return customError(res, 401, "Refresh token is required.");
        }

        // Verify refresh token
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key'
        );

        // Check if token exists in database
        const user = await userModel.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
            return customError(res, 401, "Invalid refresh token.");
        }

        // Generate new access token
        const newAccessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET || 'access-secret-key',
            { expiresIn: '15m' }
        );

        // Set new accessToken cookie
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            secure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000
        });

        return success(res, {
            message: "Access token refreshed successfully",
            statusCode: 200,
            accessToken: newAccessToken
        });

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return customError(res, 401, "Refresh token expired. Please login again.");
        }
        return customError(res, 401, "Invalid refresh token.");
    }
}

const logoutController = async (req, res) => {
    try {
        const userId = req.userId;

        // Clear refresh token from database
        await userModel.findByIdAndUpdate(userId, { refreshToken: null });

        // Clear cookies
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            secure: true,
            sameSite: "none",
            maxAge: 0
        });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            secure: true,
            sameSite: "none",
            maxAge: 0
        });

        return success(res, {
            message: "Logged out successfully",
            statusCode: 200
        });

    } catch (error) {
        return serverError(res, error.message);
    }
}

export { registerController, loginController, refreshTokenController, logoutController }