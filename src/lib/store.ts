import { writable } from "svelte/store";

export type CurrentUser = {
    username: string;
    _id: string;
    name: string;
    lastName: string;
} | undefined | null


export const currentUser = writable<CurrentUser>(null)

currentUser.subscribe((user: CurrentUser) => {
    // console.log("User logged - Subscribed!")
})

currentUser.set(null)