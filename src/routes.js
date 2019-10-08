/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Info from "@material-ui/icons/Info";
import Assessment from "@material-ui/icons/Assessment";
// core components/views for Admin layout
import EstadisticaAvanzada from "views/EstadisticaAvanzada/EstadisticaAvanzada.js";
import AcercaDe from "views/AcercaDe/AcercaDe.js";

const dashboardRoutes = [
  {
    path: "/estadisticaA",
    name: "Estadística Avanzada",
    rtlName: "Estadística Avanzada",
    icon: Assessment,
    component: EstadisticaAvanzada,
    layout: "/admin"
  },
  {
    path: "/acerca",
    name: "Acerca de...",
    rtlName:"Acerca de...",
    icon: Info,
    component: AcercaDe,
    layout: "/admin"
  }
];

export default dashboardRoutes;
