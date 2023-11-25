const cors = require("cors");
const express = require("express");
const controllers = require("./controllers")
const passport = require("passport");
const db = require("./db");
const auth = require("./auth");
const PORT = 22;
const app = express();

app.use(express.json());

app.use("/api", cors());

app.post(
    "/api/signup",
    passport.authenticate("signup", { session: false }),
    controllers.signup
);

app.post("/api/login", controllers.login);

app.get(
    "/api/profile",
    passport.authenticate("jwt", { session: false }),
    controllers.profile
  );

app.post(
    "/api/generate-2fa-secret",
    passport.authenticate("jwt", { session: false }),
    controllers.generate2faSecret
  );
  
  app.post(
    "/api/verify-otp",
    passport.authenticate("jwt", { session: false }),
    controllers.verifyOtp
  );

app.post("/api/login-step2", controllers.loginStep2);

app.post(
    "/api/disable-2fa",
    passport.authenticate("jwt", { session: false }),
    controllers.disable2fa
  );

app.listen(PORT, () =>
  console.log(`Express started on http://group18lp.ltd${PORT}`)
);


