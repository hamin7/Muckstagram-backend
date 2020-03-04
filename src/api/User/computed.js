import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    amIFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        const exists = await prisma.$exists.user({
            // 우리가 요청한 유저(parentId)가 database에 있고, 팔로워 중에 요청한 유저(user)의 id가 (user.id)가 있어야 함.
          AND: [{ id: parentId }, { followers_some: [user.id] }]
        });
        console.log(exists);
        if (exists) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    itsMe: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;  // 요청하는 사람(parent)과 요청하는 사람(request)이 같으면 내 프로필을 요청.
    }
  }
};