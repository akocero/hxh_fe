<script setup lang="ts">
</script>

<template>
	<section
		class="breakout relative overflow-hidden"
		style="min-height: 100svh; background: linear-gradient(160deg, hsl(0,0%,6%) 0%, hsl(0,0%,9%) 60%, hsl(0,0%,7%) 100%);">

		<!-- ── Nen energy background orbs ─────────────────── -->
		<div class="absolute inset-0 pointer-events-none select-none">
			<div class="absolute top-1/2 -translate-y-1/2 left-1/4 w-[700px] h-[700px] rounded-full opacity-20 blur-[140px] animate-nen-pulse"
				style="background: radial-gradient(circle, hsl(360,74%,51%) 0%, transparent 65%);"></div>
			<div class="absolute -top-32 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px] animate-nen-pulse"
				style="background: radial-gradient(circle, #f59e0b 0%, transparent 65%); animation-delay: 1.8s;"></div>
			<div class="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[80px] animate-drift"
				style="background: radial-gradient(circle, hsl(360,74%,51%) 0%, transparent 65%);"></div>
		</div>

		<!-- ── Subtle grid overlay ─────────────────────────── -->
		<div class="absolute inset-0 pointer-events-none opacity-[0.025]"
			style="background-image: linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px); background-size: 72px 72px;"></div>

		<!-- ── Top accent line ────────────────────────────── -->
		<div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>

		<!-- ── Main content — centered ────────────────────── -->
		<div class="wrapper md:px-10 px-4 relative z-10 flex flex-col items-center justify-center text-center min-h-[100svh] py-32">

			<!-- Eyebrow badge -->
			<div class="inline-flex items-center gap-2 px-4 py-1.5 mb-10 text-xs font-bold uppercase tracking-[0.2em]"
				style="border: 1px solid rgba(255,122,0,0.4); background: rgba(255,122,0,0.08); color: #FF7A00;">
				<span class="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style="background: #FF7A00;"></span>
				Free REST API · Open Source
			</div>

			<!-- Main title — one line, HxH logo colors -->
			<h1 class="font-bebas leading-none tracking-wide whitespace-nowrap"
				style="font-size: clamp(2.8rem, 9vw, 9rem); background: linear-gradient(180deg, #FF7A00 0%, #CC1100 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; filter: drop-shadow(0 0 30px rgba(255,100,0,0.45));">
				HUNTER × HUNTER
			</h1>

			<!-- DATABASE API label — prominent -->
			<div class="flex items-center justify-center gap-4 mt-5 mb-6 w-full max-w-2xl mx-auto">
				<div class="flex-1 h-px" style="background: linear-gradient(to right, transparent, #FF7A00aa);"></div>
				<span class="font-bebas text-2xl md:text-4xl tracking-[0.35em] uppercase"
					style="color: #FF7A00; text-shadow: 0 0 24px rgba(255,120,0,0.5);">
					DATABASE API
				</span>
				<div class="flex-1 h-px" style="background: linear-gradient(to left, transparent, #FF7A00aa);"></div>
			</div>

			<!-- Description -->
			<p class="text-gray-400 leading-relaxed max-w-md mx-auto mb-12 text-base">
				Your all-access Hunter license to the HxH universe. Access character profiles, group affiliations, and deep lore — structured JSON, instantly.
			</p>

			<!-- CTA buttons -->
			<div class="flex flex-wrap items-center justify-center gap-4">
				<a href="https://github.com/akocero/hxh_api_docs" target="_blank"
					class="inline-flex items-center gap-2 px-8 py-4 bg-white text-dark font-bold uppercase tracking-[0.12em] text-sm hover:bg-primary hover:text-white transition-all duration-300 group">
					<span>Documentation</span>
					<span class="transition-transform group-hover:translate-x-1">→</span>
				</a>
				<NuxtLink to="/playground"
					class="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary font-bold uppercase tracking-[0.12em] text-sm hover:bg-primary hover:text-white transition-all duration-300 group"
					style="box-shadow: 0 0 24px rgba(200,30,30,0.2);">
					<span>Try Playground</span>
					<span class="transition-transform group-hover:translate-x-1">→</span>
				</NuxtLink>
			</div>
		</div>

		<!-- ── Diagonal bottom cut ─────────────────────────── -->
		<div class="absolute bottom-0 left-0 right-0 pointer-events-none leading-none">
			<svg viewBox="0 0 1440 70" preserveAspectRatio="none" class="w-full block" style="height: 70px; fill: hsl(0,0%,7%);">
				<polygon points="0,70 1440,0 1440,70"/>
			</svg>
		</div>
	</section>
</template>
