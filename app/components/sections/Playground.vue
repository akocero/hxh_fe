<template>
	<section class="pt-20 md:pt-20 text-sm md:text-base" id="playground">
		<div>
			<h2 class="text-3xl mb-6 font-sans font-extrabold drop-shadow text-center">PLAYGROUND</h2>
		</div>
		<div class="md:flex items-start justify-center w-full" @submit.prevent="handleExecute">
			<form
				class="space-y-6 bg-dark_light p-5 md:p-8 md:w-[38%] rounded-lg shadow-xl">
				<BaseAlert v-if="alert_option" :option="alert_option" />
				<div>
					<h3>Kindly ensure all fields are properly filled.</h3>
				</div>
				<div>
					<BaseInput label="Api key" type="text" v-model="api_key" />
				</div>
				<div>
					<BaseInput label="Ex. /groups or /groups/:id" type="text" v-model="endpoint" />
					<span class="mt-2 block text-sm">GET method only</span>
				</div>
				<div class="flex justify-end gap-2">
					<button
						v-if="!store.is_loading"
						class="rounded-lg font-semibold text-gray-50 px-4 py-2 h-10 hover:bg-green-500 bg-green-600">
						Execute
					</button>
					<button
						v-else
						type="button"
						class="rounded-lg font-semibold text-gray-500 px-4 py-2 h-10 bg-gray-800 disabled:cursor-default"
						disabled>
						Processing...
					</button>
				</div>
			</form>
			<div class="md:w-[2%]" v-if="store.response || store.error"></div>
			<div class="md:w-[60%]" v-if="store.is_loading">
				<BaseSpinner />
			</div>
			<div
				class="md:w-[60%] mt-10 md:mt-0 text-sm md:text-base shadow-xl"
				v-if="store.response || store.error">
				<div class="overflow-auto max-h-[28rem] w-full bg-dark_light rounded-lg">
					<pre v-html="syntaxHighlight(JSON.stringify(store.response || store.error, undefined, 4))"></pre>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { usePlaygroundStore } from '@/stores/playground';

const store = usePlaygroundStore();
const endpoint = ref('');
const api_key = ref('');
const alert_option = ref<{ type: 'error' | 'success'; title: string; body: string } | null>(null);

const handleExecute = async () => {
	alert_option.value = null;

	if (!api_key.value) {
		alert_option.value = {
			title: 'Failed!',
			body: `Api key can't be blank. Please generate an Api key first.`,
			type: 'error'
		};
		return;
	}

	if (!endpoint.value) {
		alert_option.value = {
			title: 'Failed!',
			body: `Endpoint can't be blank`,
			type: 'error'
		};
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
			if (/^"/.test(match)) {
				cls = /:$/.test(match) ? 'key' : 'string';
			} else if (/true|false/.test(match)) {
				cls = 'boolean';
			} else if (/null/.test(match)) {
				cls = 'null';
			}
			return `<span class="${cls}">${match}</span>`;
		}
	);
}
</script>
