import { describe, it, expect } from 'vitest';
import MaskedInput from '@/components/MaskedInput.vue';
import { createWrapper } from './test-utils';
import InputMask from 'primevue/inputmask';

describe('MaskedInput.vue', () => {
  it('renders InputMask with correct props', () => {
    const wrapper = createWrapper(MaskedInput, { props: { title: 'Test Mask', mask: '999-999', modelValue: '' } });
    const inputMask = wrapper.findComponent(InputMask);

    expect(inputMask.exists()).toBe(true);
    expect(wrapper.find('label').text()).toBe('Test Mask');
    expect(inputMask.props('mask')).toBe('999-999');
  });

  it('updates v-model value correctly when InputMask value changes', async () => {
    const wrapper = createWrapper(MaskedInput, { props: { title: 'Test Mask', mask: '999-999', modelValue: '' } });
    const inputMask = wrapper.findComponent(InputMask);

    await inputMask.setValue('123-456');
    expect(wrapper.vm.localValue).toBe('123-456');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['123-456']);
  });

  it('emits the correct value when modelValue changes', async () => {
    const wrapper = createWrapper(MaskedInput, { props: { title: 'Test Mask', mask: '999-999', modelValue: '123-456' } });
    const inputMask = wrapper.findComponent(InputMask);

    await inputMask.setValue('654-321');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['654-321']);
  });
});
