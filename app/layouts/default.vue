<template>
	<FormsRegister />
	<div class="bg-dark font-sans">
		<LayoutHeader />
		<main class="wrapper md:px-10 px-4 scroll-smooth">
			<slot />
		</main>
		<LayoutFooter />
	</div>
</template>
