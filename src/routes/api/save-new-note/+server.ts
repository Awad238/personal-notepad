import { addNote, type Note } from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function POST(event: RequestEvent): Promise<Response> {
	let data = await event.request.json();
	let note: Note = { title: data.title, content: '' };
	let result = addNote(note);
	if (result) {
		return json({ message: 'Saved', noteId: result });
	}
	return json({ message: result });
}
