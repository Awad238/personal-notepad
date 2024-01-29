import { addNewUser, fetchUser, getUser, type User } from "$lib/db";
import { json } from "@sveltejs/kit";

export async function POST({request}): Promise<Response> {
    // data is expected to be valid json from the signup request
    let data = await request.json();
    let newUser: User = {...data}
    let user = addNewUser(newUser)
    
    if (user !== null) {
        let user = getUser(newUser.username)
        if (!user) return json(null)
        return json(user)
    } else return json(null)
}