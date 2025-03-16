<template>
  <div class="input-wrapper">
    <FloatLabel variant="on">
      <InputText
        v-if="keyfilterType === 'money'"
        v-keyfilter.money
        v-model="localValue"
        :inputId="title"
        :invalid="localValue === null"
        style="width: 100%"
        class="font-bold block mb-2"
      />

      <InputText
        v-else
        v-keyfilter.int
        v-model="localValue"
        :inputId="title"
        :invalid="localValue === null"
        style="width: 100%"
        class="font-bold block mb-2"
      />
      <label :for="title">{{ title }}</label>
    </FloatLabel>
    <span class="suffix">{{ suffix }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    title: string;
    suffix?: string;
    keyfilterType?: string;
  }>(),
  {
    modelValue: "",
    suffix: "",
  }
);
const emit = defineEmits(["update:modelValue"]);
const localValue = ref(props.modelValue);

watch(localValue, (newValue) => {
  const valueWithDot = newValue.replace(",", ".");
  emit("update:modelValue", Number(valueWithDot));
});
</script>
