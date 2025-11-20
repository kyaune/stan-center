import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ArticlePage from '@/pages/ArticlePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import ContactsPage from '@/pages/ContactsPage.vue'
import TagPage from '@/pages/TagPage.vue'
import ExpertsPage from '@/pages/ExpertsPage.vue'
import QuotesPage from '@/pages/QuotesPage.vue'

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
    {
        path: '/analitika',
        name: 'analitika',
        component: TagPage,
        meta: { tagSlug: 'analitika' }
    },
    {
        path: '/intervyu',
        name: 'intervyu',
        component: TagPage,
        meta: { tagSlug: 'intervyu' }
    },
    {
        path: '/mneniya',
        name: 'mneniya',
        component: TagPage,
        meta: { tagSlug: 'mneniya' }
    },
    {
        path: '/obzory',
        name: 'obzory',
        component: TagPage,
        meta: { tagSlug: 'obzory' }
    },
    {
        path: '/experti',
        name: 'experti',
        component: ExpertsPage,
    },
    {
        path: '/citati',
        name: 'citati',
        component: QuotesPage,
    },
    { path: '/o-nas', name: 'o-nas', component: AboutPage },
    { path: '/contacti', name: 'contacti', component: ContactsPage },

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router