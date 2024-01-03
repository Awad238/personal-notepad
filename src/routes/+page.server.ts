import type { PageServerLoad } from './$types';
import { type Note, type Notes, getSomeNotes } from '$lib/db';

export const load: PageServerLoad = ({ params }) => {
	let notes: Notes = getSomeNotes(5);

	// sort by lastModified
	notes = notes.sort((note1, note2) => Number(note1.lastModified) - Number(note2.lastModified));
	return { notes };
};
