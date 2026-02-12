import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ArticlePage from '@/pages/ArticlePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import ContactsPage from '@/pages/ContactsPage.vue'
import TagPage from '@/pages/TagPage.vue'
import ExpertsPage from '@/pages/ExpertsPage.vue'
import ExpertPage from '@/pages/ExpertPage.vue'
import QuotesPage from '@/pages/QuotesPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    // Страницы списков статей по типу
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
    // Страницы отдельных статей по типу и id (acf.id)
    {
        path: '/analitika/:id',
        name: 'article-analitika',
        component: ArticlePage,
        props: route => ({ typeSlug: 'analitika', id: route.params.id })
    },
    {
        path: '/intervyu/:id',
        name: 'article-intervyu',
        component: ArticlePage,
        props: route => ({ typeSlug: 'intervyu', id: route.params.id })
    },
    {
        path: '/mneniya/:id',
        name: 'article-mneniya',
        component: ArticlePage,
        props: route => ({ typeSlug: 'mneniya', id: route.params.id })
    },
    {
        path: '/obzory/:id',
        name: 'article-obzory',
        component: ArticlePage,
        props: route => ({ typeSlug: 'obzory', id: route.params.id })
    },
    {
        path: '/tag/:slug',
        name: 'tag',
        component: TagPage,
    },
    {
        path: '/experti',
        name: 'experti',
        component: ExpertsPage,
    },
    {
        path: '/experti/:slug',
        name: 'expert',
        component: ExpertPage,
        props: true
    },
    {
        path: '/citati',
        name: 'citati',
        component: QuotesPage,
    },
    { path: '/o-nas', name: 'o-nas', component: AboutPage },
    { path: '/contacti', name: 'contacti', component: ContactsPage },
    // 404 - должен быть последним
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router