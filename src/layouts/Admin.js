// import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";
// // creates a beautiful scrollbar
// import PerfectScrollbar from "perfect-scrollbar";
// import "perfect-scrollbar/css/perfect-scrollbar.css";
// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// // core components
// import Navbar from "components/Navbars/Navbar.js";
// import Footer from "components/Footer/Footer.js";
// import Sidebar from "components/Sidebar/Sidebar.js";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

// import routes from "routes.js";

// import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

// import bgImage from "assets/img/sidebar-1.jpg";
// import logo from "assets/img/reactlogo.png";

// let ps;

// const switchRoutes = (
//   <Switch>
//     {routes.map((prop, key) => {
//       if (prop.layout === "/admin") {
//         return (
//           <Route
//             path={prop.layout + prop.path}
//             component={prop.component}
//             key={key}
//           />
//         );
//       }
//       return null;
//     })}
//     <Redirect from="/admin" to="/admin/dashboard" />
//   </Switch>
// );

// const useStyles = makeStyles(styles);

// export default function Admin({ ...rest }) {
//   // styles
//   const classes = useStyles();
//   // ref to help us initialize PerfectScrollbar on windows devices
//   const mainPanel = React.createRef();
//   // states and functions
//   const [image, setImage] = React.useState(bgImage);
//   const [color, setColor] = React.useState("purple");
//   const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const handleImageClick = image => {
//     setImage(image);
//   };
//   const handleColorClick = color => {
//     setColor(color);
//   };
//   const handleFixedClick = () => {
//     if (fixedClasses === "dropdown") {
//       setFixedClasses("dropdown show");
//     } else {
//       setFixedClasses("dropdown");
//     }
//   };
//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };
//   const getRoute = () => {
//     return window.location.pathname !== "/admin/maps";
//   };
//   const resizeFunction = () => {
//     if (window.innerWidth >= 960) {
//       setMobileOpen(false);
//     }
//   };
//   // initialize and destroy the PerfectScrollbar plugin
//   React.useEffect(() => {
//     if (navigator.platform.indexOf("Win") > -1) {
//       ps = new PerfectScrollbar(mainPanel.current, {
//         suppressScrollX: true,
//         suppressScrollY: false
//       });
//       document.body.style.overflow = "hidden";
//     }
//     window.addEventListener("resize", resizeFunction);
//     // Specify how to clean up after this effect:
//     return function cleanup() {
//       if (navigator.platform.indexOf("Win") > -1) {
//         ps.destroy();
//       }
//       window.removeEventListener("resize", resizeFunction);
//     };
//   }, [mainPanel]);
//   return (
//     <div className={classes.wrapper}>
//       <Sidebar
//         routes={routes}
//         logoText={"Creative Tim"}
//         logo={logo}
//         image={image}
//         handleDrawerToggle={handleDrawerToggle}
//         open={mobileOpen}
//         color={color}
//         {...rest}
//       />
//       <div className={classes.mainPanel} ref={mainPanel}>
//         <Navbar
//           routes={routes}
//           handleDrawerToggle={handleDrawerToggle}
//           {...rest}
//         />
//         {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
//         {getRoute() ? (
//           <div className={classes.content}>
//             <div className={classes.container}>
//               <Switch>
//                 {routes.map((prop, key) => {
//                   if (prop.layout === "/admin") {
//                     return (
//                       <Route
//                         path={prop.layout + prop.path}
//                         render={() => <prop.component color1={color === "blue" ? 'info' : color === "purple" ? 'primary' : color === "green" ? 'success' : color === "orange" ? 'warning' : 'danger'} />}
//                         key={key}
//                       />
//                     );
//                   }
//                   return null;
//                 })
//                 }
//                 <Route path="/admin/dashboard" component={Dashboard} />
//                 <Redirect from="/admin" to="/admin/dashboard" />
//               </Switch>}
//             </div>
//           </div>
//         ) : (
//             <div className={classes.map}>{switchRoutes}</div>
//           )}
//         {getRoute() ? <Footer /> : null}
//         <FixedPlugin
//           handleImageClick={handleImageClick}
//           handleColorClick={handleColorClick}
//           bgColor={color}
//           bgImage={image}
//           handleFixedClick={handleFixedClick}
//           fixedClasses={fixedClasses}
//         />
//       </div>
//     </div>
//   );
// }
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-1.jpg";
import logo from "assets/img/reactlogo.png";

import cubejs from '@cubejs-client/core';
let ps;

const useStyles = makeStyles(styles);

const API_URL = "http://sed.enpa.vcl.minag.cu"; // change to your actual endpoint

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjUxODE0NjMsImV4cCI6MTU2NTI2Nzg2M30.r3FYOTFyahrqGyE_BWF0HXeXlrDP8YDtWhWTRtehU0I",
  { apiUrl: API_URL + "/cubejs-api/v1" }
);

export default function Admin({ ...rest }) {


  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("purple");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [municipios, setMunicipios] = React.useState();
  const [provincias, setProvincias] = React.useState();

  const [lugarFiltrado, setLugarfiltrado] = React.useState("esfeswrf");



  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:....................................\u00a0.........para poner espacios en blanco en una cadena " "
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };

  }, [mainPanel]);

  React.useEffect(() => {
    async function asyncrona() {

      const municipios = await cubejsApi.load({
        "measures": [],
        "timeDimensions": [],
        "dimensions": [
          "SymAgricUrbanaPoint.municipio"
        ],
        "filters": []
      })
      var auxm = []
      municipios["loadResponse"]["data"].map((mun) =>
        auxm.push(mun["SymAgricUrbanaPoint.municipio"])
      )
      await setMunicipios(auxm);

    }

    asyncrona()

  },

    []

  );

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"\u00a0\u00a0\u00a0SedA"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        setMunicipios={setMunicipios}
        municipios={municipios}
        setProvincias={setProvincias}
        provincias={provincias}
        setLugarfiltrado={setLugarfiltrado}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          color={color}
          handleDrawerToggle={handleDrawerToggle}
          setMunicipios={setMunicipios}
          municipios={municipios}
          setProvincias={setProvincias}
          provincias={provincias}
          setLugarfiltrado={setLugarfiltrado}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>{
            <Switch>
              {routes.map((prop, key) => {
                if (prop.layout === "/admin") {
                  return (
                    <Route
                      path={prop.layout + prop.path}
                      render={() => <prop.component municipios={municipios} color1={color === "blue" ? 'info' : color === "purple" ? 'primary' : color === "green" ? 'success' : color === "orange" ? 'warning' : 'danger'} />}
                      key={key}
                    />
                  );
                }
                return null;
              })
              }
              <Route path="/admin/dashboard" render={() => <Dashboard municipios={municipios} provincias={provincias} lugarfiltrado={lugarFiltrado} />} />
              <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>}</div>
        </div>
        <Footer />
        <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        />
      </div>
    </div>
  );
}
