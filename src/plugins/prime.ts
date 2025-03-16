import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import InputText from "primevue/inputtext";
import "primeicons/primeicons.css";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import FloatLabel from 'primevue/floatlabel';
import InputNumber from 'primevue/inputnumber';
import InputMask from 'primevue/inputmask';


const options: {
  theme: {
    preset: typeof Aura;
    options: {
      prefix: string;
      darkModeSelector: boolean | string;
      name: string;
      order: string;
    };
  };
} = {
  theme: {
    preset: Aura,
    options: {
      prefix: "p",
      darkModeSelector: false || "none",
      name: "primevue",
      order: "tailwind-base, primevue, tailwind-utilities",
    },
  },
};


const components = [InputNumber,FloatLabel, Button, InputText, InputMask, Dialog];

export default function registerPrimeVue(App: any): void {
  App.use(PrimeVue, options);

  components.forEach((component) => {
    if (component.name) {
      App.component(component.name, component);
    }
  });
}
