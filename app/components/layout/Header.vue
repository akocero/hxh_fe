<template>
	<header class="mx-auto sticky top-0 w-full backdrop-blur-lg z-10">
		<nav
			class="flex justify-between h-20 items-center font-semibold md:px-10 px-4 wrapper uppercase">
			<div>
				<NuxtLink to="/">HXH API</NuxtLink>
			</div>
			<ul class="md:flex space-x-5 items-center hidden">
				<li><NuxtLink to="/">Home</NuxtLink></li>
				<li>
					<a href="https://github.com/akocero/hxh_api_docs" target="_blank">Docs</a>
				</li>
				<li><a href="#playground">Playground</a></li>
				<li v-if="AuthStore.isAuthenticated">
					<NuxtLink to="/dashboard" class="rounded-lg font-semibold bg-gray-800 text-gray-50 px-4 py-2 hover:bg-gray-700">
						Dashboard
					</NuxtLink>
				</li>
				<li v-else>
					<NuxtLink to="/login" class="rounded-lg font-semibold bg-gray-800 text-gray-50 px-4 py-2 hover:bg-gray-700">
						Login
					</NuxtLink>
				</li>
				<li>
					<button
						@click="AppStore.toggleRegistrationForm"
						class="rounded-lg font-semibold bg-primary text-gray-50 px-4 py-2 hover:opacity-90 uppercase">
						Api key
					</button>
				</li>
			</ul>
			<!-- mobile -->
			<div class="flex items-center gap-2 md:hidden">
				<NuxtLink
					v-if="AuthStore.isAuthenticated"
					to="/dashboard"
					class="rounded-lg font-semibold bg-gray-800 text-gray-50 px-4 py-2 hover:bg-gray-700 uppercase">
					Dashboard
				</NuxtLink>
				<NuxtLink
					v-else
					to="/login"
					class="rounded-lg font-semibold bg-gray-800 text-gray-50 px-4 py-2 hover:bg-gray-700 uppercase">
					Login
				</NuxtLink>
				<button
					@click="AppStore.toggleRegistrationForm"
					class="rounded-lg font-semibold bg-primary text-gray-50 px-4 py-2 hover:opacity-90 uppercase">
					Api key
				</button>
			</div>
		</nav>
	</header>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';

const AppStore = useAppStore();
const AuthStore = useAuthStore();

onMounted(() => {
	AuthStore.init();
});
</script>
