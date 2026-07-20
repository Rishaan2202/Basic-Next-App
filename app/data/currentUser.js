import { cookies } from "next/headers";
import { users } from "./users";

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const currentUserID = cookieStore.get("userID")?.value;
    console.log(cookieStore.getAll());
    return users.find(
        user => String(user.id) === currentUserID
    );
}