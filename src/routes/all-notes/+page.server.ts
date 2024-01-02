import type { PageServerLoad } from "./$types";
import { type Notes, getAllNotes} from "$lib/db";

export const load: PageServerLoad = ({ params }) => {
    let notes: Notes = getAllNotes()
    return {notes}
}