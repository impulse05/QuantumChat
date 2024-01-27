import dotenv from "dotenv";
import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import User from '../models/userModel.js';
import GoogleStrategy from "passport-google-oauth20";
import GitHubStrategy from 'passport-github';
import FacebookStrategy from 'passport-facebook';
import jwt from "jsonwebtoken";


dotenv.config();

var cookieOrBearerTokenExtractor = function(req) {
  var token = null;
  // if (req && (req.cookies || req.headers.authorization)) {
  //     token = req.cookies['JWT'] || req.headers.authorization.replace('Bearer ','');
  // }
  if (req && (req.headers.authorization)) {
      token = req.headers.authorization.replace('Bearer ','');
  }
  return token;
};
var options = {
  jwtFromRequest : cookieOrBearerTokenExtractor,// toe get token from the auth header
  secretOrKey : process.env.JWT_KEY,// secret key
  passReqToCallback:true//to pass req to the callback
};

// STRAGTEGY
passport.use(new JwtStrategy(options, async (req,jwt_payload,done) => {
  try {
    console.log(jwt_payload)
    const user = await User.findOne({ _id: jwt_payload._id });
 
    
    if (user) return done(null, user);
    if(user.password) {
      user.password = undefined;
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  } 
}));


// GOOGLE STRATEGY
passport.use( 
  new GoogleStrategy(
    {
      // options for strategy
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
      clientID: process.env.CLIENT_ID || 123123,
      clientSecret: process.env.CLIENT_SECRET || 34324,
    },
    function (accessToken, refreshToken, profile, done) {
      //console.log(accessToken, refreshToken, profile)
      console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED");
      return done(null, profile);
    }
  )
);



passport.use(new GitHubStrategy({
    clientID: process.env.GIT_CLIENT_ID,
    clientSecret: process.env.GIT_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/api/auth/github/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("GITHUB BASED OAUTH VALIDATION GETTING CALLED");
    return done(null, profile);
  }
));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/api/auth/facebook/callback`
},
function(accessToken, refreshToken, profile, cb) {
  console.log("FACEBOOK BASED OAUTH VALIDATION GETTING CALLED");
  return cb(null, profile);
}
));



passport.serializeUser(function (user, done) {
  console.log("I should have jack ");
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  console.log("I wont have jack shit");
  done(null, obj);
});



// conncent screen
const googleAuthentication = passport.authenticate("google", {
  // #swagger.tags = ['auth']
    // #swagger.ignore = true
  scope: ["profile", "email"],
});

   
// github consent screen
const githubAuthentication=passport.authenticate('github',{
    // #swagger.ignore = true
  scope:["user"]
})

const facebookAuthentication = passport.authenticate('facebook',{
    // #swagger.ignore = true
});


const verifyUser = passport.authenticate("jwt", { session: false });

const verifyAdmin = (req, res, next) => {
    
    User.findOne({_id: req.user._id})
    .then((user) => {
        if (user.admin) {
            next();              //move ahead only if user is admin
        }
        else {
            res.status(403).json({error : "Admin access required !!"});
            return next(res);
        } 
    }, (err) => next(err))
    .catch((err) => next(err))
}


// verify the email 
const isVerifiedUser = (req,res,next) => {

      User.findOne({email: req.body.email})
      .then((user) => {
        if (!user) {
              res.status(400).json({error:"The given Email does not exists"});
              return next(res);     
        }
        else if(user.isVerified)
        {
          next();
        }
        else {
            res.status(403).json({error : "Your account has not been verified !!"});
            return next(res);
        } 
    }, (err) => next(err))
    .catch((err) => {
       res.status(400).json({error:err});
       return next(res);

    }) 
}



export {verifyUser, verifyAdmin,googleAuthentication,githubAuthentication ,isVerifiedUser, facebookAuthentication};