import {prisma} from "../../../../generated/prisma-client"
export default {
    Query: {
        userById: async (_, args) => {
            const { id } = args;
            return await prisma.user({ id }).$fragment();    // id:id라는 뜻. id가 id와 같은 걸 찾는 것.
        }
    }
};