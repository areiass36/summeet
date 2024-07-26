import '@/assets/style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles';
import { createVuetify } from 'vuetify/lib/framework.mjs';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, fa } from 'vuetify/iconsets/fa';

const app = createApp(App)

const vuetify = createVuetify({
	components, directives, icons: {
		defaultSet: 'fa',
		aliases,
		sets: {
			fa
		}
	}
});

app.use(vuetify)
	.use(createPinia())
	.use(router)
	.mount('#app')
