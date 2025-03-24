import { defineStore } from "pinia";
import type { FreightQuote } from "cep-types";

export const useFreightStore = defineStore("freight", {
  state: () => ({
    freightQuotes: [] as FreightQuote[],
    errorMessage: "",
  }),
  actions: {
    addFreightQuotes(quotes: FreightQuote[]) {
      const validQuotes = quotes.filter((quote) => !quote.Error);

      if (validQuotes.length === 0) {
        this.errorMessage =
          "Lamentamos, mas não foi possível encontrar nenhuma transportadora disponível para o seu envio.";
        this.freightQuotes = [];
      } else {
        this.errorMessage = "";
        this.freightQuotes = validQuotes;
      }
    },
  },
  getters: {
    newFreightQuotes: (state) => {
      return state.freightQuotes;
    },
  },
});
