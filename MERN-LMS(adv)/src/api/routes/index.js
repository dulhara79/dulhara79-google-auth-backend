import { authenticate } from "../middleware/user.auth.middleware";
import logger from "../../util/logger";

const routesInit = (app, passport) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      succsessRedirect: "/homePage.js",
    }),
    (req, res) => {
      // console.log("User authenticated");
      logger.info("User authenticated");
    }
  );

  app.get("/test", authenticate, (req, res) => {
    res.send("<h4>Hello authenticate user</h4>");
    logger.info("User authenticated in the server");
  });
};

export { routesInit };
