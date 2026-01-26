const Layout = () => import("@/layout/index.vue");

export default {
  path: "/iot",
  name: "Iot",
  component: Layout,
  redirect: "/iot/records",
  meta: {
    icon: "ep/monitor",
    title: "IOT_Xthings",
    rank: 1
  },
  children: [
    {
      path: "/iot/records",
      name: "IotRecords",
      component: () => import("@/views/iot/records-page.vue"),
      meta: {
        title: "进出记录分页查询"
      }
    },
    {
      path: "/iot/people",
      name: "IotPeople",
      component: () => import("@/views/iot/person-list-page.vue"),
      meta: {
        title: "人员分页查询"
      }
    }
  ]
} satisfies RouteConfigsTable;
