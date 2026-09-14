<template>
	<section class="breakout py-16 md:py-24 relative overflow-hidden"
		style="background: linear-gradient(180deg, transparent 0%, rgba(200,30,30,0.04) 50%, transparent 100%);">
		<div class="wrapper md:px-10 px-4">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
				<div
					v-for="stat in stats"
					:key="stat.label"
					class="clip-corner-tr relative bg-dark_light border border-primary/20 p-6 md:p-10 flex flex-col items-center text-center gap-3 overflow-hidden group hover:border-primary/50 transition-all duration-500">

					<!-- Top accent line -->
					<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
					<!-- Corner glow -->
					<div class="absolute top-0 right-0 w-10 h-10 bg-primary/20 blur-lg pointer-events-none group-hover:bg-primary/50 transition-colors duration-500"></div>

					<span class="font-bebas text-5xl md:text-7xl text-primary transition-all duration-300"
						style="text-shadow: 0 0 30px rgba(200,30,30,0.4);">
						{{ stat.display }}
					</span>
					<span class="text-gray-500 uppercase text-xs font-bold tracking-[0.25em]">{{ stat.label }}</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const props = defineProps<{
	characterCount: number;
	groupCount: number;
}>();

const charDisplay = ref('0');
const groupDisplay = ref('0');

function countUp(target: number, setter: (v: string) => void) {
	if (!target) return;
	const duration = 1800;
	const start = performance.now();
	const tick = (now: number) => {
		const progress = Math.min((now - start) / duration, 1);
		const eased = 1 - Math.pow(1 - progress, 3);
		setter(Math.round(eased * target).toString());
		if (progress < 1) requestAnimationFrame(tick);
	};
	requestAnimationFrame(tick);
}

watch(
	() => props.characterCount,
	(val) => { if (val) countUp(val, (v) => (charDisplay.value = v)); },
	{ immediate: true }
);

watch(
	() => props.groupCount,
	(val) => { if (val) countUp(val, (v) => (groupDisplay.value = v)); },
	{ immediate: true }
);

const stats = computed(() => [
	{ display: charDisplay.value + '+', label: 'Characters' },
	{ display: groupDisplay.value + '+', label: 'Groups' },
	{ display: '6',    label: 'Nen Types' },
	{ display: 'Free', label: 'No Cost' },
]);
</script>
