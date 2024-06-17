import GoogleStrategy from "passport-google-oauth20";
import User from "../api/model/user.model";
import config from ".";
import logger from "../util/logger";

const googleAuth = (passport) => {
  //   console.log("GOOGLE_CLIENT_ID:", config.GOOGLE_CLIENT_ID); // Debug log
  //   console.log("GOOGLE_CLIENT_SECRET:", config.GOOGLE_CLIENT_SECRET); // Debug log
  //   console.log("GOOGLE_REDIRECT_URI:", config.GOOGLE_REDERICT_URI); // Debug log

    GoogleStrategy.Strategy;

    passport.use(
      new GoogleStrategy(
        {
          clientID: config.GOOGLE_CLIENT_ID,
          clientSecret: config.GOOGLE_CLIENT_SECRET,
          callbackURL: config.GOOGLE_REDERICT_URI,
        },
        async (accessToken, refreshToken, profile, callback) => {
          // console.log(profile);
          const userObj = {
            googleId: profile.id,
            gmail: profile.emails[0].value,
            displayName: profile.displayName,
            image: profile.photos[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
          }

          const user = await User.findOne({ googleId: profile.id });

          if(user) {
            return callback(null, user); 
          }

          User.create(userObj)
          .then((user) => {
            logger.info("User created successfully");
            return callback(null, user);
          })
          .catch((error) => {
            logger.error(error);
            return callback(error, null);
          })

          return callback(null, user);
        }
      )
    );

  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: config.GOOGLE_CLIENT_ID,
  //       clientSecret: config.GOOGLE_CLIENT_SECRET,
  //       callbackURL: config.GOOGLE_REDERICT_URI,
  //     },
  //     /* function */ (accessToken, refreshToken, profile, callback) => {
  //       // User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //       console.log(profile);
  //         return callback(null, user);
  //       // });
  //     }
  //   )
  // );

  passport.serializeUser((user, callback) => {
    // done(null, user.id);
    callback(null, user.id);
  });

  passport.deserializeUser((id, callback) => {
    User.findById(id, (err, user) => {
      // done(err, user);
      callback(err, user);
    });
  });
};

export { googleAuth };
