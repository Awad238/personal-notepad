<script lang="ts">
	import HomePageNotes from '$lib/components/home/homePageNotes.svelte';
	import SearchBar from '$lib/components/home/searchBar.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	let showModal: boolean = true
	let noteTitle: string = "";

	export let data: PageData;
	// console.log(data.notes)

	const saveNewNote = async () => {
		console.log(noteTitle)
		let response = await fetch("/api/save-new-note", {
			method: "POST",
			body: JSON.stringify({
				title: noteTitle
			})
		})

		let result = await response.json()

		if (result.message === "Saved") {
			try {
				return goto(`/edit/${result.noteId}`)
			} catch (error) {}
		}
	}
</script>

<svelte:head>
	<title>All Notes</title>
</svelte:head>


<!-- Search Bar -->
<SearchBar />

<!-- Add new Note -->
<div class="flex items-center justify-center mb-8">
	<button
		class="border-0 px-4 py-2 shadow rounded bg-indigo-400 text-white h-10 transition- hover:scale-110"
		on:click={() => showModal === true ? showModal = false : true}
	>
		<p  class="flex">
			New
			<span class="pl-1"
				><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><g fill="none" fill-rule="evenodd"
						><path
							d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
						/><path
							fill="currentColor"
							d="M12 2v6.5a1.5 1.5 0 0 0 1.356 1.493L13.5 10H20v10a2 2 0 0 1-1.85 1.995L18 22H6a2 2 0 0 1-1.995-1.85L4 20V4a2 2 0 0 1 1.85-1.995L6 2zm0 9.5a1 1 0 0 0-.993.883L11 12.5V14H9.5a1 1 0 0 0-.117 1.993L9.5 16H11v1.5a1 1 0 0 0 1.993.117L13 17.5V16h1.5a1 1 0 0 0 .117-1.993L14.5 14H13v-1.5a1 1 0 0 0-1-1m2-9.457a2 2 0 0 1 .877.43l.123.113L19.414 7a2 2 0 0 1 .502.84l.04.16H14z"
						/></g
					></svg
				>
			</span></p
		>
	</button>
</div>

<h3 class="font-bold text-xl underline decoration-dotted underline-offset-2 decoration-neutral-500 hover:decoration-neutral-800 tracking-wide mb-4">All Notes</h3>
<!-- Notes Preview -->
<HomePageNotes notes={data.notes} />


<!-- Component: Modal with form -->
<!-- Modal backdrop -->
<div id="newNoteModal" hidden={showModal}>
	<div class="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm" aria-labelledby="header-4a content-4a" aria-modal="true" tabindex="-1" role="dialog">
		<!-- Modal -->
		<div class="flex max-h-[90vh] max-w-sm flex-col gap-4 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10" id="modal" role="document">
		<!-- Modal header -->
		<header id="header-4a" class="flex items-center">
			<h3 class="flex-1 text-lg font-medium text-slate-700">New Note</h3>
			<button class="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap text-indigo-500 hover:bg-indigo-100 hover:text-indigo-600 focus:bg-indigo-200 focus:text-indigo-700 disabled:cursor-not-allowed disabled:text-indigo-300 disabled:shadow-none disabled:hover:bg-transparent" aria-label="close dialog" on:click={() => {
				showModal === false ? showModal = true : showModal = false
			}}>
			<span class="relative only:-mx-5">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" role="graphics-symbol" aria-labelledby="title-79 desc-79">
				<title id="title-79">Icon title</title>
				<desc id="desc-79">A more detailed description of the icon</desc>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</span>
			</button>
		</header>
		<!-- Modal body -->
		<div id="" class="flex-1">
			<div class="flex flex-col gap-6">
			<!-- Input field -->
			<div class="relative mb-6">
				<input id="noteTitle" type="text" name="noteTitle" placeholder="Note" class="relative w-full h-10 px-4 pr-12 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-indigo-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" bind:value={noteTitle} required />
				<label for="noteTitle" class="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-[''] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">Title</label>
				<small class="absolute flex justify-between w-full px-0 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500">
					<span>e.g. Writing ideas</span>
				</small>
			</div>
			</div>
		</div>
		<!-- Modal actions -->
		<div class="flex justify-center gap-2">
			<button class="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-indigo-300 disabled:bg-indigo-300 disabled:shadow-none" on:click={saveNewNote}>
			<span>Save</span>
			</button>
		</div>
		</div>
	</div>
  <!-- End Modal with form -->
</div>