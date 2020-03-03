// import dotenv from "dotenv";
// import path from "path";
// dotenv.config({ path: path.resolve(__dirname, ".env") });

import "./env";

import { GraphQLServer} from "graphql-yoga"  // graphql-yoga에서 GraphQLServer를 불러와야 함.
import logger from "morgan";
// import passport from "passport";
import schema from "./schema";
import "./passport";    // server.js에서는 passport.js 파일에서 무언가를 받아서 사용할 필요 없기 때문.
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT || 4000;

// const server = new GraphQLServer({ schema });

const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({ request }) // context는 resolver 사이에서 정보를 공유할 때 사용.
    // context는 함수를 담을 수도 있음.
    // context의 req 객체에 담기는 정보 중 하나가 passport의 req 객체와 같음
    // context에 request만 담긴 객체를 리턴!
  });

server.express.use(logger("dev"));
// server.express.use(passport.authenticate("jwt"));   // server.express로 미들웨어를 사용.
// path를 입력하는데 경로를 미들웨어로 보호하고 싶을 때 사용.
// express middleware에 원하는 것들을 입력하고 난 후에, 주소 미들웨어를 입력.
server.express.use(authenticateJwt);

server.start({port: PORT}, () => 
    console.log(`🟢 Server running on http://localhost:${PORT}`)
);