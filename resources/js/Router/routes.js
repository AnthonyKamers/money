const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import("../Pages/Index.vue"),
        meta: {
            title: 'Money',
            requiresAuth: undefined,
        }
    },
    {
        path: '/register',
        name: "Register",
        component: () => import("../Pages/Register.vue"),
        meta: {
            title: 'Register',
            requiresAuth: false,
        }
    },
    {
        path: '/login',
        name: "Login",
        component: () => import("../Pages/Login.vue"),
        meta: {
            title: 'Login',
            requiresAuth: false,
        }
    },

    // User Pages
    {
        path: '/dashboard',
        name: "Dashboard",
        component: () => import("../Pages/User/Dashboard.vue"),
        meta: {
            title: 'Dashboard',
            requiresAuth: true,
        },
        children: [
            // cadastro bancos
            {
                path: '/bancos',
                name: "Bancos",
                component: () => import("../Pages/Bancos/Bancos.vue"),
                meta: {
                    title: "Bancos"
                }
            },
            {
                path: '/cadastrar-banco',
                name: 'Bancos.cadastrar',
                component: () => import("../Pages/Bancos/CadastrarBanco.vue"),
                meta: {
                    title: "Cadastrar banco"
                }
            },
            {
                path: "/editar-banco",
                name: "Bancos.editar",
                component: () => import("../Pages/Bancos/CadastrarBanco.vue"),
                meta: {
                    title: "Editar banco"
                }
            },

            // ações bancos
            // cartões
            {
                path: '/banco/:banco_id/cartoes',
                name: "Bancos.cartoes",
                component: () => import("../Pages/Bancos/Acoes/Cartoes/Cartoes.vue"),
                meta: {
                    title: "Cartões banco"
                }
            },
            {
                path: '/banco/:banco_id/cadastrar-cartao',
                name: "Bancos.cartoes.cadastrar",
                component: () => import("../Pages/Bancos/Acoes/Cartoes/CadastrarCartao.vue"),
                meta: {
                    title: "Cadastrar cartão banco"
                }
            }
        ]
    }
];

export default routes;