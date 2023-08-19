<template>
	<FormsRegister />
	<div class="bg-dark font-sans">
		<LayoutsHeader />
		<main class="wrapper px-10">
			<slot />
		</main>
		<LayoutsFooter />
	</div>
</template>

<script setup></script>

<style scoped></style>
