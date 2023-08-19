<template>
	<Modal>
		<div class="mt-10">
			<h2 class="text-3xl text-center">Register to generate Api key</h2>
		</div>
		<form
			action=""
			class="max-w-2xl min-w-2xl mx-auto space-y-5 mb-20 mt-10 p-10 shadow rounded-xl">
			<div>
				<h3 class="text-2xl">Enter your credentials.</h3>
			</div>
			<div class="">
				<BaseInput label="Email" type="email" />
			</div>
			<div class="">
				<BaseInput label="Name" type="text" />
			</div>
			<div class="">
				<BaseInput label="Usage" type="text" />
			</div>

			<button class="rounded-lg bg-white text-gray-900 px-8 py-2">
				Send
			</button>
		</form>
	</Modal>
</template>

<script setup></script>

<style lang="scss" scoped></style>
