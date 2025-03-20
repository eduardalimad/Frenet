<template>
  <div class="container-input">
    <div class="input-wrapper">
      <FloatLabel variant="on">
        <InputMask
          v-model="localValue"
          :mask="mask"
          :id="idLabel"
          :invalid="isTouched && !localValue"
          @blur="handleBlur"
          :class="{ 'p-invalid': localValue === null }"
        />
        <label :for="idLabel">{{ title }}</label>
      </FloatLabel>
      <span class="suffix">{{ suffix }}</span>
    </div>
    <Message
      v-if="shouldShowMessage"
      :severity="message ? 'info' : 'error'"
      size="small"
      variant="simple"
    >
      {{ message || "Campo Obrigatório" }}
    </Message>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string | null;
    title: string;
    mask?: string;
    suffix?: string;
    idLabel?: string;
    message?: string;
  }>(),
  {
    modelValue: null,
    mask: "",
    suffix: "",
  }
);

const isTouched = ref(false);
const localValue = ref<string>(props.modelValue ?? "");
const emit = defineEmits(["update:modelValue"]);

watch(localValue, (newValue) => {
  emit("update:modelValue", newValue);
});

const handleBlur = () => {
  isTouched.value = true;
};

const shouldShowMessage = computed(() => {
  return (isTouched.value && !localValue.value) || props.message;
});
</script>

