import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {        
          return prisma.$exists.user({
            AND: [
                {
                    id: user.id
                },
                {
                    following_some: {
                    id: parentId
                    }
                }
            ]
        });
      } catch {
        return false;
      }
    },
    itSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;  // 요청하는 사람(parent)과 요청하는 사람(request)이 같으면 내 프로필을 요청.
    }
},
Post: {
  isLiked: (parent, _, { request }) => {
    const { user } = request;
    const { id } = parent;
    return prisma.$exists.like({
      AND: [
        {
          user: {
            id: user.id
          }
        },
        {
          post: {
            id
          }
        }
      ]
    });
  }
  }
};