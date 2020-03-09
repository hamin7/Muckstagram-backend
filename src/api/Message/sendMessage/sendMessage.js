import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
    Mutation: {
        sendMessage: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId, message, toId } = args;
            let room;
            if (roomId === undefined) {
                // 방이 아직 없다면.
                if (user.id !== toId) {
                    room = await prisma
                        .createRoom({
                            participants: {
                                connect: [{ id: toId }, { id: user.id }]
                            }
                        })
                        .$fragment(ROOM_FRAGMENT);
                }
            } else {
                // 방이 존재 한다면.
                // 그 방을 찾아서 넣자.
                room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
            }
            if (!room) {
                throw Error("Room not found");
            }
            // roomId가 있다면 room의 다른 participant 받아야 하므로 room.participants.filter
            // 여기서 filter는 elements array를 리턴.
            const getTo = room.participants.filter(
                participant => participant.id !== user.id
            )[0];   // [0]을 해주는 이유는 element 하나만 return하지 않게 하려고 하기 때문.
            return prisma.createMessage({
                text: message,
                // from은 user.request에서 오는 message이다. (msg가 resolver 요청했던 사람으로부터 왔기 때문)
                from: {
                    connect: { id: user.id }
                },
                to: {
                    // roomId가 있다면 (toId 없으므로 room의 다른 participant 받아야) getTo.id를 
                    // 없다면 toId(우리가 보내려는 사람)를 받아 온다.
                    connect: {
                        id: roomId ? getTo.id : toId
                    }
                },
                room: {
                    connect: {
                        id: room.id
                    }
                }
            });
        }
    }
};