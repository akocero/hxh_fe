<template>
	<section class="md:my-40 my-20">
		<div>
			<h2 class="text-3xl mb-6 font-sans font-extrabold drop-shadow">
				GROUPS
			</h2>
		</div>
		<div class="grid grid-cols-10 gap-x-5 gap-y-8">
			<div v-for="chr in groups" class="md:col-span-4 col-span-full">
				<div class="bg-white max-h-52 overflow-y-hidden rounded-xl">
					<img
						:src="chr.image[0].secure_url"
						alt=""
						class="object-cover mx-auto" />
				</div>

				<div class="text-center mt-4">
					<h3>
						{{ chr.name }}
					</h3>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
defineProps(['groups']);
</script>

<style lang="scss" scoped></style>
