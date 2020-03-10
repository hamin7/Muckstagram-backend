import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newMessage: {
      subscribe: (_, args) => {
        const { roomId } = args;
        // prisma에서 subscribe 할 수 있는 object를 리턴.
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  room: { id: roomId }
                }
              }
            ]
          })
          .node();
      },
      resolve: payload => payload
    }
  }
};