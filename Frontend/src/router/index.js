import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import Welcome from '../components/Welcome.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import Add from '../components/Add.vue';
import List from '../views/List.vue';
import Profile from '../views/Profile.vue';
const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/add',
        name: 'Add',
        component: Add,
    },
    {
        path: '/edit/:id',
        name: 'Edit',
        // lazy-loaded
        component: () =>
            import ('../components/Edit.vue')
    },
    {
        path: '/list',
        name: 'list',
        component: List,
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;