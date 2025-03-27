<template>
  <div class="containerPage">
    <header class="header" v-once>
      <nav class="navbar">
        <img src="../assets/images/logo-frenet.png" alt="" />
        <div>
          <router-link to="/">Simule seu Frete</router-link>
          <!-- <router-link to="/about">Parceiros</router-link> -->
        </div>
      </nav>
      <h1 class="title-header">Simular Frete</h1>
    </header>
    <main class="freight-main">
      <section class="freight-card">
        <h2 class="card-subtitle">Calculadora de Fretes Simplificada</h2>
        <p class="card-description">Faça sua cotação nas principais transportadoras do país</p>

        <div class="freight-content">
          <FreightForm
            class="form-freight"
            :quoteForm="shippingData"
            :originCep="originCep"
            :destinationCep="destinationCep"
            :isButtonDisabled="isButtonDisabled"
            @validate-cep="validateCep"
            @submit-request="debouncedRequest"
          />
          <div class="image-box">
            <boxImage v-once />
          </div>
        </div>
      </section>
      <div
        class="freight-table"
        ref="freightTableRef"
        v-if="freightQuotes.length > 0 || errorMessage"
      >
        <FreightQuoteTable
          :titles="tableHeaders"
          :data="freightQuotes"
          :formatToBRL="formatToBRL"
          :error="errorMessage"
        />
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, ref, watch, watchEffect } from "vue";
import { debounce } from "lodash";
import { useToast } from "vue-toastification";
import http from "@/services/apiService";
import { useLoadingStore } from "@/stores/loading.ts";
import FreightForm from "@/components/FreightForm.vue";
import FreightQuoteTable from "@/components/FreightQuoteTable.vue";
import boxImage from "@/assets/images/box.vue";
import type { Address, CepState, ShipmentRequest, ShippingDataInput, TableHeader } from "cep-types";

const loadingStore = useLoadingStore();

const freightTableRef = ref<HTMLElement | null>(null);
const originCep = ref("");
const destinationCep = ref("");
const isOriginCepInvalid = ref(false);
const isDestinationCepInvalid = ref(false);
const shippingData = ref({
  originCep: "",
  destinationCep: "",
  width: null,
  height: null,
  length: null,
  weight: null,
  quantity: null,
  value: null,
});
const tableHeaders = ref<TableHeader[]>([
  { title: "Modalidade" },
  { title: "Prazo" },
  { title: "Preço" },
  { title: "" },
]);
const freightQuotes = ref();
const errorMessage = ref("");

// Lógica do formulário
const isButtonDisabled = computed(() => {
  const isFilled = Object.values(shippingData.value).every((value) => {
    if (typeof value === "number") {
      return value !== 0;
    }
    return value !== null && value !== "" && value !== undefined;
  });
  return !isFilled;
});
const toast = useToast();

const validateCep = async (cep: string, cepType: string) => {
  cep = extractNumbers(cep);

  try {
    if (cep.length === 8) {
      const { data } = await http.searchCep(cep);
      processCepResponse(data, cepType, {
        origem: { cep: originCep, error: isOriginCepInvalid },
        destino: { cep: destinationCep, error: isDestinationCepInvalid },
      });
    }
  } catch (error) {
    console.error("Erro ao buscar o CEP:", error);
  }
};

const extractNumbers = (str: string) => {
  return str.toString().replace(/\D/g, "");
};

const processCepResponse = (
  adress: Address,
  cepType: string,
  states: { [key: string]: CepState }
) => {
  const isValid = adress.City && adress.UF;
  const field = states[cepType];

  if (isValid) {
    field.cep.value = `${adress.City}/${adress.UF}`;
    field.error.value = false;
  } else {
    field.cep.value = "CEP não encontrado";
    field.error.value = true;
  }
};

const submitRequest = async () => {
  loadingStore.startLoading();
  const requestData = prepareRequest(shippingData.value);

  try {
    const { data } = await http.listProvidingQuotes(requestData);
    const validQuotes = data.ShippingSevicesArray.filter((quote) => !quote.Error);

    if (validQuotes.length === 0) {
      errorMessage.value =
        "Lamentamos, mas não foi possível encontrar nenhuma transportadora disponível para o seu envio.";
      freightQuotes.value = [];
    } else {
      errorMessage.value = "";
      freightQuotes.value = validQuotes;
    }
  } catch (error) {
    console.error(error);
    toast.error("Erro ao realizar a requisição. Tente novamente mais tarde.", { timeout: 5000 });
  } finally {
    loadingStore.stopLoading();
  }
};

const debouncedRequest = debounce(submitRequest, 500);

const prepareRequest = (data: ShippingDataInput): ShipmentRequest => {
  return {
    SellerCep: extractNumbers(data.originCep),
    RecipientCep: extractNumbers(data.destinationCep),
    ShipmentInvoiceValue: data.value || 0,
    ShippingItemArray: [mapShippingData(data)],
    RecipientCountry: "BR",
  };
};

const mapShippingData = ({ height, length, quantity, weight, width }: ShippingDataInput) => {
  return {
    Height: height || 0,
    Length: length || 0,
    Quantity: quantity || 0,
    Weight: weight || 0,
    Width: width || 0,
  };
};

// Lógica da tabela
watchEffect(() => {
  if (freightQuotes.value) {
    nextTick(() => {
      scrollToTable();
    });
  }
});
const scrollToTable = () => {
  if (freightTableRef.value) {
    freightTableRef.value.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

watch(
  () => freightQuotes,
  (newQuotes) => {
    freightQuotes.value = newQuotes;
  },
  { immediate: true }
);

function formatToBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
</script>
<style lang="scss" scoped>
$primary-bg-color: #fff;
$primary-border-color: #e9ecef;
$shadow-color: rgba(183, 198, 206, 0.3);
$transition-speed: 0.3s;

.containerPage {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 16rem 1fr;
  height: 100%;
  overflow-y: auto;
  opacity: 0;
  animation: fadeIn 1s forwards;
  will-change: opacity, transform;

  .header {
    position: relative;
    grid-area: 1 / 1 / 2 / 2;
    height: 100%;
    background: url("../assets/images/background.webp") no-repeat center center;
    background-size: cover;
    animation: slideDown 1s ease-out forwards;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(1px);
      z-index: 1;
    }

    .navbar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 6rem;
      display: flex;
      align-items: center;
      padding: 0.5rem 20px;
      z-index: 10;
      background-color: rgba(17, 17, 17, 0.1);

      img {
        width: 80px;
        height: 56px;
      }

      a {
        color: white;
        text-decoration: none;
        padding: 10px;
        transition: background-color $transition-speed ease, width $transition-speed ease;
      }

      a:hover {
        background-color: rgba(255, 255, 255, 0.1);
        width: 5rem;
        border-bottom: 1px solid orange;
      }
    }

    .title-header {
      position: absolute;
      bottom: 4rem;
      left: 10%;
      color: white;
      font-size: 2.5rem;
      z-index: 2;
    }
  }

  .freight-main {
    grid-area: 2 / 1 / 3 / 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 2rem;
    opacity: 0;
    animation: fadeInMain 1s 1s forwards;
    gap: 1rem;
    width: 100%;

    .freight-card,
    .freight-table {
      z-index: 100;
      background: $primary-bg-color;
      border-radius: 0.5rem;
      border: 1px solid $primary-border-color;
      box-shadow: 0 0.5rem 1.25rem 0 $shadow-color;
      padding: 15px;
      width: 80%;
      max-width: 1140px;
      min-height: 25rem;
      margin-top: 2rem;
    }
    .card-subtitle,
    .card-description {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .freight-content {
      display: grid;
      grid-template-columns: 1fr repeat(auto-fit, minmax(20rem, 1fr));
      grid-column-gap: 0;

      .form-freight {
        grid-area: 1 / 1 / 2 / 2;
      }

      .image-box {
        grid-area: 1 / 2 / 2 / 3;
        width: 75%;
        margin-left: auto;
      }
    }
  }

  .p-floatlabel {
    height: 2.3rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes fadeInMain {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 799px) {
  .containerPage .freight-main .freight-card .freight-content {
    grid-template-columns: 1fr;
  }
  .containerPage .freight-main .freight-table {
    background: transparent;
    border: none;
    box-shadow: none;
    width: 100%;
    flex-wrap: wrap;
  }

  .containerPage .freight-main .title-header {
    bottom: 6rem;
  }

  .containerPage .freight-main .freight-card {
    margin-top: -3.2rem;
    width: 95%;
  }

  .containerPage .freight-main .freight-form {
    width: 100%;
    flex-wrap: wrap;
  }

  .containerPage .freight-main .image-box {
    display: none;
  }

  .containerPage .freight-main .cep-address,
  .containerPage .freight-main .dimensions,
  .containerPage .freight-main .freight-form {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
