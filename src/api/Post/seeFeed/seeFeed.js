import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma.user({ id: user.id }).following();
      return prisma.posts({
        where: {
          user: {
            id_in: [...following.map(user => user.id), user.id]
          }
        },
        orderBy: "createdAt_DESC"
      });
    }
  }
};

// id array 그리고, user id를 볼 수 있도록.
// 내림차순으로 정렬