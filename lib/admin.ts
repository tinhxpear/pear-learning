import { auth } from "@clerk/nextjs"

const adminIds = [
    "user_2hB5V6eD22g0X7FKHunK2vU9QUP"
]

export const isAdmin = () => {
    const {userId} = auth();

    if(!userId) return false;
    return adminIds.indexOf(userId) !== -1;
}