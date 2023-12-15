<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { Html5Qrcode } from 'html5-qrcode';
	import Header from '$lib/header.svelte';

	let scanning = false;
	let html5Qrcode: Html5Qrcode;

	onMount(init);

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
	}

	function start() {
		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			onScanSuccess,
			onScanFailure
		);
		scanning = true;
	}

	async function stop() {
		await html5Qrcode.stop();
		scanning = false;
	}

	function onScanSuccess(decodedText: any, decodedResult: any) {
		alert(`Scanned = ${decodedText}`);
		console.log(decodedResult);
	}

	function onScanFailure(error: any) {
		console.warn(`Scan error = ${error}`);
	}
</script>

<Header />
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<!-- <h1 class="h1">Let's get cracking bones!</h1>
		<p>Start by exploring:</p>
		<ul>
			<li><code class="code">/src/routes/+layout.svelte</code> - barebones layout</li>
			<li><code class="code">/src/app.postcss</code> - app wide css</li>
			<li>
				<code class="code">/src/routes/+page.svelte</code> - this page, you can replace the contents
			</li>
		</ul> -->
		<main>
			<h1 class="h1 mt-10">Let's scan some items!</h1>
			<reader id="reader" />
			{#if scanning}
				<button class="btn variant-filled-warning" on:click={stop}>Stop</button>
			{:else}
				<button class="btn variant-filled-primary" on:click={start}>Scan</button>
			{/if}
		</main>
	</div>
</div>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}

	reader {
		width: 100%;
		min-height: 350px;
		background-color: black;
		border-radius: 14px;
	}
</style>
