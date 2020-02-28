import {prisma} from "../../../../generated/prisma-client";
export default {
    Query:{
        // sayHello를 실행하면 HELLO가 리턴되도록.
        sayHello: async() => {
            console.log(await prisma.users());  //모든 사용자들을 console에 보여줌.
            return "HELLO";
        }
    }
};