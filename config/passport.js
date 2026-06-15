const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const queries = require("../db/queries");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await queries.getUserByusername(username);

        if (!user) {
          return done(null, false, {
            message: "incorrect username",
          });
        }

        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) {
          return done(null, false, {
            message: "Incorrect password",
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await queries.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
