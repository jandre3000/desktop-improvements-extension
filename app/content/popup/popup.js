import {createApp} from "vue";
import PrimeVue from 'primevue/config';
import App from "./App.vue";

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);

const mountElement = window.document.createElement( 'div' );
document.body.appendChild( mountElement );

app.use(PrimeVue);
app.mount(mountElement)