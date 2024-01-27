import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
const signUp = async (req, res) => {
  try {
    // swagger tag
    // #swagger.tags = ['auth']

    const { name, email, phone, password, picture } = req.body;
    if (!name || !email || !phone || !password) {
      throw new Error("Enter Valid Credentials");
    }
    const alreadyExist = await User.findOne({ $or: [{ email }, { phone }] });

    if (alreadyExist) {
      throw new Error("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      picture,
    });
    await newUser.save();

    const payload = { _id: newUser._id };

    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: process.env.ExpiresIn,
    });

    res.cookie("JWT", token);
    const user={name, email, phone};
    res.status(200).json({
      success: true,
      message: "Registration Successful",
      data: { token , user }
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Registartion Error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    // #swagger.tags = ['auth']
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Enter the email");
    }
    if (!password) {
      throw new Error("Enter the password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User with this email doesn't exist");
    }
    // check provider
    if (user.provider !== "local") {
      throw new Error("Please login with " + user.provider);
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new Error("Incorrect Password");
    }

    const payload = { _id: user._id };

    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: process.env.ExpiresIn,
    });

    res.cookie("JWT", token);
    user.password = undefined;
    user.provider = undefined;
    user.providerId = undefined;
    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: { token , user },
    });
  } catch (error) {
    return res.status(402).json({
      success: false,
      message: "Login Error",
      error: error.message,
    });
  }
};

const editUser = async (req, res) => {
  // #swagger.tags = ['user']
  try {
    const { name, email, phone, password, picture } = req.body;
    const { _id } = req.user;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name, email, phone, password: hashedPassword, picture },
      { new: true } // This option returns the updated document
    );

    if (updatedUser) {
      const payload = { _id: updatedUser._id };
      const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: process.env.ExpiresIn,
      });

      res.cookie("JWT", token);

      res.status(200).json({
        success: true,
        message: "Updation Successful",
        data: { token },
      });
    } else {
      throw new Error("User not found while updation");
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Updation Error",
      error: error.message,
    });
  }
};

const allRedirect = async (req, res) => {
  try {
    // #swagger.tags = ['auth']

    // #swagger.ignore = true

    console.log("redirected", req.user);
    const { provider, id } = req.user;

    // for github use profileURL as email , google use email and facebook use email
    let user = {
      name: req.user.displayName,
      email:
        req.user.email ||
        req.user._json?.email ||
        req.user._json?.profileURL ||
        req.user._json?.html_url,
      picture:
        req.user._json?.avatar_url ||
        req.user._json?.picture ||
        "https://icon-library.com/images/users-icon-png/users-icon-png-15.jpg",
      provider,
      providerId: id,
    };

    var alreadyExist = await User.findOne({ providerId: id });

    if (!alreadyExist) {
      // const newUser = new User({name, username, email, password : hashedPassword, phone, picture});
      alreadyExist = new User(user);
      await alreadyExist.save();
    }

    const payload = { _id: alreadyExist._id };

    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: process.env.ExpiresIn,
    });

    res.cookie("JWT", token);

    // front end wala page bnayega
    // backend se frontend pe jayenge
    // token, userid asdfasdf
    // const redirectURL = `http://localhost:8080/saveToken?JWT=${token}`;
    const redirectURL = `http://localhost:5173/saveToken?JWT=${token}`;

    res.redirect(redirectURL);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Error in Github auth",
      info: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    // #swagger.tags = ['auth']

    // #swagger.ignore = true
    const users = await User.find({_id: {
      $ne: req.user._id,
    } }).select("-password");
    

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Error in fetching users",
      info: error.message,
    });
  }
};

export {signUp, login, editUser, allRedirect, getUsers};
