import { createRouter, createWebHashHistory } from "vue-router";
import Home from '../components/home/Home.vue'

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        redirect: '/home',
        children:[
            {
                path: "/home",
                name: "home",
                meta: {
                    title: '首页'
                },
                component: () => import ("../components/home/Home.vue")
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });
  
export default router;