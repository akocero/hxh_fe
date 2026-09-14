<template>
	<section class="md:my-24 my-16">
		<!-- Section header -->
		<div class="mb-12 text-center">
			<span class="font-bebas text-primary tracking-[0.3em] text-sm uppercase block mb-1">Get Started</span>
			<h2 class="font-bebas text-5xl md:text-6xl text-white tracking-wide leading-none mb-4">
				UP AND RUNNING IN <span class="text-primary">3 STEPS</span>
			</h2>
			<p class="text-gray-400 max-w-xl mx-auto">
				No billing info. No waiting. Just your email address and you're ready to hunt.
			</p>
		</div>

		<div class="relative">
			<!-- Connector line desktop -->
			<div class="hidden md:block absolute top-8 left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-px bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40"></div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div
					v-for="(step, i) in steps"
					:key="step.title"
					class="clip-corner-tr relative bg-dark_light border border-gray-800 p-8 flex flex-col gap-4 group hover:border-primary/30 transition-all duration-500">

					<!-- Top accent line -->
					<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-500"
						:class="i === 0 ? 'via-primary/80' : 'via-gray-700 group-hover:via-primary/40'"></div>

					<!-- Step number -->
					<div
						class="w-10 h-10 flex items-center justify-center font-bebas text-lg border-2 relative z-10 transition-all duration-300"
						:class="i === 0
							? 'border-primary text-primary'
							: 'border-gray-700 text-gray-500 group-hover:border-primary/50 group-hover:text-primary/70'">
						{{ i + 1 }}
					</div>

					<div>
						<h3 class="font-bebas text-2xl tracking-wide text-white mb-2">{{ step.title }}</h3>
						<p class="text-gray-400 text-sm leading-relaxed">{{ step.description }}</p>
					</div>

					<div v-if="step.action" class="mt-auto pt-2">
						<button
							v-if="step.action.type === 'button'"
							@click="step.action.fn"
							class="text-xs font-bold text-primary hover:text-red-400 uppercase tracking-[0.15em] transition-colors">
							{{ step.action.label }} →
						</button>
						<a
							v-else
							:href="step.action.href"
							target="_blank"
							class="text-xs font-bold text-primary hover:text-red-400 uppercase tracking-[0.15em] transition-colors">
							{{ step.action.label }} →
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';

const AppStore = useAppStore();

const steps = [
	{
		title: 'Register',
		description:
			'Enter your email address to create a Guest account. No password, no payment — just an email.',
		action: { type: 'button', label: 'Generate API Key', fn: () => AppStore.toggleRegistrationForm() }
	},
	{
		title: 'Verify & Receive Key',
		description:
			'Check your inbox for a verification link. Once confirmed, your unique API key is generated automatically.',
		action: null
	},
	{
		title: 'Start Querying',
		description:
			'Pass your key in the x-api-key header and hit any endpoint. Filter, sort, paginate — the full API is yours.',
		action: {
			type: 'link',
			label: 'View Docs',
			href: 'https://github.com/akocero/hxh_api_docs'
		}
	}
];
</script>
