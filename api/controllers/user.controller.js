import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
export const test = (req, res) => {
  res.json({ message: "API is working fine!" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "Forbidden"));
  }
  if (req.body.password) {
    if (req.body.password.length < 8) {
      return next(
        errorHandler(400, "Password must be at least 8 characters long")
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 5 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be at least 5  and 20 characters long")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Forbidden Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-z0-9]+$/)) {
      return next(
        errorHandler(
          400,
          "Username can only contain lowercase letters and numbers"
        )
      );
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updateUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }
};

export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("Signout successfully");
  } catch (error) {
    next(error);
  }
};
