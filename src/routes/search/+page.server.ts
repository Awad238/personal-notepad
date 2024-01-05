import type { PageServerLoad } from "./[searchQuery]/$types";
import { type Note, type Notes, searchNote } from "$lib/db";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({url}) => {
    const searchQuery = url.searchParams.get("query")!
    const searchResult = searchNote(decodeURI(searchQuery))
    // console.log(searchResult)

    if (searchResult) {
        return {searchResult}
    }
    error(404, 'Not Found')
}