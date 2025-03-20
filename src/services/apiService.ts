import { http } from "../services/index.ts";

export default {
  listProvidingQuotes: async (data: object) => {
    return await http.post('shipping/quote', data);
  },
  searchCep: async (params: string) => {
    return await http.get(`/CEP/Address/${params}`);
  },
};
