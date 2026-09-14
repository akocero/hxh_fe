<template>
	<header
		class="sticky top-0 w-full z-50 transition-all duration-300"
		:class="isScrolled ? 'bg-dark/95 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'">
		<nav class="wrapper md:px-10 px-4 flex justify-between h-20 items-center">

			<!-- Logo -->
			<NuxtLink to="/" class="group flex items-center">
				<span class="font-bebas text-2xl md:text-3xl tracking-widest text-white group-hover:text-primary transition-colors duration-200">
					HXH API
				</span>
			</NuxtLink>

			<!-- Desktop nav -->
			<ul class="hidden md:flex items-center gap-1 font-bold text-xs uppercase tracking-[0.12em]">
				<li>
					<NuxtLink to="/"
						class="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200 relative group">
						Home
						<span class="absolute bottom-0 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
					</NuxtLink>
				</li>
				<li>
					<a href="https://github.com/akocero/hxh_api_docs" target="_blank"
						class="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200 relative group">
						Docs
						<span class="absolute bottom-0 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
					</a>
				</li>
				<li>
					<NuxtLink to="/playground"
						class="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200 relative group">
						Playground
						<span class="absolute bottom-0 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
					</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/nen-lab"
						class="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200 relative group">
						Nen Lab
						<span class="absolute bottom-0 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
					</NuxtLink>
				</li>

				<li class="ml-3">
					<NuxtLink v-if="AuthStore.isAuthenticated" to="/dashboard"
						class="px-5 py-2.5 border border-gray-700 text-gray-300 text-xs font-bold uppercase tracking-[0.12em] hover:border-gray-500 hover:text-white transition-all duration-200">
						Dashboard
					</NuxtLink>
					<NuxtLink v-else to="/login"
						class="px-5 py-2.5 border border-gray-700 text-gray-300 text-xs font-bold uppercase tracking-[0.12em] hover:border-gray-500 hover:text-white transition-all duration-200">
						Login
					</NuxtLink>
				</li>

				<li>
					<button @click="AppStore.toggleRegistrationForm"
						class="px-5 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-[0.12em] hover:bg-red-500 transition-colors duration-200"
						style="box-shadow: 0 0 20px rgba(200,30,30,0.3);">
						Get API Key
					</button>
				</li>
			</ul>

			<!-- Mobile nav -->
			<div class="flex items-center gap-2 md:hidden">
				<NuxtLink v-if="AuthStore.isAuthenticated" to="/dashboard"
					class="px-4 py-2 border border-gray-700 text-xs font-bold uppercase tracking-wider hover:border-gray-500 transition-all">
					Dashboard
				</NuxtLink>
				<NuxtLink v-else to="/login"
					class="px-4 py-2 border border-gray-700 text-xs font-bold uppercase tracking-wider hover:border-gray-500 transition-all">
					Login
				</NuxtLink>
				<button @click="AppStore.toggleRegistrationForm"
					class="px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-red-500 transition-colors">
					API Key
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
const isScrolled = ref(false);

onMounted(() => {
	AuthStore.init();
	const onScroll = () => { isScrolled.value = window.scrollY > 30; };
	window.addEventListener('scroll', onScroll, { passive: true });
	onUnmounted(() => window.removeEventListener('scroll', onScroll));
});
</script>
