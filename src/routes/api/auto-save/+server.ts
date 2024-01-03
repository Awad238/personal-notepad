import { editNote, type Note } from '$lib/db';
import { json } from '@sveltejs/kit';

export async function GET(event: Request): Promise<Response> {
	// event
	console.log(event);
	const options: ResponseInit = {
		status: 418,
		statusText: 'I identify as a Teapot',
		headers: {
			X: 'Gon give it to ya'
		}
	};
	return new Response('Hello', options);
}

export async function POST({ request }): Promise<Response> {
	let data: Note = await request.json();
	console.log(data);

	let result = editNote(data._id!, data);

	if (result) {
		let body = JSON.stringify({
			message: true
		});
		let options = {
			status: 200,
			statusText: 'Ok'
		};
		return new Response(body, options);
	} else return json({ error: 'Not saved' });
}
