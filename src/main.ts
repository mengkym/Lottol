import { createApp } from 'vue'
import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import App from './App.vue'
import router from './router'
import Icon from 'vant';
import './style/style.css'
import 'vant/lib/index.css';
import "tailwindcss/tailwind.css"

const app = createApp(App)

if (Capacitor.isPluginAvailable('StatusBar')) { 
    StatusBar.setOverlaysWebView({ overlay: true }); 
};  

app
    .use(router)
    .use(Icon)
    .mount('#app')
