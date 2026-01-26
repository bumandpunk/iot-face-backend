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
      path: "/iot/records/detail",
      name: "IotRecordDetail",
      component: () => import("@/views/iot/record-detail-page.vue"),
      meta: {
        title: "进出记录详细查询"
      }
    },
    {
      path: "/iot/people",
      name: "IotPeople",
      component: () => import("@/views/iot/person-list-page.vue"),
      meta: {
        title: "人员分页查询"
      }
    },
    {
      path: "/iot/people/edit",
      name: "IotPeopleEdit",
      component: () => import("@/views/iot/person-edit-page.vue"),
      meta: {
        title: "人员修改"
      }
    },
    {
      path: "/iot/people/add",
      name: "IotPeopleAdd",
      component: () => import("@/views/iot/person-add-page.vue"),
      meta: {
        title: "人员新增"
      }
    }
  ]
} satisfies RouteConfigsTable;
