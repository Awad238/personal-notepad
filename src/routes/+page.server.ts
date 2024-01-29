import type { PageServerLoad } from './$types';
import { type Note, type Notes, getSomeNotes } from '$lib/db';
// import { currentUser } from '$lib/store';
// import { get } from 'svelte/store';


export const load: PageServerLoad = ({ params, request, cookies }) => {
	const currentUser = cookies.get("currentUser")
	if (currentUser) {
		console.log(currentUser)
		let notes: Notes = getSomeNotes(5, currentUser) as Notes;

		// sort by lastModified
		notes = notes.sort((note1, note2) => Number(note1.lastModified) - Number(note2.lastModified));
		return { notes };
	}
	return {  }
};
