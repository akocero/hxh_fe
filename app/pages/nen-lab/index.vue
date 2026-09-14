<template>
	<div class="flex flex-col items-center justify-center text-center min-h-[70vh] py-20">
		<!-- Decorative glow -->
		<div class="absolute pointer-events-none w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 animate-nen-pulse"
			style="background: radial-gradient(circle, hsl(360,74%,51%) 0%, transparent 65%);"></div>

		<!-- Badge -->
		<div class="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-primary/40 bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em]">
			<span class="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse"></span>
			In Development
		</div>

		<!-- Heading -->
		<h1 class="font-bebas text-6xl md:text-9xl leading-none tracking-wide mb-4">
			NEN <span class="text-primary">LAB</span>
		</h1>

		<!-- Sub-label -->
		<div class="flex items-center justify-center gap-4 mb-8 w-full max-w-xs mx-auto">
			<div class="flex-1 h-px bg-primary/40"></div>
			<span class="font-bebas text-xl text-primary tracking-[0.3em]">COMING SOON</span>
			<div class="flex-1 h-px bg-primary/40"></div>
		</div>

		<p class="text-gray-400 max-w-md leading-relaxed mb-10">
			The Nen Lab is being forged. Select two Nen users, combine their aura, and breed a unique chimera offspring with inherited abilities.
		</p>

		<!-- Back link -->
		<NuxtLink to="/"
			class="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 text-gray-400 font-bold uppercase tracking-[0.12em] text-sm hover:border-primary hover:text-primary transition-all duration-300 group">
			<span class="transition-transform group-hover:-translate-x-1">←</span>
			<span>Back to Home</span>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
useHead({ title: 'Nen Lab — Coming Soon | HxH API' });
useSeoMeta({
	title: 'Nen Lab — Coming Soon | HxH API',
	description: 'The Nen Lab is coming soon. Breed chimera offspring by combining Nen types from the Hunter x Hunter universe.'
});
</script>
