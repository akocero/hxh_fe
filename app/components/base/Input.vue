<template>
	<div class="relative">
		<input
			:type="type"
			class="peer m-0 block h-[58px] w-full bg-dark border border-gray-700 px-3 py-4 text-base font-normal leading-tight text-white transition-all duration-200 ease-linear placeholder:text-transparent focus:border-primary/70 focus:outline-none focus:pb-[0.625rem] focus:pt-[1.625rem] [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
			:id="inputId"
			placeholder="name@example.com"
			:value="modelValue"
			@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
			v-bind="$attrs"
			style="box-shadow: none;" />
		<label
			:for="inputId"
			class="pointer-events-none absolute left-0 top-0 origin-[0_0] px-3 py-4 text-gray-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.75] peer-focus:text-primary/80 peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.75] peer-[:not(:placeholder-shown)]:text-gray-600 peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest motion-reduce:transition-none">
			{{ label }}
		</label>
		<!-- Bottom focus line -->
		<div class="absolute bottom-0 left-0 right-0 h-px bg-primary/70 scale-x-0 peer-focus:scale-x-100 transition-transform duration-200 origin-left"></div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	modelValue?: string | number;
	label?: string;
	type?: string;
}>();

defineEmits(['update:modelValue']);

const inputId = useId();
</script>
