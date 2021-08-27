import { createApp } from 'vue'
import App from './App.vue'
import './style/style.css'
import router from './router'
import Icon from 'vant';
import 'vant/lib/index.css';

const app = createApp(App)
app
    .use(router)
    .use(Icon)
    .mount('#app')
