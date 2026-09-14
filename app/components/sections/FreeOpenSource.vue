<template>
	<section class="md:my-24 my-16">
		<div
			class="relative rounded-3xl border border-primary/30 bg-dark_light overflow-hidden px-8 py-14 md:px-16 md:py-20">
			<!-- subtle red glow in background -->
			<div
				class="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
			<div
				class="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>

			<div class="relative flex flex-col md:flex-row gap-12 items-center md:items-start">
				<!-- Left -->
				<div class="flex-1 text-center md:text-left">
					<div class="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/40 bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
						<span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
						Free Forever · Open Source
					</div>
					<h2 class="font-bebas text-4xl md:text-6xl leading-none tracking-wide mb-6">
						No Paywalls.<br />No Sign-up Fees.<br />
						<span class="text-primary">No Catch.</span>
					</h2>
					<p class="text-gray-400 max-w-lg leading-relaxed">
						The HxH API is completely free to use and open source under the MIT license. Generate your API key
						in seconds, explore the full HxH universe in JSON, and contribute back to the codebase if you want
						to make it even better.
					</p>
					<ul class="mt-8 space-y-3 text-sm text-left inline-block">
						<li v-for="item in highlights" :key="item" class="flex items-center gap-3">
							<span class="text-primary font-bold text-base">✓</span>
							<span class="text-gray-300">{{ item }}</span>
						</li>
					</ul>
				</div>

				<!-- Right -->
				<div class="flex flex-col gap-4 w-full md:w-72 flex-shrink-0">
					<a
						href="https://github.com/akocero/node_hxh_api"
						target="_blank"
						class="flex items-center gap-4 bg-gray-900 border border-gray-700 rounded-2xl px-6 py-5 hover:border-gray-500 transition-colors group">
						<svg class="w-8 h-8 text-gray-300 flex-shrink-0 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
							<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
						</svg>
						<div>
							<p class="font-semibold text-gray-100">API Source Code</p>
							<p class="text-xs text-gray-500 mt-0.5">akocero/node_hxh_api</p>
						</div>
					</a>
					<a
						href="https://github.com/akocero/hxh_api_docs"
						target="_blank"
						class="flex items-center gap-4 bg-gray-900 border border-gray-700 rounded-2xl px-6 py-5 hover:border-gray-500 transition-colors group">
						<svg class="w-8 h-8 text-gray-300 flex-shrink-0 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
							<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
						</svg>
						<div>
							<p class="font-semibold text-gray-100">Documentation</p>
							<p class="text-xs text-gray-500 mt-0.5">akocero/hxh_api_docs</p>
						</div>
					</a>
					<div class="bg-gray-900 border border-gray-700 rounded-2xl px-6 py-5">
						<p class="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">License</p>
						<p class="font-semibold text-gray-100">MIT License</p>
						<p class="text-xs text-gray-500 mt-1">Use it, fork it, ship it.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const highlights = [
	'No credit card required',
	'No usage fees — ever',
	'API key in under a minute',
	'Source code publicly available on GitHub',
	'Contributions welcome',
];
</script>
