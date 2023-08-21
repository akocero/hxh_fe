<template>
	<section class="pt-20 md:pt-20 text-sm md:text-base" id="playground">
		<div>
			<h2
				class="text-3xl mb-6 font-sans font-extrabold drop-shadow text-center">
				PLAYGROUND
			</h2>
		</div>
		<div
			class="md:flex items-start justify-center w-full"
			@submit.prevent="handleExecute">
			<form
				action=""
				class="space-y-6 bg-dark_light p-5 md:p-8 md:w-[38%] rounded-lg shadow-xl">
				<BaseAlert v-if="alert_option" :option="alert_option" />
				<div>
					<h3 class="">
						Kindly ensure all fields are properly filled.
					</h3>
				</div>
				<div>
					<BaseInput label="Api key" type="text" v-model="api_key" />
				</div>

				<div>
					<BaseInput
						label="Ex. /groups or /groups/:id"
						type="text"
						v-model="endpoint" />
					<span class="mt-2 block text-sm">GET method only</span>
				</div>

				<div class="flex justify-end gap-2">
					<button
						class="rounded-lg font-semibold text-gray-50 px-4 py-2 h-10 hover:bg-green-500 bg-green-600"
						v-if="!store.is_loading">
						Execute
					</button>
					<button
						type="button"
						class="rounded-lg font-semibold text-gray-500 px-4 py-2 h-10 bg-gray-800 disabled:cursor-default"
						disabled
						v-if="store.is_loading">
						Processing...
					</button>
				</div>
			</form>
			<div class="md:w-[2%]" v-if="store.response || store.error"></div>
			<div class="md:w-[60%]" v-if="store.is_loading">
				<Spinner />
			</div>
			<div
				class="md:w-[60%] mt-10 md:mt-0 text-sm md:text-base shadow-xl"
				v-if="store.response || store.error">
				<div
					class="overflow-auto max-h-[28rem] w-full bg-dark_light rounded-lg">
					<pre
						class=""
						v-html="
							syntaxHighlight(
								JSON.stringify(
									store.response || store.error,
									undefined,
									4
								)
							)
						"></pre>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { usePlaygroundStore } from '@/stores/playgroundStore';
const store = usePlaygroundStore();
const endpoint = ref('');
const api_key = ref('');
const alert_option = ref(null);
const responseJson = ref({
	status: 'success',
	statusCode: 200,
	statusText: 'OK',
	message: 'Data retrieved successfully.',
	data: [
		{
			_id: '64d88ffbcbad61354d10e60a',
			name: 'phinks magcub',
			also_known_as: ['Fei', 'Phantom Troupe Member #2'],
			gender: 'male',
			nen_type: ['Enhancement'],
			image: [
				{
					_id: '64d8ba75fd527f994bfdc325',
					public_id: 'hxh_api_oop/x9kigulf9mtiogrmxgwg',
					secure_url:
						'https://res.cloudinary.com/erro/image/upload/v1691925111/hxh_api_oop/x9kigulf9mtiogrmxgwg.webp',
					width: 628,
					height: 1257
				}
			],
			images: [],
			abilities: ['Ripper Cyclotron'],
			japanese_name: 'フィンクス゠マグカブ',
			groups: [
				{ _id: '64d88505f5d42e977fffa4fb', name: 'Phantom Troupe' }
			],
			professions: [
				'Thief',
				'Phantom Troupe Member #5',
				'Greed Island Player'
			],
			state: 'alive',
			relatives: [],
			createdAt: '2023-08-13T08:10:35.603Z',
			updatedAt: '2023-08-13T12:00:37.982Z'
		},
		{
			_id: '64d88f45cbad61354d10e604',
			name: 'kalluto zoldyck',
			also_known_as: ['Fei', 'Phantom Troupe Member #2'],
			gender: 'male',
			nen_type: ['Manipulation'],
			image: [
				{
					_id: '64d8bacafd527f994bfdc331',
					public_id: 'hxh_api_oop/iojmipzvrjf4iuh7zfff',
					secure_url:
						'https://res.cloudinary.com/erro/image/upload/v1691925196/hxh_api_oop/iojmipzvrjf4iuh7zfff.webp',
					width: 381,
					height: 612
				}
			],
			images: [],
			abilities: [
				'Surveillance Paper Dolls',
				'Paper Fan Blade',
				"Dance of the Serpent's Bite"
			],
			japanese_name: 'カルト゠ゾルディック',
			groups: [
				{ _id: '64d88505f5d42e977fffa4fb', name: 'Phantom Troupe' }
			],
			professions: [
				'Assassin',
				'Phantom Troupe Member #4',
				'Greed Island Player'
			],
			state: 'alive',
			relatives: [],
			createdAt: '2023-08-13T08:07:33.661Z',
			updatedAt: '2023-08-13T12:02:28.794Z'
		},
		{
			_id: '64d88e7ecbad61354d10e601',
			name: 'feitan portor',
			also_known_as: ['Fei', 'Phantom Troupe Member #2'],
			gender: 'male',
			nen_type: ['Transmutation'],
			image: [
				{
					_id: '64d8ba89fd527f994bfdc328',
					public_id: 'hxh_api_oop/ba9px8nczxzevoweai3j',
					secure_url:
						'https://res.cloudinary.com/erro/image/upload/v1691925131/hxh_api_oop/ba9px8nczxzevoweai3j.webp',
					width: 954,
					height: 1036
				}
			],
			images: [],
			abilities: ['Pain Packer', 'Rising Sun'],
			japanese_name: 'フェイタン゠ポートオ',
			groups: [
				{ _id: '64d88505f5d42e977fffa4fb', name: 'Phantom Troupe' }
			],
			professions: [
				'thief',
				'Phantom Troupe Member #2',
				'Interim Leader of the Phantom Troupe',
				'Greed Island Player'
			],
			state: 'alive',
			relatives: [],
			createdAt: '2023-08-13T08:04:14.460Z',
			updatedAt: '2023-08-13T12:01:08.809Z'
		},
		{
			_id: '64d88d8ecbad61354d10e5f8',
			name: 'machi komacine',
			also_known_as: [],
			gender: 'female',
			nen_type: ['Transmutation'],
			image: [
				{
					_id: '64d8babefd527f994bfdc32e',
					public_id: 'hxh_api_oop/bo6a8kxkptpdddnctzuc',
					secure_url:
						'https://res.cloudinary.com/erro/image/upload/v1691925185/hxh_api_oop/bo6a8kxkptpdddnctzuc.webp',
					width: 621,
					height: 1113
				}
			],
			images: [],
			abilities: ['Nen Stitches', 'Nen Threads'],
			japanese_name: 'マチ゠コマチネ',
			groups: [
				{ _id: '64d88505f5d42e977fffa4fb', name: 'Phantom Troupe' }
			],
			professions: ['thief', 'Phantom Troupe Member #3'],
			state: 'alive',
			relatives: [],
			createdAt: '2023-08-13T08:00:14.406Z',
			updatedAt: '2023-08-13T12:02:05.722Z'
		},
		{
			_id: '64d88929bde05ab19d749e2f',
			name: 'nobunaga hazama',
			also_known_as: ['Phantom Troupe Member #1'],
			gender: 'male',
			nen_type: ['Enhancement'],
			image: [
				{
					_id: '64d8baa3fd527f994bfdc32b',
					public_id: 'hxh_api_oop/odezte477eodb9vpsczf',
					secure_url:
						'https://res.cloudinary.com/erro/image/upload/v1691925157/hxh_api_oop/odezte477eodb9vpsczf.webp',
					width: 318,
					height: 742
				}
			],
			images: [],
			abilities: ['Unknown'],
			japanese_name: 'ノブナガ゠ハザマ',
			groups: [
				{ _id: '64d88505f5d42e977fffa4fb', name: 'Phantom Troupe' }
			],
			professions: ['thieves', 'Phantom Troupe Member #1'],
			state: 'alive',
			relatives: [],
			createdAt: '2023-08-13T07:41:29.574Z',
			updatedAt: '2023-08-13T12:01:32.029Z'
		},
		{
			_id: '64d6ffcd51403af1e30e7663',
			name: 'chrollo lucilfer',
			also_known_as: ['Boss', 'Phantom Troupe Member #0'],
			gender: 'male',
			nen_type: ['Specialization'],
			image: [
				{
					_id: '64d8c87675a589f713325f11',
					public_id: 'hxh_api_oop/z7kv0agqkzug2endva7p',
					secure_url:
						'https://res.cloudinary.com/erro/image/upload/v1691928696/hxh_api_oop/z7kv0agqkzug2endva7p.webp',
					width: 505,
					height: 1183
				}
			],
			images: [],
			abilities: [
				'Indoor Fish (Stolen)',
				'Fun Fun Cloth (Stolen)',
				'Teleportation (Stolen)',
				'Black Voice (Stolen)',
				'The Sun and Moon (Stolen)',
				'Order Stamp (Stolen)',
				'Gallery Fake (Stolen)',
				'Convert Hands (Stolen)',
				'Lovely Ghostwriter (Stolen; Former)',
				'Double Face'
			],
			japanese_name: 'クロロ゠ルシルフル',
			affiliations: [],
			professions: [
				'thieve',
				'Leader of the Phantom',
				'Phantom Troupe Member #0',
				'Floor Master',
				'Red Cleaner (acting role)'
			],
			state: 'alive',
			relatives: [],
			createdAt: '2023-08-12T03:43:09.890Z',
			updatedAt: '2023-08-13T12:12:16.164Z',
			groups: [
				{ _id: '64d88505f5d42e977fffa4fb', name: 'Phantom Troupe' }
			]
		}
	]
});

const handleExecute = async () => {
	alert_option.value = null;

	if (!api_key.value) {
		alert_option.value = {
			title: 'Failed!',
			body: `Api key can't be blank, Please generate Api key first.`,
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

function syntaxHighlight(json) {
	if (!json) return ''; //no JSON from response

	json = json
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
	return json.replace(
		/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
		function (match) {
			var cls = 'number';
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					cls = 'key';
				} else {
					cls = 'string';
				}
			} else if (/true|false/.test(match)) {
				cls = 'boolean';
			} else if (/null/.test(match)) {
				cls = 'null';
			}
			return '<span class="' + cls + '">' + match + '</span>';
		}
	);
}
</script>

<style lang="scss" scoped></style>
