import { deleteNote } from '$lib/db';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function DELETE(event: RequestEvent): Promise<Response> {
	console.log('Event: ', event.params.noteId);
	const noteId = event.params.noteId;
	const result = deleteNote(noteId!);
	console.log(result);
	if (result === true) {
		return json({ message: result });
	}
	return json({ message: false });
}
