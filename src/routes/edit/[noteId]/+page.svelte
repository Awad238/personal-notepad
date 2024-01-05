<script lang="ts">
	import NotesRenderer from '$lib/components/new-notes/notesRenderer.svelte';
	import HelpModalContent from '$lib/components/modals/HelpModalContent.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Note } from '$lib/db';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	export let data: PageData;
	let source = data.note?.content;
	let showCheatSheetModal = true;
	let showImportModal = true;
	let importNote: FileList;

	// ! remove me
	$: if (importNote) {
		console.log(importNote);
	}

	// auto-save note every minute
	onMount(() => {
		const interval = setInterval(() => {
			const autoSave = async () => {
				let note: Note = data.note!;
				note.content = source!;
				note.lastModified = Date.now();

				let response = await fetch('/api/auto-save', {
					method: 'POST',
					body: JSON.stringify(note)
				});

				let result = await response.json();
			};
			autoSave();
			console.log(`Saving note at ${new Date().toLocaleString()}`);
		}, 1000 * 60); // every minute
		return () => clearInterval(interval);
	});

	const saveNote = async () => {
		let note: Note = data.note!;
		note.content = source!;
		let response = await fetch('/api/auto-save', {
			method: 'POST',
			body: JSON.stringify(note)
		});

		let result = await response;
		console.log(result);
		if (result) {
			toast.success('Saved!');
		}
	};

	const deleteNote = async () => {
		const response = await fetch(`/api/delete-note/${data.note?._id}`, {
			method: 'DELETE'
		});
		const result = await response.json();
		console.log(result);
		if (result.message === true) return goto('/');
		else alert('Note was not deleted');
	};

	const exportNote = () => {
		let rawMarkdown = document.getElementById('RawMarkdown') as HTMLTextAreaElement;
		const blob = new Blob([rawMarkdown?.value], {
			type: 'text/x-markdown'
		});

		let dlLink = document.createElement('a');
		dlLink.download = `${data.note?.title}.md`;
		const downloadUrl = window.URL.createObjectURL(blob);
		dlLink.href = downloadUrl;
		dlLink.click();
		setTimeout(() => {
			console.log(`Revoking url: ${downloadUrl}`);
			window.URL.revokeObjectURL(downloadUrl);
			console.log(`Revoked!`);
		}, 2000);
		toast.promise(() => new Promise((resolve) => setTimeout(resolve, 4000)), {
			loading: 'Exporting...',
			success: 'Exported!',
			error: 'An error occurred'
		});
	};

	const handleImport = async (event: SubmitEvent) => {
		try {
			event.preventDefault();
			// @ts-ignore
			const files = event.currentTarget.importFile.files;
			const file = files[0];
			source = await file.text();
			toast.success(`Successfully imported ${await file.name}!`);
		} catch (error) {
			console.error(error)
			toast.error(`Could not import this file.`);
		}
	};
</script>

<svelte:head>
	<title>{data.note?.title}</title>
</svelte:head>

<div hidden={showCheatSheetModal}>
	<!-- Component: Modal with title & text -->
	<!-- Modal with title & text -->
	<!-- Modal backdrop -->
	<div
		class="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
		aria-labelledby="header-3a content-3a"
		aria-modal="true"
		tabindex="-1"
		role="dialog"
	>
		<!-- Modal -->
		<div
			class="flex max-h-[90vh] w-11/12 max-w-xl flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
			id="modal"
			role="document"
		>
			<!-- Modal header -->
			<header id="header-3a" class="flex items-center gap-4">
				<h3 class="flex-1 text-xl font-medium text-slate-700">Help & CheatSheet</h3>
				<button
					class="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap text-indigo-500 hover:bg-indigo-100 hover:text-indigo-600 focus:bg-indigo-200 focus:text-indigo-700 disabled:cursor-not-allowed disabled:text-indigo-300 disabled:shadow-none disabled:hover:bg-transparent"
					aria-label="close dialog"
					on:click={() => {
						showCheatSheetModal === false
							? (showCheatSheetModal = true)
							: (showCheatSheetModal = false);
					}}
				>
					<span class="relative only:-mx-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-5 h-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.5"
							role="graphics-symbol"
							aria-labelledby="title-79 desc-79"
						>
							<title id="title-79">Icon title</title>
							<desc id="desc-79">A more detailed description of the icon</desc>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</span>
				</button>
			</header>
			<p>Note is automatically saved every minute.</p>
			<!-- Modal body -->
			<div class="flex-1 overflow-auto">
				<HelpModalContent />
			</div>
		</div>
	</div>
	<!-- End Modal with title & text -->
</div>

<div class="flex float-right mb-2 md:float-none">
	<button
		class="border-0 px-4 py-2 shadow rounded bg-indigo-500 text-white h-10 scale-90 hover:bg-indigo-600"
		on:click={saveNote}
	>
		<p class="flex">
			Save
			<span class="pl-1">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M5 21h14a2 2 0 0 0 2-2V8l-5-5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2M7 5h4v2h2V5h2v4H7zm0 8h10v6H7z"
					/></svg
				>
			</span>
		</p>
	</button>
	<button
		class="border-0 px-4 py-2 shadow rounded bg-yellow-500 text-white h-10 scale-90 hover:bg-yellow-600"
		on:click={() => {
			showImportModal === true ? showImportModal = false : showImportModal = true
		}}
	>
		<p class="flex">
			Import
			<span class="pl-1">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m-1 1.5L18.5 9H13m-2.95 2.22l2.83 2.83L15 11.93V19H7.93l2.12-2.12l-2.83-2.83"
					/></svg
				>
			</span>
		</p>
	</button>
	<button
		class="border-0 px-4 py-2 shadow rounded bg-emerald-500 text-white h-10 scale-90 hover:bg-emerald-600"
		on:click={exportNote}
	>
		<p class="flex">
			Export
			<span class="pl-1">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m-1 1.5L18.5 9H13m-4.07 3.22H16v7.07l-2.12-2.12L11.05 20l-2.83-2.83l2.83-2.82"
					/></svg
				>
			</span>
		</p>
	</button>
	<button
		class="border-0 px-4 py-2 shadow rounded bg-red-500 text-white h-10 scale-90 hover:bg-red-600"
		on:click={deleteNote}
	>
		<p class="flex">
			Delete
			<span class="pl-1">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M13 9h5l-5-5zm2.9 12.5l-1.4-1.4l2.1-2.1l-2.1-2.1l1.4-1.4l2.1 2.1l2.1-2.1l1.4 1.4l-2.075 2.1l2.075 2.1l-1.4 1.4l-2.1-2.075zM6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v4.35q-.475-.175-.987-.262T17.975 12q-2.5 0-4.237 1.738T12 17.975q0 1.125.4 2.163T13.55 22z"
					/></svg
				>
			</span>
		</p>
	</button>
	<button
		class="border-0 px-4 py-2 shadow rounded bg-blue-500 text-white h-10 scale-90 hover:bg-blue-600"
		on:click={() => {
			showCheatSheetModal === true ? (showCheatSheetModal = false) : (showCheatSheetModal = true);
		}}
	>
		<p class="flex">
			Help
			<span class="pl-1">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M11.95 18q.525 0 .888-.363t.362-.887q0-.525-.362-.888t-.888-.362q-.525 0-.887.363t-.363.887q0 .525.363.888t.887.362m-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.312.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825M12 22q-2.075 0-3.9-.787t-3.175-2.138q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"
					/></svg
				>
			</span>
		</p>
	</button>
</div>

<div class=" space-y-4 md:space-y-0 md:grid grid-cols-2 gap-8 lg:gap-12">
	<textarea
		class="w-full border h-96 md:h-full rounded resize-none py-0.5 placeholder:text-sm px-2 shadow-sm focus:outline-none"
		placeholder="Start writing..."
		bind:value={source}
		id="RawMarkdown"
	></textarea>
	{#key source}
		<div
			class="min-h-[16rem] shadow-sm border p-2 rounded border-neutral-300"
			id="RenderedMarkdown"
		>
			<NotesRenderer {source} />
		</div>
	{/key}
</div>

<div hidden={showImportModal}>
	<!-- Component: Modal with form -->
	<!-- Modal backdrop -->
	<div
		class="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
		aria-labelledby="header-4a content-4a"
		aria-modal="true"
		tabindex="-1"
		role="dialog"
	>
		<!-- Modal -->
		<div
			class="flex max-h-[90vh] max-w-sm flex-col gap-4 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
			id="modal"
			role="document"
		>
			<!-- Modal header -->
			<header id="header-4a" class="flex items-center">
				<h3 class="flex-1 text-lg font-medium text-slate-700">Import Note</h3>
				<button
					class="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap text-indigo-500 hover:bg-indigo-100 hover:text-indigo-600 focus:bg-indigo-200 focus:text-indigo-700 disabled:cursor-not-allowed disabled:text-indigo-300 disabled:shadow-none disabled:hover:bg-transparent"
					aria-label="close dialog"
					on:click={() => {
						showImportModal === false ? showImportModal = true : showImportModal = false
					}}
				>
					<span class="relative only:-mx-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-5 h-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.5"
							role="graphics-symbol"
							aria-labelledby="title-79 desc-79"
						>
							<title id="title-79">Icon title</title>
							<desc id="desc-79">A more detailed description of the icon</desc>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</span>
				</button>
			</header>
			<!-- Modal body -->
			<form on:submit={handleImport}>
				<div id="content-4a" class="flex-1">
					<div class="flex flex-col gap-6">
						<!-- Input field -->
						<div class="relative mb-6">
							<input
								class="w-full h-10 px-4 pr-12 text-sm placeholder-transparent transition-all border-0 rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-indigo-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
								id="importFile"
								type="file"
								name="importFile"
								accept=".md"
								bind:files={importNote}
							/>
							<!-- <label for="importFile" class="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-[''] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"> Import</label> -->
							<small
								class="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500"
							>
								<span>Must be a Markdown file (.md)</span>
							</small>
						</div>
					</div>
				</div>
				<!-- Modal actions -->
				<div class="flex justify-center gap-2">
					<button
						class="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-indigo-300 disabled:bg-indigo-300 disabled:shadow-none"
						type="submit"
					>
						<span>Import</span>
					</button>
				</div>
			</form>
		</div>
	</div>
	<!-- End Modal with form -->
</div>
