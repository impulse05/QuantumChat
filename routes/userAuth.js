import express from "express";
import { allRedirect, editUser, getUsers, login, signUp } from "../controllers/authController.js";
import {
  facebookAuthentication,
  githubAuthentication,
  googleAuthentication,
  verifyUser,
} from "../middlewares/passport.js";
import passport from "passport";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.put("/edituser", editUser)
router.get("/myprofile", verifyUser, (req, res) => {
  // #swagger.tags = ['user']
  res.send(req.user);
});
// give all users without password
router.get("/users", verifyUser, getUsers);


router.get("/auth/google", googleAuthentication);
router.get("/auth/github", githubAuthentication);
router.get("/auth/facebook", facebookAuthentication);

router.get("/auth/google/callback",passport.authenticate("google", { session: false }),allRedirect);
router.get("/auth/github/callback",passport.authenticate("github", { session: false }),allRedirect);
router.get("/auth/facebook/callback",passport.authenticate("facebook", { session: false }),allRedirect);





export default router;
