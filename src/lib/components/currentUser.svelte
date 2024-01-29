<script lang="ts">
	import { goto } from '$app/navigation';
	import { beforeUpdate } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { currentUser as cu, type CurrentUser } from '$lib/store';
	let currentUser: CurrentUser = undefined;
	// $: currentUser = $cu

	beforeUpdate(async () => {
		// console.log("cu: ", $cu);
		let user = localStorage.getItem('currentUser');
		if (user) {
			cu.set(JSON.parse(user));
			currentUser = $cu;
		} else {
			return goto('/login');
		} 
	});

	const logout = () => {
		let confirmLogout = confirm("Are you sure you want to logout?")
		if (confirmLogout === true) {
			let user = localStorage.getItem('currentUser');
			if (user) {
				cu.set(null);
				localStorage.removeItem('currentUser');
				toast.info('Logout successful!');
				setTimeout(() => {
					location.reload();
				}, 1500);
			}
		}
	};
</script>

<a
	href="/"
	class="font-semibold hover:underline decoration-dotted text-indigo-400 flex"
	on:click={logout}
>
	<span>{currentUser && currentUser.name}</span>
	<span>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
			/>
		</svg>
	</span>
</a>
