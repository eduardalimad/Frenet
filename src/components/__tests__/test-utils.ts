import { mount } from '@vue/test-utils';
import type { MountingOptions } from '@vue/test-utils';
import { createApp } from 'vue';
import type { Component } from 'vue';
import PrimeVue from 'primevue/config';
import KeyFilter from 'primevue/keyfilter';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import FloatLabel from 'primevue/floatlabel';
import Message from 'primevue/message';
import Button from 'primevue/button';

export const createWrapper = (
  component: Component,
  options: MountingOptions<{}, {}> = {}
) => {
  const app = createApp(component);
  app.use(PrimeVue);

  return mount(component, {
    global: {
      plugins: [PrimeVue],
      components: {
        InputText,
        InputMask,
        FloatLabel,
        Message,
        Button,
      },
      directives: {
        keyfilter: KeyFilter,
      },
      ...options,
    },
    ...options,
  });
};
