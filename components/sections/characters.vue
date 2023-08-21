<template>
	<section class="md:my-40 my-20">
		<div>
			<h2 class="text-3xl mb-6 font-sans font-extrabold drop-shadow">
				CHARACTERS
			</h2>
		</div>
		<div class="grid grid-cols-10 gap-x-5 gap-y-8">
			<div
				v-for="chr in characters"
				class="group md:col-span-2 col-span-5">
				<div
					class="bg-white max-h-64 overflow-y-hidden rounded-xl group-hover:scale-105 group-hover:rotate-3 transition-all">
					<img
						:src="chr.image[0].secure_url"
						alt=""
						class="object-cover mx-auto" />
				</div>

				<div class="text-sm md:text-base text-center mt-4 capitalize">
					<h3>
						{{ chr.name }}
						<span v-if="chr.also_known_as[0]">
							({{ chr.also_known_as[0] }})
						</span>
					</h3>
					<h3>
						{{ chr.abilities[0] }}
					</h3>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
defineProps(['characters']);
</script>

<style lang="scss" scoped></style>
