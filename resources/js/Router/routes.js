const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import("../Pages/Index.vue"),
        meta: { title: 'Águia imóveis' }
    },
    {
        path: '/about',
        name: "About",
        component: () => import("../Pages/About.vue"),
        meta: { title: 'Sobre águia imóveis' }
    },
    {
        path: '/admin',
        name: "Admin",
        component: () => import("../Pages/Admin.vue"),
        meta: { title: 'Admin' }
    }
];

export default routes;