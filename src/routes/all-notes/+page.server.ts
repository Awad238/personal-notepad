import type { PageServerLoad } from './$types';
import { type Notes, getAllNotes } from '$lib/db';
import { currentUser } from '$lib/store';

export const load: PageServerLoad = ({ params, cookies }) => {
	const currentUser = cookies.get("currentUser");
	if (currentUser) {
		let notes: Notes = getAllNotes(currentUser) as Notes;
		return { notes };
	}
	return {  };
};
