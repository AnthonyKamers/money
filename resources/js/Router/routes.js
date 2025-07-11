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
            },

            // categorias rendas
            {
                path: '/rendas/:banco_id/categorias',
                name: "Rendas.categorias",
                component: () => import("../Pages/Bancos/Acoes/Rendas/Categorias.vue"),
                meta: {
                    title: "Categorias rendas banco"
                }
            },
            {
                path: '/rendas/:banco_id/cadastrar-categoria',
                name: 'Rendas.categorias.cadastrar',
                component: () => import("../Pages/Bancos/Acoes/Rendas/CadastrarCategoria.vue"),
                meta: {
                    title: "Cadastrar categoria de rendas"
                }
            },

            // rendas
            {
                path: '/rendas/:banco_id/rendas',
                name: "Rendas",
                component: () => import("../Pages/Bancos/Acoes/Rendas/Rendas.vue"),
                meta: {
                    title: "Rendas"
                }
            },
            {
                path: '/rendas/:banco_id/cadastrar-renda',
                name: "Rendas.cadastrar",
                component: () => import("../Pages/Bancos/Acoes/Rendas/CadastrarRenda.vue"),
                meta: {
                    title: "Cadastrar rendas"
                }
            },

            // ações rendas
            {
                path: '/rendas/:banco_id/ver-parcelas/:renda_id',
                name: "Rendas.ver_parcelas",
                component: () => import("../Pages/Bancos/Acoes/Rendas/VerParcelas.vue"),
                meta: {
                    title: "Ver parcelas renda"
                }
            },
            {
                path: '/rendas/:banco_id/ver-renda-fixa/:renda_fixa_id',
                name: "Rendas.ver_renda_fixa",
                component: () => import("../Pages/Bancos/Acoes/Rendas/VerRendaFixa.vue"),
                meta: {
                    title: "Ver renda fixa"
                }
            },

            // rendas fixas
            {
                path: '/rendas/:banco_id/rendas-fixas',
                name: "Rendas.rendas-fixas",
                component: () => import("../Pages/Bancos/Acoes/Rendas/RendasFixas.vue"),
                meta: {
                    title: "Rendas fixas"
                }
            },


            // categorias despesas
            {
                path: '/despesas/:banco_id/categorias',
                name: "Despesas.categorias",
                component: () => import("../Pages/Bancos/Acoes/Despesas/Categorias.vue"),
                meta: {
                    title: "Categorias de despesas"
                }
            },
            {
                path: '/despesas/:banco_id/cadastrar-categoria',
                name: 'Despedesas.categorias.cadastrar',
                component: () => import("../Pages/Bancos/Acoes/Despesas/CadastrarCategoria.vue"),
                meta: {
                    title: "Cadastrar categoria de despesas"
                }
            },

            // despesas
            {
                path: '/despesas/:banco_id/despesas',
                name: "Despesas",
                component: () => import("../Pages/Bancos/Acoes/Despesas/Despesas.vue"),
                meta: {
                    title: "Despesas"
                }
            },
            {
                path: '/despesas/:banco_id/cadastrar-despesa',
                name: "Despesas.cadastrar",
                component: () => import("../Pages/Bancos/Acoes/Despesas/CadastrarDespesa.vue"),
                meta: {
                    title: "Cadastrar despesa"
                }
            },

            // ações despesas
            {
                path: '/despesas/:banco_id/ver-parcelas/:despesa_id',
                name: "Despesas.ver_parcelas",
                component: () => import("../Pages/Bancos/Acoes/Despesas/VerParcelas.vue"),
                meta: {
                    title: "Ver parcelas despesa"
                }
            },
            {
                path: '/despesas/:banco_id/ver-despesa-fixa/:despesa_fixa_id',
                name: "Despesas.ver_despesa_fixa",
                component: () => import("../Pages/Bancos/Acoes/Despesas/VerDespesaFixa.vue"),
                meta: {
                    title: "Ver despesa fixa"
                }
            },

            // despesa fixa
            {
                path: '/despesas/:banco_id/despesas-fixas',
                name: "Despesas.rendas-fixas",
                component: () => import("../Pages/Bancos/Acoes/Despesas/DespesasFixas.vue"),
                meta: {
                    title: "Despesas fixas"
                }
            },

            // faturas cartões
            {
                path: '/despesas/:banco_id/faturas-cartoes',
                name: "Despesas.faturas-cartoes",
                component: () => import("../Pages/Bancos/Acoes/Despesas/Faturas/FaturasCartoes.vue"),
                meta: {
                    title: "Faturas cartões"
                }
            },
            {
                path: '/despesas/:banco_id/faturas-cartoes/:fatura_id',
                name: "Despesas.faturas-cartoes.ver-fatura",
                component: () => import("../Pages/Bancos/Acoes/Despesas/Faturas/VerFatura.vue"),
                meta: {
                    title: "Ver fatura"
                }
            },

            // parcelas pagar
            {
                path: '/despesas/:banco_id/parcelas-pagar',
                name: "Despesas.parcelas.parcelas-pagar",
                component: () => import("../Pages/Bancos/Acoes/Despesas/ParcelasPagar.vue"),
                meta: {
                    title: "Parcelas à pagar"
                }
            },
        ]
    }
];

export default routes;