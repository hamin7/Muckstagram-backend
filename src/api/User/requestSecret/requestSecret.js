import { generateSecret } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";
import { format } from "morgan";

// user의 email이 인자로 입력된 email과 같은 사용자를 where로 찾을 것.
export default {
    Mutation: {
        requestSecret: async (_, args) => {
            const { email } = args;     // args로 받은 email 단어.
            const loginSecret = generateSecret();    // adjecives와 nouns를 랜덤으로 조합.
            console.log(secret);
            try {
                await prisma.updateUser({data: {loginSecret}, where: { email } });
                return true;
            } catch {
                return false;
            }
        }
    }
};