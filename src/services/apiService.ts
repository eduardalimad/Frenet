import type { Address, FreightQuotesResponse } from "cep-types";
import { http } from "../services/index.ts";

export default {
  listProvidingQuotes: async (data: object) => {
    return await http.post<FreightQuotesResponse>('shipping/quote', data);
  },
  searchCep: async (params: string) => {
    return await http.get<Address>(`/CEP/Address/${params}`);
  },
};
