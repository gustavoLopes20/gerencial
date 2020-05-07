export default [
    {
        path: '/account/login',
        name: 'login',
        component: () => import('../views/Site/Login.vue'),
    },
    {
        path: '/gerencial',
        name: 'gerencial',
        component: () => import('../views/Gerencial/Index.vue'),
        meta: { 
            requiresAuth: true,
            roles: ["Master","Administrador"]
        },
        redirect: 'gerencial/dashboard',
        children: [
            {
                path: '/gerencial/products',
                name: 'gerencial-products',
                component: () => import('../components/Gerencial/Products/index.vue'),
                meta: { 
                    requiresAuth: true,
                    roles: ["Master","Administrador"] 
                },
            },     
            {
                path: '/gerencial/departament',
                name: 'gerencial-departament',
                component: () => import('../components/Gerencial/Department/index.vue'),
                meta: { 
                    requiresAuth: true,
                    roles: ["Master","Administrador"] 
                },
            }, 
            {
                path: '/gerencial/promotions',
                name: 'gerencial-promotions',
                component: () => import('../components/Gerencial/Promotions/index.vue'),
                meta: { 
                    requiresAuth: true,
                    roles: ["Master","Administrador"] 
                },
            }, 
            {
                path: '/gerencial/orders',
                name: 'gerencial-orders',
                component: () => import('../components/Gerencial/Orders/index.vue'),
                meta: { 
                    requiresAuth: true,
                    roles: ["Master","Administrador"] 
                },
            },
            {
                path: '/gerencial/frete',
                name: 'gerencial-frete',
                component: () => import('../components/Gerencial/Frete/index.vue'),
                meta: { 
                    requiresAuth: true,
                    roles: ["Master","Administrador"] 
                },
            },
            {
                path: '/gerencial/dashboard',
                name: 'gerencial-dashboard',
                component: () => import('../views/Gerencial/Dashboard.vue'),
                meta: { 
                    requiresAuth: true,
                    roles: ["Master","Administrador"] 
                },
            },
        ]
    },
    {
        path: '',
        redirect: 'account/login'
    }
]