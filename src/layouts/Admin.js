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
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Cuba0 from 'assets/img/cuba0.png'
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
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
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [municipios, setMunicipios] = React.useState(['']);
  const [provincias, setProvincias] = React.useState(['']);
  const [lugarFiltrado, setLugarfiltrado] = React.useState(["Cuba"]);
  const [check, setCheck] = React.useState(true);
  const [loading, setLoading] = React.useState(true);


  const [inavilitarProvMun, setInavilitarProvMun] = React.useState(true);
  const [provinciaAntesDePais, setProvinciaAntesDePais] = React.useState([]);
  const [municipioAntesDePais, setMunicipioAntesDePais] = React.useState([]);
  const [itemSelecDropDownMun, setItemSelecDropDownMun] = React.useState("Todos");
  const [reiniciarPuntos, setReiniciarPuntos] = React.useState(true);


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
    if (window.innerWidth >= 959) {
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

      const provincias = await cubejsApi.load({
        "measures": [],
        "timeDimensions": [],
        "dimensions": [
          "EntidadAgricUrbana.provincia"
        ],
        "filters": []
      })
      var auxp = []
      provincias["loadResponse"]["data"].map((prov) =>
        auxp.push(prov["EntidadAgricUrbana.provincia"])
      )
      setProvincias(auxp);
      //await setProvincias(auxp);

      const municipios = await cubejsApi.load({
        "measures": [],
        "timeDimensions": [],
        "dimensions": [
          "EntidadAgricUrbana.municipio"
        ],
        "filters": []
      })
      var auxm = []
      municipios["loadResponse"]["data"].map((mun) =>
        auxm.push(mun["EntidadAgricUrbana.municipio"])
      )
      setMunicipios(auxm);
      //await setMunicipios(auxm);
    }
    if (rest.match.params.provincia && rest.match.params.municipio) {
      setProvincias([rest.match.params.provincia])
      setMunicipios([rest.match.params.municipio])
    } else {
      asyncrona()
    }

  },

    []

  );
  return (
    <div className={classes.wrapper}>
      {/* <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
          'className': classes.info
        }}
        message={<Grid container spacing={3} style={{ fontSize: '20px', alignItems: 'center' }}><Grid item xs={1} sm={1} md={1} lg={1} xl={1}><InfoIcon style={{ fontSize: 30, opacity: 0.9, marginRight: '10px', display: 'flex' }} /></Grid><Grid item xs={5} sm={5} md={5} lg={3} xl={3}>Deseleccione&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Grid><Grid item xs={6} sm={6} md={6} lg={1} xl={1}><img alt='País' title='País' src={Cuba0} /></Grid><Grid item xs={12} sm={12} md={12} lg={7} xl={7}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;para elegir provincia y municipio.</Grid></Grid>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      /> */}
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
        lugarFiltrado={lugarFiltrado}
        check={check}
        setCheck={setCheck}
        inavilitarProvMun={inavilitarProvMun}
        setInavilitarProvMun={setInavilitarProvMun}
        provinciaAntesDePais={provinciaAntesDePais}
        setProvinciaAntesDePais={setProvinciaAntesDePais}
        municipioAntesDePais={municipioAntesDePais}
        setMunicipioAntesDePais={setMunicipioAntesDePais}
        itemSelecDropDownMun={itemSelecDropDownMun}
        setItemSelecDropDownMun={setItemSelecDropDownMun}
        reiniciarPuntos={reiniciarPuntos}
        setReiniciarPuntos={setReiniciarPuntos}
        setLoading={setLoading}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel} id='cap'>
        <Navbar
          routes={routes}
          color={color}
          handleDrawerToggle={handleDrawerToggle}
          setMunicipios={setMunicipios}
          municipios={municipios}
          setProvincias={setProvincias}
          provincias={provincias}
          setLugarfiltrado={setLugarfiltrado}
          lugarFiltrado={lugarFiltrado}
          check={check}
          setCheck={setCheck}
          inavilitarProvMun={inavilitarProvMun}
          setInavilitarProvMun={setInavilitarProvMun}
          provinciaAntesDePais={provinciaAntesDePais}
          setProvinciaAntesDePais={setProvinciaAntesDePais}
          municipioAntesDePais={municipioAntesDePais}
          setMunicipioAntesDePais={setMunicipioAntesDePais}
          itemSelecDropDownMun={itemSelecDropDownMun}
          setItemSelecDropDownMun={setItemSelecDropDownMun}
          reiniciarPuntos={reiniciarPuntos}
          setReiniciarPuntos={setReiniciarPuntos}
          setLoading={setLoading}
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
                      render={() => <prop.component setLoading={setLoading} provincias={provincias} municipios={municipios} color1={color === "blue" ? 'info' : color === "purple" ? 'primary' : color === "green" ? 'success' : color === "orange" ? 'warning' : 'danger'} />}
                      key={key}
                    />
                  );
                }
                return null;
              })
              }
              <Route path="/admin/dashboard" render={() => <Dashboard
                rest={{ ...rest }}
                municipios={municipios}
                provincias={provincias}
                lugarfiltrado={lugarFiltrado}
                reiniciarPuntos={reiniciarPuntos}
                setReiniciarPuntos={setReiniciarPuntos}
                loading={loading}
                setLoading={setLoading}
              />}
              />
              <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>}
          </div>
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
