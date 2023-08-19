<template>
	<div>
		<header>
			<nav>
				<ul>
					<li><NuxtLink to="/characters">Characters</NuxtLink></li>
				</ul>
			</nav>
		</header>
		<main>
			<slot />
		</main>
	</div>
</template>

<script setup></script>

<style scoped></style>
