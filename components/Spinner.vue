<template>
	<div class="spin z-50"></div>
</template>

<style>
.spin {
	display: block;
	width: 42px;
	height: 42px;
	margin: 30px auto;
	border: 4px solid hsl(0, 0%, 7%);
	border-radius: 50%;
	border-top-color: #c0c0c0;
	animation: spin 1.1s ease infinite;
}
@keyframes spin {
	to {
		-webkit-transform: rotateZ(360deg);
	}
}
</style>
