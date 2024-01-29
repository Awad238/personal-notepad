<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { type CurrentUser, currentUser as cu } from '$lib/store';

	export let showModal: boolean = false;
	let username: string = 'janedoe';
	let password: string = 'secret';

	const handleLogin = async () => {
		try {
			let data = { username, password };
			let response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
	
			let result = await response.json();
			console.log(result);
			const status = await response.status;
			if (status === 401) {
				toast.error('Login failed');
			} else if (result !== null) {
				// Set global user info
				cu.set(result);
				
				const user = JSON.stringify({ ...result });
				// Set user in localStorage
				localStorage.setItem('currentUser', user);
				
				toast.success('Login successful!');
				console.log('Redirecting ...');
				setTimeout(() => {
					goto('/');
				}, 1000);
			}
			
		} catch (error) {
			console.log(error)
			toast.error('Login failed!');
		}
	};
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div hidden={showModal}>
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
				<h3 class="flex-1 text-lg font-medium text-slate-700">Welcome back!</h3>
			</header>
			<!-- Modal body -->
			<div id="content-4a" class="flex-1">
				<div class="flex flex-col gap-6">
					<!-- Input field -->
					<div class="relative">
						<input
							id=""
							type="text"
							bind:value={username}
							placeholder="your name"
							class="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-indigo-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
						/>
						<label
							for="id-b03"
							class="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-[''] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
						>
							Your username
						</label>
						<small
							class="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500"
						>
							<span>Enter your username</span>
						</small>
					</div>
					<!-- Input field -->
					<div class="relative my-6">
						<input
							id=""
							type="password"
							bind:value={password}
							placeholder="your password"
							class="relative w-full h-10 px-4 pr-12 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-indigo-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
						/>
						<label
							for="id-b13"
							class="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-[''] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
						>
							Your password
						</label>
						<small
							class="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500"
						>
							<span>Enter your password</span>
						</small>
					</div>
				</div>
				<div class="text-xs float-right text-slate-400">
					<a
						href="/signup"
						class="hover:underline underline-offset-4 decoration-dotted decoration-indigo-400 text-indigo-500"
						>Signup instead?</a
					>
				</div>
			</div>
			<!-- Modal actions -->
			<div class="flex justify-center gap-2">
				<button
					on:click={handleLogin}
					class="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-indigo-300 disabled:bg-indigo-300 disabled:shadow-none"
				>
					<span>Login</span>
				</button>
			</div>
		</div>
	</div>
	<!-- End Modal with form -->
</div>
