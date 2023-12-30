import type { PageServerLoad } from "./$types";
import {type Note, type Notes, getSomeNotes} from "$lib/db";

export const load: PageServerLoad = ({ params }) => {
    const notes = getSomeNotes(9)
    return {notes}
}