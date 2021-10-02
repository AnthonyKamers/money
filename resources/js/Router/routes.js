const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import("../Pages/Index.vue")
    },
    {
        path: '/about',
        name: "About",
        component: () => import("../Pages/About.vue")
    }
];

export default routes;