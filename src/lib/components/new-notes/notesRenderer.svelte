<script>
	import SvelteMarkdown from 'svelte-markdown';
	import './note.css';
	export let source = new String();
</script>

<div class="markdown">
	<SvelteMarkdown {source} />
</div>
