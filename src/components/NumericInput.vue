<template>
  <div>
    <div class="input-wrapper">
      <FloatLabel variant="on">
        <InputText
          v-if="keyfilterType === 'money'"
          v-keyfilter.money
          v-model="localValue"
          :id="idLabel"
          :invalid="isTouched && !localValue"
          style="width: 100%"
          class="font-bold block mb-2"
          @blur="handleBlur"
        />

        <InputText
          v-else
          v-keyfilter.int
          v-model="localValue"
          :id="idLabel"
          :invalid="isTouched && !localValue"
          style="width: 100%"
          class="font-bold block mb-2"
          @blur="handleBlur"
        />
        <label :for="idLabel">{{ title }}</label>
      </FloatLabel>
      <span class="suffix">{{ suffix }}</span>
    </div>
    <Message v-if="shouldShowMessage" severity="error" size="small" variant="simple">
      Campo Obrigatório
    </Message>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null;
    title: string;
    suffix?: string;
    keyfilterType?: string;
    idLabel?: string;
  }>(),
  {
    modelValue: null,
    suffix: "",
  }
);
const isTouched = ref(false);
const localValue = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

watch(localValue, (newValue) => {
  emit("update:modelValue", newValue);
});

const handleBlur = () => {
  isTouched.value = true;
};

const shouldShowMessage = computed(() => {
  return isTouched.value && !localValue.value;
});
</script>
