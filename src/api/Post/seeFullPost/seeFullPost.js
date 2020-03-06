import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      const post = await prisma.post({ id });
      const comments = await prisma
        .post({ id })
        .comments()
        .$fragment(COMMENT_FRAGMENT);
      const likeCount = await prisma
        .likesConnection({
          where: { post: { id } }
        })
        .aggregate()
        .count();
      const files = await prisma.post({ id }).files();  // 포스트의 파일을 보여줌.
      const user = await prisma.post({ id }).user();  // 포스트를 작성한 것이 누구인지.
      return {
        post,
        comments,
        likeCount,
        files,
        user
      };
    }
  }
};