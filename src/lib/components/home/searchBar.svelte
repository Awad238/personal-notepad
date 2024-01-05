<script lang="ts">
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	let searchQuery: string;
</script>

<section class="md:flex items-center justify-center mb-8">
	<div class="flex border-2 rounded md:w-2/3 lg:w-1/2">
		<input
			class="border-0 w-full pl-2 focus:outline-none focus:ring-0 focus:shadow hover:placeholder:text-indigo-400 text-indigo-500 caret-indigo-600"
			type="search"
			placeholder="Search for notes..."
			bind:value={searchQuery}
		/>
		<div>
			<button
				class="border-l px-3 py-1 hover:bg-indigo-100 active:bg-indigo-200"
				type="submit"
				on:click={() => {
					if (searchQuery !== '' && searchQuery !== undefined) {
						return goto(`/search?query=${encodeURI(searchQuery)}`);
					} else {
						return toast.error('Search cannot be empty!');
					}
				}}>Search</button
			>
		</div>
	</div>
</section>
