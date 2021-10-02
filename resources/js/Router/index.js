import VueRouter from 'vue-router';
import routes from './routes';

const router = new VueRouter({
    routes
});

// colocar título da página de acordo com vue-router
router.beforeEach((to, from, next) => {
    document.title = to.meta.title

    next()
});

export default router;