<script lang="ts">
	import NotesRenderer from '$lib/components/new-notes/notesRenderer.svelte';
	let source = `\
# Title
\`code block\` 
- list
## h2
### h3
### h4
##### h5
###### h6
1. One
2. Two
3. Three

\`Another code block\`

    block of code e.g. a callout
something else

newline and something else again
<br>
then something else
<hr>
Something under hr
`;
	// source = ""
</script>

<svelte:head>
	<!-- <title>{data.note?.title}</title> -->
</svelte:head>

<div class="flex float-right mb-2 md:float-none">
	<button class="border-0 px-4 py-2 shadow rounded bg-indigo-400 text-white h-10 scale-90">
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
	<button class="border-0 px-4 py-2 shadow rounded bg-red-500 text-white h-10 scale-90">
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
</div>

<div class=" space-y-4 md:space-y-0 md:grid grid-cols-2 gap-8 lg:gap-12">
	<textarea
		class="w-full border h-96 md:h-full rounded resize-none py-0.5 placeholder:text-sm px-2 shadow-sm focus:outline-none"
		placeholder="Starting writing..."
		bind:value={source}
	></textarea>
	<div class="min-h-[16rem] shadow-sm border p-2 rounded border-neutral-300">
		<NotesRenderer {source} />
	</div>
</div>
