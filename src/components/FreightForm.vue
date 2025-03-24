<template>
  <div class="freight-form">
    <form class="form">
      <MaskedInput
        title="CEP de origem"
        idLabel="cepOrigem"
        v-model="shippingData.originCep"
        mask="99999-999"
        @change="() => debouncedRequest('origem')"
        :message="originCep"
      />

      <MaskedInput
        title="CEP de destino"
        idLabel="cepDestino"
        v-model="shippingData.destinationCep"
        mask="99999-999"
        @change="() => debouncedRequest('destino')"
        :message="destinationCep"
      />

      <NumericInput
        title="Largura"
        idLabel="largura"
        v-model="shippingData.width"
        suffix=" cm"
        keyfilterType="int"
      />

      <NumericInput
        title="Altura"
        idLabel="altura"
        v-model="shippingData.height"
        suffix=" cm"
        keyfilterType="int"
      />
      <NumericInput
        title="Comprimento"
        idLabel="comprimento"
        v-model="shippingData.length"
        suffix=" cm"
        keyfilterType="int"
      />
      <NumericInput
        title="Peso"
        idLabel="peso"
        v-model="shippingData.weight"
        suffix=" kg"
        keyfilterType="money"
      />
      <NumericInput
        title="Quantidade"
        idLabel="qtd"
        v-model="shippingData.quantity"
        suffix=" un"
        keyfilterType="int"
      />
      <NumericInput
        title="Valor"
        idLabel="valor"
        v-model.Number="shippingData.value"
        suffix=" R$"
        keyfilterType="money"
      />
      <Button
        label="Buscar"
        severity="info"
        @click="submitRequest"
        class="btn-search"
        :disabled="isButtonDisabled"
      />
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { debounce, isEqual } from "lodash";
import NumericInput from "@/components/NumericInput.vue";
import MaskedInput from "@/components/MaskedInput.vue";
import http from "../services/apiService.ts";
import type { Address, CepInfo, CepState, ShipmentRequest, ShippingDataInput } from "cep-types";
import { useLoadingStore } from "@/stores/loading.ts";
import { useFreightStore } from "@/stores/FreightQuote.ts";

const freightStore = useFreightStore();
const loadingStore = useLoadingStore();
const originCep = ref("");
const destinationCep = ref("");
const isOriginCepInvalid = ref(false);
const isDestinationCepInvalid = ref(false);

const shippingData = ref<ShippingDataInput>({
  originCep: "",
  destinationCep: "",
  width: null,
  height: null,
  length: null,
  weight: null,
  quantity: null,
  value: null,
});
const previousShippingData = ref({ ...shippingData.value });

const mapShippingData = (data: ShippingDataInput) => {
  const { height, length, quantity, weight, width } = data;

  return {
    Height: height || 0,
    Length: length || 0,
    Quantity: quantity || 0,
    Weight: weight || 0,
    Width: width || 0,
  };
};
const prepareRequest = (data: ShippingDataInput): ShipmentRequest => {
  return {
    SellerCep: extractNumbers(data.originCep),
    RecipientCep: extractNumbers(data.destinationCep),
    ShipmentInvoiceValue: data.value || 0,
    ShippingItemArray: [mapShippingData(data)],
    RecipientCountry: "BR",
  };
};
const submitRequest = async () => {
  loadingStore.startLoading();
  const requestData = prepareRequest(shippingData.value);
  try {
    const response = await http.listProvidingQuotes(requestData);
    console.log(response.data);
    freightStore.addFreightQuotes(response.data.ShippingSevicesArray);
  } catch (error) {
    console.error(error);
  } finally {
    loadingStore.stopLoading();
  }
};

const isButtonActive = ref(false);

const isButtonDisabled = computed(() => {
  const isFilled = Object.values(shippingData.value).every((value) => {
    if (typeof value === "number") {
      return value !== 0;
    }
    return value !== null && value !== "" && value !== undefined;
  });
  const isDataUnchanged = isEqual(shippingData.value, previousShippingData.value);

  isButtonActive.value = isFilled && !isDataUnchanged;

  return !isButtonActive.value;
});

watch(isButtonActive, (newValue) => {
  console.log("Button is now " + (newValue ? "enabled" : "disabled"));
});

const processCepResponse = (
  json: CepInfo,
  cepType: string,
  states: { [key: string]: CepState }
) => {
  const isValid = json.City && json.UF;
  const field = states[cepType];

  if (isValid) {
    field.cep.value = `${json.City}/${json.UF}`;
    field.error.value = false;
  } else {
    field.cep.value = "CEP não encontrado";
    field.error.value = true;
  }
};

function extractNumbers(str: string) {
  return str.toString().replace(/\D/g, "");
}

const validateCep = async (cepType: string) => {
  try {
    const cep =
      cepType === "origem"
        ? extractNumbers(shippingData.value.originCep)
        : extractNumbers(shippingData.value.destinationCep);

    if (cep.length === 8) {
      const res = await http.searchCep(cep);
      const data: Address = res.data;

      processCepResponse(data, cepType, {
        origem: { cep: originCep, error: isOriginCepInvalid },
        destino: { cep: destinationCep, error: isDestinationCepInvalid },
      });
    }
  } catch (error) {
    console.error("Erro ao buscar o CEP:", error);
  }
};

const debouncedRequest = debounce(validateCep, 1000);
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
    grid-template-columns: repeat(auto-fit, minmax(180px, auto));
    gap: 1.5rem;
    justify-items: center;

    .btn-search {
      max-height: 2.5rem;
      width: 100%;
    }
  }
}
</style>
