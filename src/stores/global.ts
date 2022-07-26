import {defineStore} from 'pinia';

export type Currency = {
   title: String,
   code: String,
   symbol: String | null
}

export default defineStore('global', {
  state: () => {
    return {
      inputCurrency: null as Currency|null,
      inputAmount: null as Number|null,
      outputCurrency: null as Currency|null,
      outputAmount: null as Number|null,
      error: null as String|null,
    };
  },
  actions: {
    getResult() {

    },
  },
});
