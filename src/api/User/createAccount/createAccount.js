import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createAccount: async (_, args) => {
            // 빈 string을 선언하는 이유는 null 같은 이상한 타입이 들어오지 않도록 막기 위해서.
            const { username, email, firstName = "", lastName = "", bio = "" } = args;  // password는 입력받지 않을 것이다.
            const exists = await prisma.$exists.user({ username });
            if (exists) {
                throw Error("This username is already taken");
            }
            await prisma.createUser({
                username,
                email,
                firstName,
                lastName,
                bio
            });
            return true;
        }
    }
};