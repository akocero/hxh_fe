<template>
	<div class="py-10 md:py-16">

		<!-- Header -->
		<div class="mb-12">
			<NuxtLink to="/" class="inline-flex items-center gap-2 text-xs text-gray-600 hover:text-gray-400 font-bold uppercase tracking-wider mb-6 transition-colors">
				← Home
			</NuxtLink>
			<span class="font-bebas text-primary tracking-[0.3em] text-sm uppercase block mb-1">Try It Live</span>
			<h1 class="font-bebas text-5xl md:text-7xl leading-none tracking-wide mb-3">PLAYGROUND</h1>
			<p class="text-gray-400 max-w-xl">
				Enter your API key and any endpoint to execute a live GET request against the HxH API and inspect the response.
			</p>
		</div>

		<!-- Playground form + response -->
		<div class="md:flex items-start gap-6 w-full" @submit.prevent="handleExecute">
			<form class="space-y-6 bg-dark_light border border-gray-800 p-6 md:p-8 md:w-[38%] flex-shrink-0">

				<!-- Top accent -->
				<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent pointer-events-none"></div>

				<BaseAlert v-if="alert_option" :option="alert_option" />

				<div>
					<p class="text-gray-500 text-sm">Kindly ensure all fields are properly filled.</p>
				</div>

				<div>
					<BaseInput label="API Key" type="text" v-model="api_key" />
				</div>

				<div>
					<BaseInput label="Endpoint (e.g. /characters or /characters/:id)" type="text" v-model="endpoint" />
					<span class="mt-2 block text-xs text-gray-600 uppercase tracking-wider">GET method only</span>
				</div>

				<div class="flex justify-end gap-2">
					<button
						v-if="!store.is_loading"
						class="px-6 py-2.5 font-bold uppercase tracking-[0.12em] text-sm bg-primary text-white hover:bg-red-500 transition-colors"
						style="box-shadow: 0 0 20px rgba(200,30,30,0.3);">
						Execute →
					</button>
					<button
						v-else
						type="button"
						class="px-6 py-2.5 font-bold uppercase tracking-[0.12em] text-sm bg-gray-800 text-gray-500 cursor-not-allowed"
						disabled>
						Processing...
					</button>
				</div>
			</form>

			<!-- Response panel -->
			<div class="flex-1 mt-6 md:mt-0">
				<div v-if="store.is_loading" class="flex items-center justify-center h-48 bg-dark_light border border-gray-800">
					<BaseSpinner />
				</div>

				<div v-else-if="store.response || store.error" class="overflow-auto max-h-[600px] w-full bg-dark_light border border-gray-800">
					<div class="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
						<span class="w-2 h-2 rounded-full" :class="store.error ? 'bg-red-500' : 'bg-green-400'"></span>
						<span class="text-xs font-mono text-gray-500">{{ store.error ? 'Error' : '200 OK' }}</span>
					</div>
					<pre class="p-5 text-sm leading-relaxed" v-html="syntaxHighlight(JSON.stringify(store.response || store.error, undefined, 4))"></pre>
				</div>

				<div v-else class="flex flex-col items-center justify-center h-48 bg-dark_light border border-gray-800 border-dashed text-gray-700 text-sm gap-2">
					<span class="text-2xl">⚡</span>
					<span class="font-bold uppercase tracking-wider text-xs">Response will appear here</span>
				</div>
			</div>
		</div>

		<!-- Example endpoints -->
		<div class="mt-12">
			<h2 class="font-bebas text-2xl tracking-wide text-gray-400 mb-4">Example Endpoints</h2>
			<div class="flex flex-wrap gap-2">
				<button
					v-for="ex in examples"
					:key="ex"
					@click="endpoint = ex"
					class="px-3 py-1.5 text-xs font-mono bg-dark_light border border-gray-800 text-gray-400 hover:border-primary/40 hover:text-primary transition-all">
					{{ ex }}
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { usePlaygroundStore } from '@/stores/playground';

useHead({ title: 'Playground — HxH API' });
useSeoMeta({
	title: 'Playground — HxH API',
	description: 'Test the Hunter x Hunter REST API live. Enter your API key and query any endpoint to inspect the JSON response.'
});

const store = usePlaygroundStore();
const endpoint = ref('');
const api_key = ref('');
const alert_option = ref<{ type: 'error' | 'success'; title: string; body: string } | null>(null);

const examples = [
	'/characters',
	'/characters?limit=5',
	'/characters?nen_type=enhancement',
	'/characters/random',
	'/groups',
	'/groups/random',
];

const handleExecute = async () => {
	alert_option.value = null;

	if (!api_key.value) {
		alert_option.value = { title: 'Failed!', body: `API key can't be blank.`, type: 'error' };
		return;
	}
	if (!endpoint.value) {
		alert_option.value = { title: 'Failed!', body: `Endpoint can't be blank.`, type: 'error' };
		return;
	}

	await store.execute(endpoint.value, api_key.value);
};

function syntaxHighlight(json: string) {
	if (!json) return '';
	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return json.replace(
		/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
		(match) => {
			let cls = 'number';
			if (/^"/.test(match)) cls = /:$/.test(match) ? 'key' : 'string';
			else if (/true|false/.test(match)) cls = 'boolean';
			else if (/null/.test(match)) cls = 'null';
			return `<span class="${cls}">${match}</span>`;
		}
	);
}
</script>
