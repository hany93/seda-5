/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
//import ListSubheader from '@material-ui/core/ListSubheader';
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.js";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import Button from '@material-ui/core/Button';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
//import { sync } from "read-file";

const styles1 = {
  borderStyle: 'solid',
  borderWidth: '2px',
  boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)'
};
const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles(props);
  const [icon, setIcon] = React.useState(false);
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logo, image, logoText, routes } = props;
  // var links = (
  //   <List className={classes.list}>
  //     {routes.map((prop, key) => {
  //       var activePro = " ";
  //       var listItemClasses;
  //       if (prop.path === "/upgrade-to-pro") {
  //         activePro = classes.activePro + " ";
  //         listItemClasses = classNames({
  //           [" " + classes[color]]: true
  //         });
  //       } else {
  //         listItemClasses = classNames({
  //           [" " + classes[color]]: activeRoute(prop.layout + prop.path)
  //         });
  //       }
  //       const whiteFontClasses = classNames({
  //         [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
  //       });
  //       return (
  //         <NavLink
  //           to={prop.layout + prop.path}
  //           className={activePro + classes.item}
  //           activeClassName="active"
  //           key={key}
  //         >
  //           <ListItem button className={classes.itemLink + listItemClasses}>
  //             {typeof prop.icon === "string" ? (
  //               <Icon
  //                 className={classNames(classes.itemIcon, whiteFontClasses, {
  //                   [classes.itemIconRTL]: props.rtlActive
  //                 })}
  //               >
  //                 {prop.icon}
  //               </Icon>
  //             ) : (
  //               <prop.icon
  //                 className={classNames(classes.itemIcon, whiteFontClasses, {
  //                   [classes.itemIconRTL]: props.rtlActive
  //                 })}
  //               />
  //             )}
  //             <ListItemText
  //               primary={props.rtlActive ? prop.rtlName : prop.name}
  //               className={classNames(classes.itemText, whiteFontClasses, {
  //                 [classes.itemTextRTL]: props.rtlActive
  //               })}
  //               disableTypography={true}
  //             />
  //           </ListItem>
  //         </NavLink>
  //       );
  //     })}
  //   </List>
  // );
  var links = (
    <List
      className={classes.list}
      // aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader" className={classes.itemText}>
      //     Est. Ag. Urbana y suburbana
      // </ListSubheader>
      // }
    >
      {routes.map((prop, key) => {
        var listItemClasses;
        listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(prop.layout + prop.path)
        });
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem
              button
              className={classes.itemLink + listItemClasses}
            >
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive
                    })}
                  />
                )}
              <ListItemText
                primary={props.rtlActive ? prop.rtlName : prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive
                })}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <Link to="/admin/Dashboard"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
        title='Inicio'
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </Link>
    </div>
  );
  const clicko = async () => {
    setIcon(true);
    domtoimage.toBlob(document.getElementById('cap'), { quality: 1.0, bgcolor: '#fff', height: document.getElementById('cap').scrollHeight, width: document.getElementById('cap').scrollWidth, style: styles1 })
      .then((blob) => {
        saveAs(blob, 'ScreenShot.jpg')
        setIcon(false);
        var w = window.open(URL.createObjectURL(blob), '_blank');
        w.onload = function () {
          w.document.title = 'Estadística Agricultura Urbana y Suburbana';
        };
      });
  }
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks
              color={color}
              colorItem={true}
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
              setLoading={props.setLoading}
            />}
            {links}
          </div>
          <div style={{ paddingBottom: 30, textAlign: 'center', zIndex: 5, position: 'absolute', bottom: '10px', margin: 'auto', left: 0, right: 0 }}>
            <Button
              size='large'
              onClick={clicko}
              className={classes.buttonSide}
            >
              {icon ? (<CircularProgress size={20} style={{ color: '#fff', marginRight: 10 }} />) : (<PhotoCameraIcon style={{ color: '#fff', marginRight: 10 }} />)}Descargar
            </Button>
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}
          </div>
          <div style={{ paddingBottom: 30, textAlign: 'center', zIndex: 5, position: 'absolute', bottom: '10px', margin: 'auto', left: 0, right: 0 }}>
            <Button
              size='large'
              onClick={clicko}
              className={classes.buttonSide}
            >
              {icon ? (<CircularProgress size={20} style={{ color: '#fff', marginRight: 10 }} />) : (<PhotoCameraIcon style={{ color: '#fff', marginRight: 10 }} />)}Descargar
            </Button>
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
