import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    upload: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request); //일단 인증 하시고
      const { user } = request;
      const { caption, files } = args;
      const post = await prisma.createPost({
        caption,
        user: { connect: { id: user.id } }
      });
      files.forEach(
        async file =>
          await prisma.createFile({
            url: file,  // file은 많은 url들의 array이다.
            post: {
              connect: {
                id: post.id
              }
            }
          })
      );
      return post;
    }
  }
};