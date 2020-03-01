import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

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

passport.use(new Strategy(jwtOptions, verifyUser));