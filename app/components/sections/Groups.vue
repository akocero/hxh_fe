<template>
	<section class="md:my-40 my-20">
		<div>
			<h2 class="text-3xl mb-6 font-sans font-extrabold drop-shadow">GROUPS</h2>
		</div>
		<div class="grid grid-cols-10 gap-x-5 gap-y-8">
			<div v-for="grp in groups" :key="grp._id" class="md:col-span-4 col-span-full">
				<div class="bg-white max-h-52 overflow-y-hidden rounded-xl">
					<img :src="grp.image?.[0]?.secure_url" alt="" class="object-cover mx-auto" />
				</div>
				<div class="text-center mt-4">
					<h3>{{ grp.name }}</h3>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
defineProps<{ groups: any[] }>();
</script>
