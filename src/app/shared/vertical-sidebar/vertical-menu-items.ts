import { RouteInfo } from "./vertical-sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: "home",
    title: "Home",
    icon: "mdi mdi-home",
    class: "" ,
    extralink: false,
    submenu: [ 
    ],
  },
  {
    path: "",
    title: "Components",
    icon: "mdi mdi-dots-horizontal",
    class: "nav-small-cap",
    extralink: true,
    submenu: [],
  },
  {
    path: "",
    title: "Simulador",
    icon: "mdi mdi-lightbulb-on",
    class: "has-arrow",
    extralink: false,
    submenu: [
      {
        path: "/simulador/cronograma",
        title: "Cronograma",
        icon: "mdi mdi-calendar-clock",
        class: "",
        extralink: false,
        submenu: [],
      }, 
    ],
  },
 
];
