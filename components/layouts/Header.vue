<template>
	<header class="mx-auto sticky top-0 w-full backdrop-blur-lg z-10">
		<nav
			class="flex justify-between h-20 items-center font-semibold px-10 wrapper uppercase">
			<div class="">
				<NuxtLink to="/">HXH API</NuxtLink>
			</div>
			<ul class="flex space-x-5 items-center">
				<li><NuxtLink to="/">Home</NuxtLink></li>
				<li>
					<a
						href="https://github.com/akocero/hxh_api_docs"
						target="_blank">
						Docs
					</a>
				</li>
				<li><NuxtLink to="/">Playground</NuxtLink></li>
				<li>
					<button
						@click="AppStore.toggleRegistrationForm"
						class="rounded-lg font-semibold bg-gray-800 text-gray-50 px-4 py-2 hover:bg-gray-700 uppercase">
						Api key
					</button>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore';

const AppStore = useAppStore();
</script>

<style lang="scss" scoped></style>
