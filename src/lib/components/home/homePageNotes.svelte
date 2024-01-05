<script lang="ts">
	import type { Notes, Note } from '$lib/db';
	import { toast } from 'svelte-sonner';
	export let notes: Notes;

	const exportNote = (note: Note) => {
		const blob = new Blob([note.content], {
			type: 'text/x-markdown'
		});

		let dlLink = document.createElement('a');
		dlLink.download = `${note.title}.md`;
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
</script>

<ul class="space-y-4 md:grid md:grid-cols-3 md:gap-6 md:space-y-0 md:min-h-[40-rem] lg:grid-cols-5">
	{#if notes.length !== 0}
		{#each notes as note}
			<li
				class="border py-1 rounded hover:shadow-md md:hover:scale-105 md:relative md:bg-indigo-100 md:min-h-[12rem] lg:min-h-[14rem]"
			>
				<div class="flex justify-between md:block">
					<div class="px-2">
						<p class="md:text-center font-semibold text-lg">
							<a
								href="/edit/{note._id}"
								class="hover:underline underline-offset-2 decoration-dotted decoration-black/25"
								>{note.title}</a
							>
						</p>
						<p class="hidden md:line-clamp-2 lg:line-clamp-4 text-sm opacity-70">
							{note.content.length >= 64 ? note.content.substring(0, 64) + ' ...' : note.content}
						</p>
						<p class="text-[0.75rem] mt-2 text-gray-600 hidden md:block text-opacity-75">
							{note.createdAt !== undefined
								? `${new Date(note.createdAt).toLocaleDateString()} · ${new Date(
										note.createdAt
									).toLocaleTimeString()}`
								: ''}
						</p>
					</div>

					<div class="px-2 md:absolute md:bottom-1 md:w-full">
						<section class="flex justify-between mt-0.5 md:mt-0">
							<div class="hidden md:block hover:scale-90">
								<span
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M3.548 20.938h16.9a.5.5 0 0 0 0-1h-16.9a.5.5 0 0 0 0 1M9.71 17.18a2.587 2.587 0 0 0 1.12-.65l9.54-9.54a1.75 1.75 0 0 0 0-2.47l-.94-.93a1.788 1.788 0 0 0-2.47 0l-9.54 9.53a2.473 2.473 0 0 0-.64 1.12L6.04 17a.737.737 0 0 0 .19.72a.767.767 0 0 0 .53.22Zm.41-1.36a1.468 1.468 0 0 1-.67.39l-.97.26l-1-1l.26-.97a1.521 1.521 0 0 1 .39-.67l.38-.37l1.99 1.99Zm1.09-1.08l-1.99-1.99l6.73-6.73l1.99 1.99Zm8.45-8.45L18.65 7.3l-1.99-1.99l1.01-1.02a.748.748 0 0 1 1.06 0l.93.94a.754.754 0 0 1 0 1.06"
										/></svg
									>
								</span>
							</div>
							<div class="flex space-x-4">
								<span class="hover:scale-90 hidden"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023c.479 0 .774-.242.774-.651c0-.366-.254-.586-.704-.586m3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018c.817.006 1.349-.444 1.349-1.396c.006-.83-.479-1.268-1.255-1.268"
										/><path
											fill="currentColor"
											d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 0 1-.308-.018v1.426H7v-3.936A7.558 7.558 0 0 1 8.219 14c.557 0 .953.106 1.22.319c.254.202.426.533.426.923c-.001.392-.131.723-.367.948m3.807 1.355c-.42.349-1.059.515-1.84.515c-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0 1 11.66 14c.757 0 1.249.136 1.633.426c.415.308.675.799.675 1.504c0 .763-.279 1.29-.663 1.615M17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17zM14 9h-1V4l5 5z"
										/></svg
									></span
								>
								<button on:click={() => exportNote(note)}>
									<span class="hover:scale-90"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											><path
												fill="currentColor"
												d="M20.553 18.15H3.447a1.443 1.443 0 0 1-1.442-1.441V7.291c0-.795.647-1.441 1.442-1.441h17.105c.795 0 1.442.646 1.442 1.441v9.418a1.441 1.441 0 0 1-1.441 1.441M6.811 15.268V11.52l1.922 2.402l1.922-2.402v3.748h1.922V8.732h-1.922l-1.922 2.403l-1.922-2.403H4.889v6.535h1.922zM19.688 12h-1.922V8.732h-1.923V12h-1.922l2.884 3.364z"
											/></svg
										></span
									>
								</button>
							</div>
						</section>
					</div>
				</div>
			</li>
		{/each}
	{:else}
		<div
			class="border w-full md:border-0 md:block h-60 rounded border-dotted flex justify-center items-center"
		>
			<p class="text-neutral-400 font-mono text-sm">No notes yet ...</p>
		</div>
	{/if}
</ul>
