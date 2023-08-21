<template>
	<header class="mx-auto sticky top-0 w-full backdrop-blur-lg z-10">
		<nav
			class="flex justify-between h-20 items-center font-semibold md:px-10 px-4 wrapper uppercase">
			<div class="">
				<NuxtLink to="/">HXH API</NuxtLink>
			</div>
			<ul class="md:flex space-x-5 items-center hidden">
				<li><NuxtLink to="/">Home</NuxtLink></li>
				<li>
					<a
						href="https://github.com/akocero/hxh_api_docs"
						target="_blank">
						Docs
					</a>
				</li>
				<li><a href="#playground">Playground</a></li>
				<li>
					<button
						@click="AppStore.toggleRegistrationForm"
						class="rounded-lg font-semibold bg-gray-800 text-gray-50 px-4 py-2 hover:bg-gray-700 uppercase">
						Api key
					</button>
				</li>
			</ul>
			<button
				@click="AppStore.toggleRegistrationForm"
				class="rounded-lg font-semibold bg-gray-800 text-gray-50 px-4 py-2 hover:bg-gray-700 uppercase md:hidden">
				Api key
			</button>
		</nav>
	</header>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore';

const AppStore = useAppStore();
</script>

<style lang="scss" scoped></style>
