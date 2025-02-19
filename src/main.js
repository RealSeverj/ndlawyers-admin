import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue'

const app = createApp(App);
app.use(Antd)
app.use(router)

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('user');
    if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' });
    else next();
});

app.use(router).mount('#app');
