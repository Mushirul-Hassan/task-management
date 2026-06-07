const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { successResponse, errorResponse } = require("../utils/apiResponse");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(
        res,
        409,
        "An account with this email already exists.",
      );
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    return successResponse(res, 201, "Account created successfully", {
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};
