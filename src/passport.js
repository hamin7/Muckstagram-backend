// import dotenv from "dotenv";
// import path from "path";
// dotenv.config({ path: path.resolve(__dirname, ".env") });

import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

// done은 우리가 사용자를 찾았을 때 호출해야 하는 함수.
// verify 함수 안에서 User를 payload의 정보로 찾아야 함.
const verifyUser = async (payload, done) => {
    try {
        const user = await prisma.user({ id: payload.id });
        if (user !== null) {
            // 사용자를 찾는다면
            return done(null, user);
        } else {
            return done(null, false);
    }
    } catch (error) {
        return done(error, false);
    }
};

// 미들웨어 함수, 토큰을 받아서 작업할 것. passport authenticate를 리턴.
// verifyUser함수 실행 => passport가 authenticatJwt함수에 사용자 정보를 전달 => 사용자 정보를 req 객체에 붙여줌.
export const authenticateJwt = (req, res, next) =>
    // passport에 어떤 것도 입력되지 않기를 원하므로 session: false 옵션을 추가.
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
        // 사용자가 존재 한다면
        req.user = user;
    }
    // 사용자가 없다면
    next();
  })(req, res, next);   // 함수를 리턴, 실행하고 나면 다음 함수로 넘어가는것. 리턴된 함수를 (req, res, next)로 실행.
  // 이 경우에는 그 실행해야 하는 함수가 graphql 함수.

// Strategy를 활용해서 jwt 토큰을 추출.
passport.use(new Strategy(jwtOptions, verifyUser));

passport.initialize();