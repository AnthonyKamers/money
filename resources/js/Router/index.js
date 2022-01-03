import VueRouter from 'vue-router';
import routes from './routes';

const router = new VueRouter({
    routes,
});

// colocar título da página de acordo com vue-router
router.beforeEach((to, from, next) => {
    document.title = to.meta.title

    next()
});

// checar se o token está válido para ir para as páginas com requiresAuth == true
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!localStorage.token) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next() // make sure to always call next()!
    }
});

export default router;