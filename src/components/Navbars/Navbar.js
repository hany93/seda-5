// import React from "react";
// import classNames from "classnames";
// import PropTypes from "prop-types";
// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import Hidden from "@material-ui/core/Hidden";
// // @material-ui/icons
// import Menu from "@material-ui/icons/Menu";
// // core components
// import AdminNavbarLinks from "./AdminNavbarLinks.js";
// import RTLNavbarLinks from "./RTLNavbarLinks.js";
// import Button from "components/CustomButtons/Button.js";

// import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";

// const useStyles = makeStyles(styles);

// export default function Header(props) {
//   const classes = useStyles();
//   function makeBrand() {
//     var name;
//     props.routes.map(prop => {
//       if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
//         name = props.rtlActive ? prop.rtlName : prop.name;
//       }
//       return null;
//     });
//     return name;
//   }
//   const { color } = props;
//   const appBarClasses = classNames({
//     [" " + classes[color]]: color
//   });
//   return (
//     <AppBar className={classes.appBar + appBarClasses}>
//       <Toolbar className={classes.container}>
//         <div className={classes.flex}>
//           {/* Here we create navbar brand, based on route name */}
//           <Button color="transparent" href="#" className={classes.title}>
//             {makeBrand()}
//           </Button>
//         </div>
//         <Hidden smDown implementation="css">
//           {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
//         </Hidden>
//         <Hidden mdUp implementation="css">
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={props.handleDrawerToggle}
//           >
//             <Menu />
//           </IconButton>
//         </Hidden>
//       </Toolbar>
//     </AppBar>
//   );
// }

// Header.propTypes = {
//   color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
//   rtlActive: PropTypes.bool,
//   handleDrawerToggle: PropTypes.func,
//   routes: PropTypes.arrayOf(PropTypes.object)
// };
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles(props);
  function makeBrand() {
    var name;
    props.routes.map(prop => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = props.rtlActive ? prop.rtlName : prop.name;
      }
      return null;
    });
    return name;
  }
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          {makeBrand() === undefined ? <span className={classes.title} style={{ fontSize: '20px', display: 'flex', alignItems: 'center', marginLeft: 10 }}><HomeIcon /> Inicio</span> : <span className={classes.title} style={{ fontSize: '20px', display: 'flex', alignItems: 'center', marginLeft: 10 }}><HomeIcon className={classes.title_link} /><Link to="/admin/Dashboard" className={classes.title_link} title='Inicio'> Inicio</Link>&nbsp;/ {makeBrand()}</span>}
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks
            color={color}
            colorItem={false}
            municipios={props.municipios}
            setMunicipios={props.setMunicipios}
            setProvincias={props.setProvincias}
            provincias={props.provincias}
            lugarFiltrado={props.lugarFiltrado}
            setLugarfiltrado={props.setLugarfiltrado}
            check={props.check}
            setCheck={props.setCheck}
            inavilitarProvMun={props.inavilitarProvMun}
            setInavilitarProvMun={props.setInavilitarProvMun}
            provinciaAntesDePais={props.provinciaAntesDePais}
            setProvinciaAntesDePais={props.setProvinciaAntesDePais}
            municipioAntesDePais={props.municipioAntesDePais}
            setMunicipioAntesDePais={props.setMunicipioAntesDePais}
            itemSelecDropDownMun={props.itemSelecDropDownMun}
            setItemSelecDropDownMun={props.setItemSelecDropDownMun}
            reiniciarPuntos={props.reiniciarPuntos}
            setReiniciarPuntos={props.setReiniciarPuntos}
          />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};
