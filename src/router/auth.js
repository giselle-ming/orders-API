"use strict";

const { Router } = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

require("../utils/passport");

const authRouter = Router();

// this redirects to google
authRouter.get("/google", (req, res, next) => {
  //localhost:3001/auth/google?redirect_url=http://localhost:3000/login-success
  const { redirect_url } = req.query;

  const authenticator = passport.authenticate("google", {
    scope: ["profile"],
    state: redirect_url,
  });
  return authenticator(req, res, next);
});

// google sends response to this
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // lookup the state from googl
    const { state } = req.query;
    // define redirectUrl from the state or default to '/api/order'
    const redirectUrl = state ?? "/api/order";

    // create the token
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);

    //redirect with the token
    res.redirect(`${redirectUrl}?token=${token}`);
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout({}, () => {
    res.redirect("/");
  });
});

module.exports = authRouter;
