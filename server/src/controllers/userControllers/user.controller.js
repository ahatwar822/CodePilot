import userModel from "../../models/user.model.js";
import { customError, serverError, success } from "../../utils/response.utils.js";

const getAuthenticatedUser = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId).select('-password -refreshToken');
        
        if (!user) {
            return customError(res, 404, "User not found.");
        }

        return success(res, 200, {
            message: "User retrieved successfully",
            user
        });

    } catch (error) {
        return serverError(res, error.message);
    }
}

export { getAuthenticatedUser }