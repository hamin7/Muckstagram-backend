import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
// allTypes라는 변수는 fileLoader 함수의 결과물.
// api 폴더 밑의 모든 폴더에 속해있고, graphql로 끝나는 모든 파일들을 가져올 것.
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));   //api 폴더 밑에 resolver가 아닌 js 파일을 둔다면 문제가 생길것.

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
});

export default schema;