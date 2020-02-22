// require("dotenv").config();
// import { GraphQLServer} from "graphql-yoga"  // graphql-yoga에서 GraphQLServer를 불러와야 함.
import logger from "morgan";
import schema from "./schema";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));

server.start({port: PORT}, () => 
    console.log(`👍🏼Server running on http://localhost:${PORT}`)
);