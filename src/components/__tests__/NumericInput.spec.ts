import { describe, it, expect } from 'vitest';
import NumericInput from '@/components/NumericInput.vue';
import { createWrapper } from './test-utils';
import { InputText } from 'primevue';

describe('NumericInput.vue', () => {
  it('should render money input when keyfilterType is "money"', () => {
    const wrapper = createWrapper(NumericInput, { props: { title: 'Test Money', keyfilterType: 'int', modelValue: '' } });
    const inputText = wrapper.find('input');
    expect(inputText.exists()).toBe(true);
  });

  it('should emit the correct value when v-model is updated', async () => {
    const wrapper = createWrapper(NumericInput, { props: { title: 'Test Money', keyfilterType: 'money', modelValue: '' } });
    const inputText = wrapper.findComponent(InputText);
    await inputText.setValue('1000.00');

    const emittedEvents = wrapper.emitted('update:modelValue');
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents?.[0]).toEqual([1000.00]);
  });

  it('should emit the correct value when keyfilterType is "int"', async () => {
    const wrapper = createWrapper(NumericInput, { props: { title: 'Test Integer', keyfilterType: 'int', modelValue: '' } });
    const inputText = wrapper.findComponent(InputText);
    await inputText.setValue('500');

    const emittedEvents = wrapper.emitted('update:modelValue');
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents?.[0]).toEqual([500]);
  });
});
