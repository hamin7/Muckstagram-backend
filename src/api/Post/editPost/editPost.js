import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";    // 문자열 상수 같은것임.
const EDIT = "EDIT";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);   // 인증 받으시고...
      const { id, caption, location, action } = args;   
      const { user } = request;
      const post = await prisma.$exists.post({ id, user: { id: user.id } });  // post를 쓴 id와 request한 id 같아야
      if (post) {
        // post 쓴 id와 request한 id 같다면
        if (action === EDIT) {
          // action이 EDIT 이라면
          return prisma.updatePost({
            data: { caption, location },
            where: { id }   // 안타깝게도 where:{id, user}는 할 수 없음...
          });
        } else if (action === DELETE) {
          // actiona이 DELETE 이라면
          return prisma.deletePost({ id });
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
};