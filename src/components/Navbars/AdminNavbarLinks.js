// import React from "react";
// import classNames from "classnames";
// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// import MenuItem from "@material-ui/core/MenuItem";
// import MenuList from "@material-ui/core/MenuList";
// import Grow from "@material-ui/core/Grow";
// import Paper from "@material-ui/core/Paper";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// import Hidden from "@material-ui/core/Hidden";
// import Poppers from "@material-ui/core/Popper";
// import Divider from "@material-ui/core/Divider";
// // @material-ui/icons
// import Person from "@material-ui/icons/Person";
// import Notifications from "@material-ui/icons/Notifications";
// import Dashboard from "@material-ui/icons/Dashboard";
// import Search from "@material-ui/icons/Search";
// // core components
// import CustomInput from "components/CustomInput/CustomInput.js";
// import Button from "components/CustomButtons/Button.js";

// import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

// const useStyles = makeStyles(styles);

// export default function AdminNavbarLinks() {
//   const classes = useStyles();
//   const [openNotification, setOpenNotification] = React.useState(null);
//   const [openProfile, setOpenProfile] = React.useState(null);
//   const handleClickNotification = event => {
//     if (openNotification && openNotification.contains(event.target)) {
//       setOpenNotification(null);
//     } else {
//       setOpenNotification(event.currentTarget);
//     }
//   };
//   const handleCloseNotification = () => {
//     setOpenNotification(null);
//   };
//   const handleClickProfile = event => {
//     if (openProfile && openProfile.contains(event.target)) {
//       setOpenProfile(null);
//     } else {
//       setOpenProfile(event.currentTarget);
//     }
//   };
//   const handleCloseProfile = () => {
//     setOpenProfile(null);
//   };
//   return (
//     <div>
//       <div className={classes.searchWrapper}>
//         <CustomInput
//           formControlProps={{
//             className: classes.margin + " " + classes.search
//           }}
//           inputProps={{
//             placeholder: "Search",
//             inputProps: {
//               "aria-label": "Search"
//             }
//           }}
//         />
//         <Button color="white" aria-label="edit" justIcon round>
//           <Search />
//         </Button>
//       </div>
//       <Button
//         color={window.innerWidth > 959 ? "transparent" : "white"}
//         justIcon={window.innerWidth > 959}
//         simple={!(window.innerWidth > 959)}
//         aria-label="Dashboard"
//         className={classes.buttonLink}
//       >
//         <Dashboard className={classes.icons} />
//         <Hidden mdUp implementation="css">
//           <p className={classes.linkText}>Dashboard</p>
//         </Hidden>
//       </Button>
//       <div className={classes.manager}>
//         <Button
//           color={window.innerWidth > 959 ? "transparent" : "white"}
//           justIcon={window.innerWidth > 959}
//           simple={!(window.innerWidth > 959)}
//           aria-owns={openNotification ? "notification-menu-list-grow" : null}
//           aria-haspopup="true"
//           onClick={handleClickNotification}
//           className={classes.buttonLink}
//         >
//           <Notifications className={classes.icons} />
//           <span className={classes.notifications}>5</span>
//           <Hidden mdUp implementation="css">
//             <p onClick={handleCloseNotification} className={classes.linkText}>
//               Notification
//             </p>
//           </Hidden>
//         </Button>
//         <Poppers
//           open={Boolean(openNotification)}
//           anchorEl={openNotification}
//           transition
//           disablePortal
//           className={
//             classNames({ [classes.popperClose]: !openNotification }) +
//             " " +
//             classes.popperNav
//           }
//         >
//           {({ TransitionProps, placement }) => (
//             <Grow
//               {...TransitionProps}
//               id="notification-menu-list-grow"
//               style={{
//                 transformOrigin:
//                   placement === "bottom" ? "center top" : "center bottom"
//               }}
//             >
//               <Paper>
//                 <ClickAwayListener onClickAway={handleCloseNotification}>
//                   <MenuList role="menu">
//                     <MenuItem
//                       onClick={handleCloseNotification}
//                       className={classes.dropdownItem}
//                     >
//                       Mike John responded to your email
//                     </MenuItem>
//                     <MenuItem
//                       onClick={handleCloseNotification}
//                       className={classes.dropdownItem}
//                     >
//                       You have 5 new tasks
//                     </MenuItem>
//                     <MenuItem
//                       onClick={handleCloseNotification}
//                       className={classes.dropdownItem}
//                     >
//                       You{"'"}re now friend with Andrew
//                     </MenuItem>
//                     <MenuItem
//                       onClick={handleCloseNotification}
//                       className={classes.dropdownItem}
//                     >
//                       Another Notification
//                     </MenuItem>
//                     <MenuItem
//                       onClick={handleCloseNotification}
//                       className={classes.dropdownItem}
//                     >
//                       Another One
//                     </MenuItem>
//                   </MenuList>
//                 </ClickAwayListener>
//               </Paper>
//             </Grow>
//           )}
//         </Poppers>
//       </div>
//       <div className={classes.manager}>
//         <Button
//           color={window.innerWidth > 959 ? "transparent" : "white"}
//           justIcon={window.innerWidth > 959}
//           simple={!(window.innerWidth > 959)}
//           aria-owns={openProfile ? "profile-menu-list-grow" : null}
//           aria-haspopup="true"
//           onClick={handleClickProfile}
//           className={classes.buttonLink}
//         >
//           <Person className={classes.icons} />
//           <Hidden mdUp implementation="css">
//             <p className={classes.linkText}>Profile</p>
//           </Hidden>
//         </Button>
//         <Poppers
//           open={Boolean(openProfile)}
//           anchorEl={openProfile}
//           transition
//           disablePortal
//           className={
//             classNames({ [classes.popperClose]: !openProfile }) +
//             " " +
//             classes.popperNav
//           }
//         >
//           {({ TransitionProps, placement }) => (
//             <Grow
//               {...TransitionProps}
//               id="profile-menu-list-grow"
//               style={{
//                 transformOrigin:
//                   placement === "bottom" ? "center top" : "center bottom"
//               }}
//             >
//               <Paper>
//                 <ClickAwayListener onClickAway={handleCloseProfile}>
//                   <MenuList role="menu">
//                     <MenuItem
//                       onClick={handleCloseProfile}
//                       className={classes.dropdownItem}
//                     >
//                       Profile
//                     </MenuItem>
//                     <MenuItem
//                       onClick={handleCloseProfile}
//                       className={classes.dropdownItem}
//                     >
//                       Settings
//                     </MenuItem>
//                     <Divider light />
//                     <MenuItem
//                       onClick={handleCloseProfile}
//                       className={classes.dropdownItem}
//                     >
//                       Logout
//                     </MenuItem>
//                   </MenuList>
//                 </ClickAwayListener>
//               </Paper>
//             </Grow>
//           )}
//         </Poppers>
//       </div>
//     </div>
//   );
// }
import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
// @material-ui/icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
// core components

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

import cubejs from '@cubejs-client/core';

const useStyles = makeStyles(styles);

const API_URL = "http://sed.enpa.vcl.minag.cu"; // change to your actual endpoint

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjUxODE0NjMsImV4cCI6MTU2NTI2Nzg2M30.r3FYOTFyahrqGyE_BWF0HXeXlrDP8YDtWhWTRtehU0I",
  { apiUrl: API_URL + "/cubejs-api/v1" }
);

export default function AdminNavbarLinks(props) {
  const classes = useStyles(props);

  const [provinciasSeleccionadas, setprovinciasSeleccionadas] = React.useState([]);
  const [municipiosSeleccionados, setmunicipiosSeleccionados] = React.useState([]);


  const [totalDeMunicipios, settotalDeMunicipios] = React.useState([]);
  const [totalDeProvincias, settotalDeProvincias] = React.useState([]);

  useEffect(

    () => {

      async function asyncrona() {

        const provincias = await cubejsApi.load({
          "measures": [],
          "timeDimensions": [],
          "dimensions": [
            "SymAgricUrbanaPoint.provincia"
          ],
          "filters": []
        })
        var auxp = []
        provincias["loadResponse"]["data"].map((prov) =>
          auxp.push(prov["SymAgricUrbanaPoint.provincia"])
        )
        await settotalDeProvincias(auxp);

        const municipios = await cubejsApi.load({
          "measures": [],
          "timeDimensions": [],
          "dimensions": [
            "SymAgricUrbanaPoint.municipio"
          ],
          "filters": []
        })
        var auxm = ['Todos']
        municipios["loadResponse"]["data"].map((mun) =>
          auxm.push(mun["SymAgricUrbanaPoint.municipio"])
        )
        await settotalDeMunicipios(auxm);

      }

      asyncrona();

    },

    [props]
  )

  const onOpen = event => {
    console.log(event)
    setmunicipiosSeleccionados(props.municipios);
  };

  const handleChangeP = async event => {
    setprovinciasSeleccionadas([event.target.value]);

    if (event.target.value.length) {
      await props.setMunicipios([event.target.value])
    } else {
      await props.setMunicipios(totalDeMunicipios)
    }
  };

  const handleChangeM = async event => {

    setmunicipiosSeleccionados([event.target.value]);

    if (event.target.value.length) {
      await props.setMunicipios([event.target.value])
    } else {
      await props.setMunicipios(totalDeMunicipios)
    }

  };

  return (
    <div>
      <div className={classes.manager}>

        <Select
          className={classes.select_link}
          IconComponent='VignetteIcon'
          value={provinciasSeleccionadas}
          onChange={handleChangeP}
          displayEmpty
          input={<Input id="select-multiple" style={{ lineHeight: '30px', fontWeight: 300, fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontSize: '16px', color: window.innerWidth > 959 ? "black" : "white", marginLeft: window.innerWidth > 959 ? "40px" : "none", marginBottom: window.innerWidth > 959 ? "20px" : "none", marginTop: window.innerWidth > 959 ? "10px" : "none" }} />}
          renderValue={() => {
            return <span><LocationOnIcon className={classes.icons} style={{ fontSize: 16, marginRight: window.innerWidth > 959 ? "10px" : "none" }} /> Provincia</span>;
          }}
        >
          <MenuItem value='' disabled className={classes.dropdownItem} >
            <LocationOnIcon className={classes.icons} style={{ fontSize: 16 }} /> Provincia
          </MenuItem>
          {totalDeProvincias.map(name => (
            <MenuItem key={name} value={name} className={classes.dropdownItem}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <Select
          className={classes.select_link}
          IconComponent='VignetteIcon'
          value={municipiosSeleccionados}
          //native={true}
          onChange={handleChangeM}
          onOpen={onOpen}
          displayEmpty
          input={<Input id="select-multiple1" style={{ lineHeight: '30px', fontWeight: 300, fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontSize: '16px', color: window.innerWidth > 959 ? "black" : "white", marginLeft: window.innerWidth > 959 ? "40px" : "none" }} />}
          renderValue={() => {
            return <span><LocationOnIcon className={classes.icons} style={{ fontSize: 16, marginRight: window.innerWidth > 959 ? "10px" : "none" }} /> Municipio</span>;
          }}
        >
          <MenuItem value='' disabled className={classes.dropdownItem}>
            <LocationOnIcon className={classes.icons} style={{ fontSize: 16 }} /> Municipio
          </MenuItem>
          {totalDeMunicipios.map(name => (
            name == 'Todos' ? <MenuItem key={name} value={provinciasSeleccionadas} className={classes.dropdownItem}>{name}</MenuItem>:<MenuItem key={name} value={name} className={classes.dropdownItem}>{name}</MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
