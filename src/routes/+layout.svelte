<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	import CurrentUser from '$lib/components/currentUser.svelte';
	import { currentUser } from '$lib/store';
	import { onMount } from 'svelte';

	// onMount(async () => {
		
	// })

	export const data = $currentUser
</script>

<Toaster richColors position="bottom-center" />
<main class="mb-16 mt-0">
	<nav class="p-2 px-4 flex justify-between border-b shadow mb-8">
		<div>
			<h1 class="text-2xl text-center font-bold tracking-wide">
				<a href="/" class="flex"
					>Personal note
					<span class="my-auto">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M3.548 20.938h16.9a.5.5 0 0 0 0-1h-16.9a.5.5 0 0 0 0 1M9.71 17.18a2.587 2.587 0 0 0 1.12-.65l9.54-9.54a1.75 1.75 0 0 0 0-2.47l-.94-.93a1.788 1.788 0 0 0-2.47 0l-9.54 9.53a2.473 2.473 0 0 0-.64 1.12L6.04 17a.737.737 0 0 0 .19.72a.767.767 0 0 0 .53.22Zm.41-1.36a1.468 1.468 0 0 1-.67.39l-.97.26l-1-1l.26-.97a1.521 1.521 0 0 1 .39-.67l.38-.37l1.99 1.99Zm1.09-1.08l-1.99-1.99l6.73-6.73l1.99 1.99Zm8.45-8.45L18.65 7.3l-1.99-1.99l1.01-1.02a.748.748 0 0 1 1.06 0l.93.94a.754.754 0 0 1 0 1.06"
							/></svg
						>
					</span>
				</a>
			</h1>
		</div>
		<div>
			<ul class="flex space-x-4 md:space-x-8">
				<li class="pt-1">
					<a href="/all-notes" class="font-semibold hover:underline decoration-dotted">All Notes</a>
				</li>
				<li class="pt-1">
					<CurrentUser />
				</li>
			</ul>
		</div>
	</nav>
	<div class="border-0 p-2 mx-4 my-0 md:mx-8 lg:mx-12 shadow-0">
		<slot />
	</div>
</main>
