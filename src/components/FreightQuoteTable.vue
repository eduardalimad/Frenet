<template>
  <div>
    <div v-if="freightStore.errorMessage" class="error-message">
      <img src="../assets/images/alert.webp" loading="lazy" alt="Ilustração" class="error-image" />
      <p>{{ freightStore.errorMessage }}</p>
    </div>
    <table v-else>
      <thead>
        <tr >
          <th v-for="(header, index) in titles" :key="index">
          {{ header.title }}
        </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="quote in data" :key="quote.ServiceCode">
          <td class="carrier-information">
            <img
              class="img-logo"
              :src="`https://caminho/Content/images/${quote.CarrierCode}-small.png`"
              alt="Correios"
            />
            <section class="title">
              <span class="destribuidora">{{ quote.Carrier }} </span>
              <span class="legend">Poste na agência mais próxima</span>
            </section>
          </td>
          <td data-label="Prazo">
            {{ quote.DeliveryTime }} {{ quote.DeliveryTime > 1 ? "dias" : "dia" }}
          </td>
          <td data-label="Preço">{{ formatToBRL(quote.PresentationalPrice) }}</td>
          <td>
            <Button label="Selecionar" severity="info" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useFreightStore } from "@/stores/FreightQuote";
import type { FreightQuote, TableHeader } from "cep-types";
import type { PropType } from "vue";

const freightStore = useFreightStore();

defineProps({
  titles: {
    type: Array as PropType<TableHeader[]>,
    required: true
  },
  formatToBRL: {
    type: Function as PropType<(value: number) => string>,
    required: true
  },
  data: {
    type: Array as PropType<FreightQuote[]>,
    required: true
  }
});

</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  font-family: "Roboto", sans-serif;

  thead,
  th {
    padding: 0.5rem 1.5rem;
    text-align: start;
    font-weight: 700;
    font-size: 0.9rem;
    color: black;
  }

  tbody,
  td {
    padding: 1.5rem;
    text-align: start;
    font-weight: 500;
    border-bottom: 1px solid #f8f9fa;

    .legend {
      font-size: small;
      color: $color-preto-60;
    }
  }
}

.carrier-information {
  display: flex;
  gap: 10px;

  .img-logo {
    object-fit: cover;
  }

  .title {
    display: grid;
  }
}
.error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  background-color: #f8d7da80;
  color: #721c24;
  border-radius: 8px;
  margin: 1rem;
  .error-image {
    width: 20rem;
    max-width: 100%;
    height: auto;
    margin-right: 1rem;
  }
}

@media (max-width: 799px) {
  thead {
    display: none;
  }

  tbody {
    tr {
      border-top: none;
      border-radius: 0.5rem;
      background: #ffff;
      padding: 1.5rem;
      margin-bottom: 1rem;
    }
  }

  tr,
  td {
    display: block;
    font-size: 1rem;
    text-align: right;
  }

  td {
    border-bottom: 0.5px solid #dedede;

    &:before {
      content: attr(data-label);
      float: left;
      font-size: 0.9rem;
    }
  }

  td:nth-child(1) {
    height: 5rem;
    padding: 1rem;
  }

  td:nth-child(2) {
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  td:nth-child(3) {
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  td:nth-child(4) {
    height: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    border-bottom: none;
  }
  .error-message {
    flex-direction: column;
    padding: 1rem 0.5rem;
    p {
      font-size: 1rem;
    }
    .error-image {
      width: 15rem;
    }
  }
}
</style>
