<template>
  <div class="freight-form">
    <form class="form">
      <MaskedInput
        title="CEP de origem"
        idLabel="cepOrigem"
        v-model="data.cep_origem"
        mask="99999-999"
        @change="() => debouncedRequest('origem')"
        :message="cepOrigem"
      />

      <MaskedInput
        title="CEP de destino"
        idLabel="cepDestino"
        v-model="data.cep_destino"
        mask="99999-999"
        @change="() => debouncedRequest('destino')"
        :message="cepDestino"
      />

      <NumericInput
        title="Largura"
        idLabel="largura"
        v-model="data.largura"
        suffix=" cm"
        keyfilterType="int"
      />

      <NumericInput
        title="Altura"
        idLabel="altura"
        v-model="data.altura"
        suffix=" cm"
        keyfilterType="int"
      />
      <NumericInput
        title="Comprimento"
        idLabel="comprimento"
        v-model="data.comprimento"
        suffix=" cm"
        keyfilterType="int"
      />
      <NumericInput
        title="Peso"
        idLabel="peso"
        v-model="data.peso"
        suffix=" kg"
        keyfilterType="money"
      />
      <NumericInput
        title="Quantidade"
        idLabel="qtd"
        v-model="data.quantidade"
        suffix=" un"
        keyfilterType="int"
      />
      <NumericInput
        title="Valor"
        idLabel="valor"
        v-model.Number="data.valor"
        suffix=" R$"
        keyfilterType="money"
      />
      <pre>{{ data }}</pre>
    </form>
    <Button label="Buscar" severity="info" @click="submit" class="btn-search" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { debounce } from "lodash";
import NumericInput from "@/components/NumericInput.vue";
import MaskedInput from "@/components/MaskedInput.vue";
import http from "../services/apiService.ts";
import type { CepInfo, CepState } from "cep-types";

const cepOrigem = ref("");
const erroOrigem = ref(false);
const cepDestino = ref("");
const erroDestino = ref(false);
const data = ref({
  cep_origem: "",
  cep_destino: "",
  largura: null,
  altura: null,
  comprimento: null,
  peso: null,
  quantidade: null,
  valor: null,
});

const submit = async () => {
  const data = {
    SellerCEP: "04757020",
    RecipientCEP: "14270000",
    ShipmentInvoiceValue: 320.685,
    ShippingItemArray: [
      {
        Height: 5,
        Length: 15,
        Quantity: 1,
        Weight: 0.5,
        Width: 29,
      },
    ],
    RecipientCountry: "BR",
  };
  try {
    const response = await http.listProvidingQuotes(data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
const handleCepResponse = (json: CepInfo, cepType: string, states: { [key: string]: CepState }) => {
  const isValid = json.localidade && json.uf;
  const field = states[cepType];

  if (isValid) {
    field.cep.value = `${json.localidade}/${json.uf}`;
    field.error.value = false;
  } else {
    field.cep.value = "CEP não encontrado";
    field.error.value = true;
  }
};

const request = async (cepType: string) => {
  try {
    const cep = (cepType === "origem" ? data.value.cep_origem : data.value.cep_destino)
      .toString()
      .replace(/\D/g, "");

    if (cep.length === 8) {
      const res = await http.searchCep(cep);
      handleCepResponse(res.data, cepType, {
        origem: { cep: cepOrigem, error: erroOrigem },
        destino: { cep: cepDestino, error: erroDestino },
      });
    }
  } catch (error) {
    console.error("Erro ao buscar o CEP:", error);
  }
};

const debouncedRequest = debounce(request, 1000);
</script>
<style lang="scss" scoped>
.freight-form {
  display: flex;
  flex-wrap: wrap;
  padding: 1.5rem;
  width: 100%;

  .form {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, auto));
    gap: 1.5rem;
    justify-items: center;
  }
  .btn-search {
    max-height: 2.5rem;
    width: 8rem;
    margin-top: 1rem;
  }
}
</style>
