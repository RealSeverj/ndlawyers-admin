import { createRouter, createWebHistory } from 'vue-router';
import ArticleUpload from '../views/ArticleUpload.vue';
import ArticleDetail from '../views/ArticleDetail.vue';
import ArticleView from "../views/ArticleView.vue";
import HomeView from "../views/HomeView.vue";
import ChangePassword from "../views/ChangePassword.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/upload',
        name: 'Upload',
        component: ArticleUpload
    },
    {
        path: '/article',
        name: 'Article',
        component: ArticleView
    },
    {
        path: '/article/:id',
        name: 'ArticleDetail',
        component: ArticleDetail
    },
    {
        path: '/profile/password',
        name: 'ChangePassword',
        component: ChangePassword
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('user');
    if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' });
    else next();
});

export default router;
