<template>
	<FormsRegister />
	<div class="bg-dark font-sans">
		<LayoutsHeader />
		<main class="wrapper md:px-10 px-4">
			<slot />
		</main>
		<LayoutsFooter />
	</div>
</template>

<script setup></script>

<style scoped></style>
