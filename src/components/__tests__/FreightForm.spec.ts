import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import FreightForm from '@/components/FreightForm.vue';
import { createWrapper } from './test-utils';

describe('FreightForm.vue', () => {
  let wrapper: VueWrapper<any>;
  let shippingData: any;

  beforeEach(() => {
    wrapper = createWrapper(FreightForm, {});
    shippingData = wrapper.vm.quoteForm;
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
    const novoValor = '12345-678';
    const inputCepOrigem = wrapper.find('[id="cepOrigem"]');
    await inputCepOrigem.setValue(novoValor);
    await wrapper.vm.$nextTick();
    expect(shippingData.originCep).toBe(novoValor);
  });

  it('deve atualizar o valor do campo "Largura" ao digitar', async () => {
    const novoValor = '50';
    const inputLargura = wrapper.find('[id="largura"]');
    await inputLargura.setValue(novoValor);
    await wrapper.vm.$nextTick();
    expect(shippingData.width).toBe(Number(novoValor));
  });

  it('deve chamar o método submit ao clicar no botão "Buscar"', async () => {
    const buttonBuscar = wrapper.find('button.btn-search');
    await buttonBuscar.trigger('click');
    const preparedRequest = prepareRequest(shippingData);
    expect(preparedRequest).toEqual({
      SellerCep: '12345',
      RecipientCep: '67890',
      ShipmentInvoiceValue: 0,
      ShippingItemArray: [{ Height: 0, Length: 0, Quantity: 0, Weight: 0, Width: 0 }],
      RecipientCountry: 'BR',
    });
  });
});

function prepareRequest(value: any) {
  return {
    SellerCep: '12345',
    RecipientCep: '67890',
    ShipmentInvoiceValue: value.value || 0,
    ShippingItemArray: [
      {
        Height: value.height || 0,
        Length: value.length || 0,
        Quantity: value.quantity || 0,
        Weight: value.weight || 0,
        Width: value.width || 0,
      },
    ],
    RecipientCountry: 'BR',
  };
}
