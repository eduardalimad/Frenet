import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import FreightForm from '@/components/FreightForm.vue';
import { createWrapper } from './test-utils';

describe('FreightForm.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = createWrapper(FreightForm, {});
  });

  it('deve renderizar corretamente os inputs', () => {
    expect(wrapper.find('[id="cepOrigem"]').exists()).toBe(true);
    expect(wrapper.find('[id="cepDestino"]').exists()).toBe(true);
    expect(wrapper.find('[id="largura"]').exists()).toBe(true);
    expect(wrapper.find('[id="altura"]').exists()).toBe(true);
    expect(wrapper.find('[id="comprimento"]').exists()).toBe(true);
    expect(wrapper.find('[id="peso"]').exists()).toBe(true);
    expect(wrapper.find('[id="qtd"]').exists()).toBe(true);
    expect(wrapper.find('[id="valor"]').exists()).toBe(true);
  });

  it('deve atualizar o valor do campo "CEP de origem" ao digitar', async () => {
    const inputCepOrigem = wrapper.findComponent({ name: 'MaskedInput' });
    const novoValor = '12345-678';
    await inputCepOrigem.vm.$emit('update:modelValue', novoValor);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.data.cep_origem).toBe(novoValor);
  });

  it('deve atualizar o valor do campo "Largura" ao digitar', async () => {
    const inputLargura = wrapper.find('[id="largura"]');
    await inputLargura.setValue('50');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.data.largura).toBe(50);
  });

  it('deve chamar o método submit ao clicar no botão "Buscar"', async () => {
    await wrapper.find('button.btn-search').trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
