<template>
  <div class="input-wrapper">
    <FloatLabel variant="on">
      <InputMask
        v-model="localValue"
        :mask="mask"
        :inputId="title"
        :invalid="localValue === null"
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
    mask?: string;
    suffix?: string;
  }>(),
  {
    modelValue: "",
    mask: "",
    suffix: "",
  }
);
const emit = defineEmits(["update:modelValue"]);
const localValue = ref(props.modelValue);
watch(localValue, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
