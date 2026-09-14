<template>
	<section class="md:my-40 my-20">
		<!-- Section header -->
		<div class="mb-10">
			<span class="font-bebas text-primary tracking-[0.3em] text-sm uppercase block mb-1">Factions</span>
			<h2 class="font-bebas text-5xl md:text-6xl text-white tracking-wide leading-none">GROUPS</h2>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
			<div v-for="grp in groups" :key="grp._id" class="group relative overflow-hidden bg-dark_light border border-gray-800/60 group-hover:border-primary/40 transition-all duration-500" style="height: 220px;">

				<!-- Top accent line -->
				<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

				<!-- With image -->
				<template v-if="grp.image?.[0]?.secure_url">
					<img :src="grp.image[0].secure_url"
						:alt="grp.name"
						class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
					<div class="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent"></div>
				</template>

				<!-- Without image — styled placeholder -->
				<template v-else>
					<div class="absolute inset-0 flex items-center justify-center">
						<!-- Decorative Nen grid pattern -->
						<div class="absolute inset-0 opacity-[0.04]"
							style="background-image: linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px); background-size: 32px 32px;"></div>
						<!-- Red glow center -->
						<div class="w-32 h-32 rounded-full blur-3xl opacity-20 animate-nen-pulse"
							style="background: radial-gradient(circle, hsl(360,74%,51%) 0%, transparent 70%);"></div>
					</div>
					<div class="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent"></div>
				</template>

				<!-- Name overlay — always at bottom -->
				<div class="absolute bottom-0 left-0 right-0 p-4">
					<h3 class="font-bebas text-2xl md:text-3xl tracking-wide text-white drop-shadow-lg">{{ grp.name }}</h3>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
defineProps<{ groups: any[] }>();
</script>
