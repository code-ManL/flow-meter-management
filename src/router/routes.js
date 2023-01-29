export default [
  {
    path: "/",
    redirect: "login",
  },
  {
    path: "/login",
    component: () => import("@/pages/login"),
  },
  {
    path: "/manager",
    component: () => import("@/pages/manager"),
  },
  {
    path: "/baojia",
    component: () => import("@/pages/baojia"),
    children: [
      {
        path: "init",
        component: () => import("@/components/baoJia/excelInit"),
      },
      {
        path: "check",
        component: () => import("@/components/baoJia/checkV"),
      },

      {
        path: "",
        redirect: "init",
      },
    ],
  },
  {
    path: '/math',
    component: () => import('@/components/math/mathPage'),
    redirect: '/math/unfinished',
    children: [
      {
        path: 'unfinished',
        component: () => import('@/pages/math/unfinished'),
      },
      {
        path: 'mathCount',
        component: () => import('@/pages/math/mathCount'),
      },
      {
        path: 'mathCountcheck',
        component: () => import('@/pages/math/mathCount'),
      },
      {
        path: 'finished',
        component: () => import('@/pages/math/finished'),
      },
      {
        path: 'template1',
        component: () => import('@/pages/math/template1'),
      },
      {
        path: 'template2',
        component: () => import('@/pages/math/template2'),
      },
      {
        path: 'template3',
        component: () => import('@/pages/math/template3'),
      },
      {
        path: 'template4',
        component: () => import('@/pages/math/template4'),
      },
      {
        path: 'template11',
        component: () => import('@/pages/math/template11'),
      },
      {
        path: 'template22',
        component: () => import('@/pages/math/template22'),
      },
      {
        path: 'template33',
        component: () => import('@/pages/math/template33'),
      },
      {
        path: 'template44',
        component: () => import('@/pages/math/template44'),
      },
      {
        path: 'test',
        component: () => import('@/pages/math/test'),
      },

    ]
  },

];
