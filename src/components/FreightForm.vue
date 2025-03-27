<template>
  <div class="freight-form">
    <form class="form">
      <MaskedInput
        title="CEP de origem"
        idLabel="cepOrigem"
        v-model="quoteForm.originCep"
        mask="99999-999"
        @focusout="$emit('validate-cep', quoteForm.originCep, 'origem')"
        :message="originCep"
      />

      <MaskedInput
        title="CEP de destino"
        idLabel="cepDestino"
        v-model="quoteForm.destinationCep"
        mask="99999-999"
        @focusout="$emit('validate-cep', quoteForm.destinationCep, 'destino')"
        :message="destinationCep"
      />

      <NumericInput
        title="Largura"
        idLabel="largura"
        v-model="quoteForm.width"
        suffix=" cm"
        keyfilterType="int"
      />
      <NumericInput
        title="Altura"
        idLabel="altura"
        v-model="quoteForm.height"
        suffix=" cm"
        keyfilterType="int"
      />
      <NumericInput
        title="Comprimento"
        idLabel="comprimento"
        v-model="quoteForm.length"
        suffix=" cm"
        keyfilterType="int"
      />
      <NumericInput
        title="Peso"
        idLabel="peso"
        v-model="quoteForm.weight"
        suffix=" kg"
        keyfilterType="money"
      />
      <NumericInput
        title="Quantidade"
        idLabel="qtd"
        v-model="quoteForm.quantity"
        suffix=" un"
        keyfilterType="int"
      />
      <NumericInput
        title="Valor"
        idLabel="valor"
        v-model="quoteForm.value"
        suffix=" R$"
        keyfilterType="money"
      />
      <Button
        label="Buscar"
        severity="info"
        @click.prevent="$emit('submit-request')"
        class="btn-search"
        :disabled="isButtonDisabled"
      />
    </form>
  </div>
</template>
<script setup lang="ts">
import NumericInput from "@/components/NumericInput.vue";
import MaskedInput from "@/components/MaskedInput.vue";

defineProps({
  quoteForm: {
    type: Object,
    default: () => ({
      originCep: "",
      destinationCep: "",
      width: null,
      height: null,
      length: null,
      weight: null,
      quantity: null,
      value: null,
    }),
  },
  originCep: String,
  destinationCep: String,
  isButtonDisabled: Boolean,
});

const emit = defineEmits(["validate-cep", "submit-request"]);
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
