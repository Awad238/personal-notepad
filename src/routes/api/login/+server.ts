import { fetchUser } from '$lib/db';
import { json } from '@sveltejs/kit';

export async function POST({ request }): Promise<Response> {
	let data = await request.json();
	// console.log(data);

    try {
        let user = fetchUser(data.username, data.password);
        console.log(user)
        if (user === null) {
            return json(null, { status: 404 });
        } else {
            const headers = {
                'Set-Cookie': `currentUser=${user.username}; Path=/; SameSite=Lax; HttpOnly; Max-Age=86400`
            };
            let response = new Response(JSON.stringify(user), { headers: headers });
            return response;
        }
        
    } catch (error) {
        return new Response(null, {status: 401})
    }
}
