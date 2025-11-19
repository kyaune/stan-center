import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ArticlePage from '@/pages/ArticlePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import ContactsPage from '@/pages/ContactsPage.vue'


const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/article/:id',
        name: 'article',
        component: ArticlePage,
    },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/contacts', name: 'contacts', component: ContactsPage },

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router