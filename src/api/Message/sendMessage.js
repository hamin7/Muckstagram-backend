import { prisma } from "../../../generated/prisma-client";

export default {
    Mutation: {
        sendMessage: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId, message, toId } = args;
            let room;
            if (roomId === undefined) {
                // 방이 아직 없다면.
                if (user.id !== to) {
                    // 나와 대화하는 사람이 같지 않다면 (room을 스스로에게 만들지 않게 하려고)
                    // 새 room을 만들어서 그 않에 넣자.
                    room = await prisma.createRoom({
                        participants: {
                            // user에다가 participants를 연결. toId는 msg 받는 사람, user.id는 보내는 사람.
                            connect: [{ id: toId }, { id: user.id }]
                        }
                    });
                }
            } else {
                // 방이 존재 한다면.
                // 그 방을 찾아서 넣자.
                room = await prisma.room({ id: roomId });
                if (!room) {
                    // 방이 없다면
                    throw Error("Room not found");
                }
            }
            return null;
        }
    }
};