import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import passport from "passport";
import JwtStrategy from "passport-jwt";

const jwtOptions = {
  jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secret: process.env.JWT_SECRET
};

// done은 우리가 사용자를 찾았을 때 호출해야 하는 함수.
// verify 함수 안에서 User를 payload의 정보로 찾아야 함.
const verifyUser = (payload, done) => {};

passport.use(new JwtStrategy(jwtOptions, verifyUser));