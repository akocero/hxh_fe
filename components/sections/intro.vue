<template>
	<section class="flex justify-center gap-10 my-16">
		<div class="hidden md:block">
			<img src="/img/intro_img.webp" alt="" />
		</div>
		<div
			class="max-w-2xl flex flex-col justify-center text-center md:text-left">
			<h1
				class="text-4xl md:text-6xl font-sans font-extrabold mb-4 uppercase">
				<span class="text-primary">Hunter x Hunter</span>
				<br />
				Database API
			</h1>
			<p class="text-gray-400">
				Welcome to the Hunter X Hunter API! This guide is your key to
				exploring the world of HTTP requests in the Hunter X Hunter
				universe. Before you embark on your data-gathering quest.
			</p>
			<div
				class="h-10 flex items-center space-x-4 mt-10 justify-center md:justify-start">
				<a
					href="https://github.com/akocero/hxh_api_docs"
					target="_blank"
					class="rounded-lg font-semibold bg-gray-800 text-gray-50 px-8 py-3 hover:bg-gray-700">
					Documentation
				</a>
				<NuxtLink
					to="/"
					class="rounded-lg font-semibold bg-red-600 text-gray-50 px-8 py-3 hover:bg-red-500">
					Playground
				</NuxtLink>
			</div>
		</div>
	</section>
</template>

<script setup></script>

<style lang="scss" scoped></style>
