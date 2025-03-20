import './assets/scss/base.scss';
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import registerComponents from './plugins/prime.ts'
import KeyFilter from 'primevue/keyfilter';
import { createPinia } from 'pinia';

const app = createApp(App)
app.directive('keyfilter', KeyFilter);

app.use(router)
app.use(createPinia());
registerComponents(app);
app.mount('#app')
