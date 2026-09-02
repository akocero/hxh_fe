<script setup lang="ts">
const introImg = '/img/intro_img.webp';
</script>

<template>
	<section class="flex justify-center gap-10 my-16">
		<div class="hidden md:block">
			<img :src="introImg" alt="" />
		</div>
		<div class="max-w-2xl flex flex-col justify-center text-center md:text-left">
			<h1 class="text-4xl md:text-6xl font-sans font-extrabold mb-4 uppercase">
				<span class="text-primary drop-shadow">Hunter x Hunter</span>
				<br />
				Database API
			</h1>
			<p class="text-gray-400">
				Welcome to the Hunter x Hunter Database API — your all-access Hunter license to explore the rich
				world of Gon, Killua, Kurapika, and beyond. Whether you're hunting for character profiles, group
				affiliations, or deep lore, this API harnesses the power of Nen to deliver fast, structured JSON
				responses. Equip yourself with an API key and start querying the HxH universe like a true
				professional Hunter.
			</p>
			<div class="h-10 flex items-center space-x-4 mt-10 justify-center md:justify-start">
				<a
					href="https://github.com/akocero/hxh_api_docs"
					target="_blank"
					class="rounded-lg font-semibold bg-gray-800 text-gray-50 px-8 py-3 hover:bg-gray-700">
					Documentation
				</a>
				<a
					href="#playground"
					class="rounded-lg font-semibold bg-red-600 text-gray-50 px-8 py-3 hover:bg-red-500">
					Playground
				</a>
			</div>
		</div>
	</section>
</template>
