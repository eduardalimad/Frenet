import './assets/scss/base.scss';
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import registerComponents from './plugins/prime.ts'
import KeyFilter from 'primevue/keyfilter';
import { createPinia } from 'pinia';
import Toast, { type PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";


const app = createApp(App)
app.directive('keyfilter', KeyFilter);

app.use(router)
app.use(Toast);
app.use(createPinia());
registerComponents(app);
app.mount('#app')
