import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options"

export const getSession =()=>{
    return getServerSession(options)
}
export const gerCurrentUser = async ()=>{
    const session = await getSession()
    return session?.user.id
}