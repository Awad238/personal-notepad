<script lang="ts">
	import HomePageNotes from '$lib/components/home/homePageNotes.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	export let data: PageData;
	let searchQuery = $page.url.searchParams.get('query');
	console.log(data.searchResult);
</script>

<svelte:head>
	<title>Search Results | {searchQuery}</title>
</svelte:head>

<div>
	<h2 class="font-semibold mb-4 md:text-center">
		Showing {data.searchResult.length <= 1 ? 'result' : 'results'} for
		<span class="bg-indigo-200 px-1.5 py-0.5 rounded bg-opacity-75">{searchQuery}</span>
		<span>&middot;&dash;&middot;</span>
		<span class="font-thin px-2 rounded-full py-0.5 w-10 bg-indigo-100"
			>{data.searchResult.length}</span
		>
	</h2>
</div>

<!-- Notes  Result Preview -->
<HomePageNotes notes={data.searchResult} />
