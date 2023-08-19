import { defineStore } from 'pinia';

export const useCharacterStore = defineStore('character', {
	state: () => ({
		item: 'test'
	}),
	actions: {
		async create(payload) {
			console.log(payload);
			this.item = payload;
		}
	}
});
