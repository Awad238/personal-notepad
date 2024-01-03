import { type Note, getOneNote } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const note = getOneNote(params.noteId);
	return { note };
};
