import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
        // UnderScore(_)는 변수의 이름이 될 수 있음.
        // DoubleUnderScore는 부모의 arguments를 뜻함.
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user({ id: user.id });
      const posts = await prisma.user({ id: user.id }).posts(); //만약 user의 posts만 받아오고 싶다면, user를 받을 필요 없다면 $fragment 대신에 .posts()를 사용.
      return {
        user: userProfile,
        posts
      };
    }
  },
};