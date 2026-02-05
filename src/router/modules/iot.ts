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
    },
    {
      path: "/remote-door",
      name: "RemoteDoor",
      component: () => import("@/views/iot/remote-door-page.vue"),
      meta: {
        title: "远程开门",
        showLink: true
      }
    },
    {
      path: "/attendance",
      name: "Attendance",
      component: () => import("@/views/iot/attendance-page.vue"),
      meta: {
        title: "考勤统计",
        showLink: true
      }
    },
    {
      path: "/rfid-ware",
      name: "RfidWare",
      component: () => import("@/views/iot/rfid-ware-page.vue"),
      meta: {
        title: "固资进出记录",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
