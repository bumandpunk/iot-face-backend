const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/records",
  meta: {
    icon: "ep/home-filled",
    title: "首页",
    rank: 0
  },
  children: [
    {
      path: "/records",
      name: "Records",
      component: () => import("@/views/iot/records-page.vue"),
      meta: {
        title: "进出记录",
        showLink: true
      }
    },
    {
      path: "/people",
      name: "People",
      component: () => import("@/views/iot/person-list-page.vue"),
      meta: {
        title: "人员列表",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
