import { http } from "../services/index.ts";
import axios from 'axios'

export default {
  listProvidingQuotes: async (data: object) => {
    return await http.post('shipping/quote', data);
  },
  searchCep: async (params: string) => {
    return await axios.get(`https://viacep.com.br/ws/${params}/json/`);
  },
};
