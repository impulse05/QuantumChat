import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
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
      name: req.user.displayName || req.user._json?.login,
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

    const token = await jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: process.env.ExpiresIn,
    });
    console.log(token);

    res.cookie("JWT", token);
    
    const redirectURL = `/saveToken?JWT=${token}`;

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

// add forget password send a link on email
const forgetPassword = async (req, res) => {
  try {
    // #swagger.tags = ['auth']
    const { email } = req.body;

    if (!email) {
      throw new Error("Enter the email");
    }

    const user = await User.findOne({ email
    });

    if (!user) {
      throw new Error("User with this email doesn't exist");
    }

    const payload = { _id: user._id };

    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: process.env.ExpiresIn,
    });

    // send email with token
    const baseUrl = req.protocol + "://" + req.get("host");

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password",
      text: `Click on the link to reset password ${baseUrl}/resetPassword/${token}`,
      html: `<p>Click on the link to reset password <a href="${baseUrl}/resetPassword/${token}">Reset Password</a>
      </p>`,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        throw new Error("Error in sending email");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({
          success: true,
          message: "An Email has been sent to your email address with further instructions",
        });
      }
    });
  } catch (error) {
    return res.status(402).json({
      success: false,
      message: "Forget Password Error",
      error: error.message,
    });
  }
};

// reset password
const resetPassword = async (req, res) => {
  try {
    // #swagger.tags = ['auth']
    const { password,token } = req.body;
    console.log(password);
    if (!password) {
      throw new Error("Enter the password");
    }

    if (!token) {
      throw new Error("Token not found");
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      decoded._id,
      { password: hashedPassword },
      { new: true } // This option returns the updated document
    );

    if (updatedUser) {
      res.status(200).json({
        success: true,
        message: "Password Reset Successful",
      });
    } else {
      throw new Error("User not found while password reset");
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Password Reset Error",
      error: error.message,
    });
  }
};

export {signUp, login, editUser, allRedirect, getUsers, forgetPassword, resetPassword};
