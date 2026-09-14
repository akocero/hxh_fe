<template>
	<section class="md:my-40 my-20 text-center">
		<h2 class="text-3xl font-sans font-extrabold drop-shadow uppercase mb-3">Discover a Random Hunter</h2>
		<p class="text-gray-400 mb-10">
			Hit the button — the API will surface a Hunter from the database at random.
		</p>

		<button
			@click="fetchRandom"
			:disabled="loading"
			class="rounded-lg font-semibold bg-primary text-gray-50 px-8 py-3 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity uppercase tracking-wide">
			{{ loading ? 'Hunting...' : character ? 'Roll Again' : 'Roll a Hunter' }}
		</button>

		<Transition name="fade">
			<div
				v-if="character"
				class="mt-12 flex flex-col md:flex-row items-center md:items-start gap-8 bg-dark_light border border-gray-800 rounded-2xl p-6 md:p-10 max-w-2xl mx-auto text-left">
				<div class="flex-shrink-0">
					<img
						v-if="character.image?.length"
						:src="character.image[0].secure_url"
						alt=""
						class="w-36 h-48 object-cover rounded-xl shadow-xl" />
					<img
						v-else
						src="https://placehold.co/144x192"
						alt=""
						class="w-36 h-48 object-cover rounded-xl shadow-xl" />
				</div>
				<div class="flex flex-col gap-3 min-w-0">
					<h3 class="text-2xl font-sans font-extrabold uppercase capitalize">
						{{ character.name }}
						<span v-if="character.also_known_as?.[0]" class="text-gray-400 text-lg font-normal normal-case">
							({{ character.also_known_as[0] }})
						</span>
					</h3>
					<div class="flex flex-wrap gap-2">
						<span
							v-for="nen in character.nen_type"
							:key="nen"
							class="text-xs px-2 py-1 rounded bg-primary/20 text-primary font-semibold uppercase tracking-wide">
							{{ nen }}
						</span>
						<span
							:class="character.state === 'alive' ? 'bg-green-900/40 text-green-400' : 'bg-gray-800 text-gray-400'"
							class="text-xs px-2 py-1 rounded font-semibold uppercase tracking-wide">
							{{ character.state }}
						</span>
					</div>
					<div v-if="character.professions?.length" class="text-sm text-gray-400 capitalize">
						{{ character.professions.join(' · ') }}
					</div>
					<div v-if="character.abilities?.length" class="mt-1">
						<span class="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-1">Abilities</span>
						<div class="flex flex-wrap gap-1">
							<span
								v-for="ability in character.abilities.slice(0, 4)"
								:key="ability"
								class="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300 capitalize">
								{{ ability }}
							</span>
						</div>
					</div>
					<p v-if="character.details" class="text-sm text-gray-400 leading-relaxed line-clamp-3 mt-1">
						{{ character.details }}
					</p>
				</div>
			</div>
		</Transition>
	</section>
</template>

<script setup lang="ts">
const character = ref<any>(null);
const loading = ref(false);

async function fetchRandom() {
	loading.value = true;
	character.value = null;
	try {
		const res = await $fetch<any>(`${import.meta.env.VITE_HXH_BASE_URL}/characters/random`, {
			headers: { 'x-api-key': import.meta.env.VITE_HXH_API_KEY }
		});
		character.value = res?.data ?? null;
	} catch {
		// silently fail — user can retry
	} finally {
		loading.value = false;
	}
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateY(12px);
}
</style>
