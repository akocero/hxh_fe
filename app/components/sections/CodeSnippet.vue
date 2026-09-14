<template>
	<section class="md:my-40 my-20">
		<div class="flex flex-col md:flex-row justify-between items-start gap-12">
			<div class="md:max-w-sm flex flex-col justify-center">
				<h2 class="text-2xl md:text-4xl font-sans mb-4 font-extrabold uppercase drop-shadow">
					Simple to <span class="text-primary">Integrate</span>
				</h2>
				<p class="text-gray-400">
					One request is all it takes. Pass your API key in the header and get back a structured JSON
					response — no SDKs required.
				</p>
				<a
					href="https://github.com/akocero/hxh_api_docs"
					target="_blank"
					class="mt-10 inline-block rounded-lg font-semibold bg-gray-800 text-gray-50 px-8 py-3 hover:bg-gray-700 w-fit">
					Full Documentation
				</a>
			</div>

			<div class="flex-1 w-full min-w-0 space-y-3">
				<div class="bg-dark_light border border-gray-800 rounded-2xl overflow-hidden">
					<div class="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
						<span class="w-3 h-3 rounded-full bg-red-500"></span>
						<span class="w-3 h-3 rounded-full bg-yellow-400"></span>
						<span class="w-3 h-3 rounded-full bg-green-400"></span>
						<span class="ml-3 text-xs text-gray-500 font-mono">request.js</span>
					</div>
					<pre class="p-5 text-sm leading-relaxed overflow-x-auto"><code><span class="token-keyword">const</span> <span class="token-variable">response</span> <span class="token-operator">=</span> <span class="token-keyword">await</span> <span class="token-fn">fetch</span><span class="token-punct">(</span>
  <span class="token-string">'https://hxh-api.onrender.com/api/v1/characters?limit=5'</span><span class="token-punct">,</span>
  <span class="token-punct">{</span>
    <span class="token-key">headers</span><span class="token-punct">:</span> <span class="token-punct">{</span>
      <span class="token-string">'x-api-key'</span><span class="token-punct">:</span> <span class="token-string">'your_api_key_here'</span>
    <span class="token-punct">}</span>
  <span class="token-punct">}</span>
<span class="token-punct">)</span><span class="token-punct">;</span>

<span class="token-keyword">const</span> <span class="token-variable">data</span> <span class="token-operator">=</span> <span class="token-keyword">await</span> <span class="token-variable">response</span><span class="token-punct">.</span><span class="token-fn">json</span><span class="token-punct">()</span><span class="token-punct">;</span></code></pre>
				</div>

				<div class="bg-dark_light border border-gray-800 rounded-2xl overflow-hidden">
					<div class="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
						<span class="ml-auto text-xs font-mono px-2 py-0.5 rounded bg-green-900/40 text-green-400">
							200 OK
						</span>
						<span class="text-xs text-gray-500 font-mono">response.json</span>
					</div>
					<pre class="p-5 text-sm leading-relaxed overflow-x-auto max-h-72"><code><span class="key">"status"</span><span class="token-punct">:</span> <span class="string">"success"</span><span class="token-punct">,</span>
<span class="key">"data"</span><span class="token-punct">:</span> <span class="token-punct">[</span>
  <span class="token-punct">{</span>
    <span class="key">"name"</span><span class="token-punct">:</span> <span class="string">"gon freecss"</span><span class="token-punct">,</span>
    <span class="key">"gender"</span><span class="token-punct">:</span> <span class="string">"male"</span><span class="token-punct">,</span>
    <span class="key">"nen_type"</span><span class="token-punct">:</span> <span class="token-punct">[</span><span class="string">"enhancement"</span><span class="token-punct">]</span><span class="token-punct">,</span>
    <span class="key">"state"</span><span class="token-punct">:</span> <span class="string">"alive"</span><span class="token-punct">,</span>
    <span class="key">"professions"</span><span class="token-punct">:</span> <span class="token-punct">[</span><span class="string">"hunter"</span><span class="token-punct">]</span><span class="token-punct">,</span>
    <span class="key">"abilities"</span><span class="token-punct">:</span> <span class="token-punct">[</span><span class="string">"Jajanken"</span><span class="token-punct">,</span> <span class="string">"Ko"</span><span class="token-punct">,</span> <span class="string">"Ken"</span><span class="token-punct">]</span>
  <span class="token-punct">}</span><span class="token-punct">,</span>
  <span class="token-punct">{</span> <span class="key">"name"</span><span class="token-punct">:</span> <span class="string">"killua zoldyck"</span><span class="token-punct">,</span> <span class="token-operator">...</span> <span class="token-punct">}</span>
<span class="token-punct">]</span><span class="token-punct">,</span>
<span class="key">"_paginate"</span><span class="token-punct">:</span> <span class="token-punct">{</span>
  <span class="key">"page"</span><span class="token-punct">:</span> <span class="number">1</span><span class="token-punct">,</span>
  <span class="key">"limit"</span><span class="token-punct">:</span> <span class="number">5</span><span class="token-punct">,</span>
  <span class="key">"total"</span><span class="token-punct">:</span> <span class="number">248</span><span class="token-punct">,</span>
  <span class="key">"pages"</span><span class="token-punct">:</span> <span class="number">50</span>
<span class="token-punct">}</span></code></pre>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.token-keyword { color: #c792ea; }
.token-string  { color: #c5a73d; }
.token-fn      { color: #82aaff; }
.token-variable{ color: #eeffff; }
.token-operator{ color: #89ddff; }
.token-key     { color: #01db6e; }
.token-punct   { color: #89ddff; }
</style>
