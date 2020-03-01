import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { GraphQLServer} from "graphql-yoga"  // graphql-yoga에서 GraphQLServer를 불러와야 함.
import logger from "morgan";
import passport from "passport";
import schema from "./schema";
import "./passport";    // server.js에서는 passport.js 파일에서 무언가를 받아서 사용할 필요 없기 때문.

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));
server.express.use(passport.authenticate("jwt"));   // server.express로 미들웨어를 사용.
// path를 입력하는데 경로를 미들웨어로 보호하고 싶을 때 사용.
// express middleware에 원하는 것들을 입력하고 난 후에, 주소 미들웨어를 입력.

server.start({port: PORT}, () => 
    console.log(`🟢 Server running on http://localhost:${PORT}`)
);