import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Cuba0 from 'assets/img/cuba0.png'
import Cuba1 from 'assets/img/cuba1.png'
import Cuba2 from 'assets/img/cuba2.png'
import Cuba3 from 'assets/img/cuba3.png'
import Cuba4 from 'assets/img/cuba4.png'
import Cuba5 from 'assets/img/cuba5.png'
import Cuba6 from 'assets/img/cuba6.png'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import IconButton from '@material-ui/core/IconButton';

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

import cubejs from '@cubejs-client/core';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from "prop-types";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import clsx from 'clsx';

const useStyles = makeStyles(styles);

const API_URL = "http://sed.enpa.vcl.minag.cu"; // change to your actual endpoint

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjUxODE0NjMsImV4cCI6MTU2NTI2Nzg2M30.r3FYOTFyahrqGyE_BWF0HXeXlrDP8YDtWhWTRtehU0I",
  { apiUrl: API_URL + "/cubejs-api/v1" }
);

const variantIcon = {
  warning: WarningIcon
};

const useStyles1 = makeStyles(theme => ({
  warning: {
    backgroundColor: '#ffa726',
  },
  info: {
    backgroundColor: '#26c6da',
  },
  success: {
    backgroundColor: '#66bb6a',
  },
  danger: {
    backgroundColor: '#ef5350',
  },
  primary: {
    backgroundColor: '#ab47bc',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon['warning'];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['warning,success,info,danger,primary']).isRequired,
};

export default function AdminNavbarLinks(props) {
  const classes = useStyles(props);

  const [totalDeMunicipios, settotalDeMunicipios] = React.useState([]);
  const [totalDeProvincias, settotalDeProvincias] = React.useState([]);
  const [check, setCheck] = React.useState(false);
  const [totalDeMunicipiosSoloMun, settotalDeMunicipiosSoloMun] = React.useState([]);
  const [inavilitarProvMun, setInavilitarProvMun] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [provinciaAntesDePais, setProvinciaAntesDePais] = React.useState([]);
  const [municipioAntesDePais, setMunicipioAntesDePais] = React.useState([]);

  useEffect(

    () => {

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
        await settotalDeProvincias(auxp);

        const municipios = await cubejsApi.load({
          "measures": [],
          "timeDimensions": [],
          "dimensions": [
            "EntidadAgricUrbana.municipio"
          ],
          "filters": [
            {
              "dimension": "EntidadAgricUrbana.provincia",
              "operator": "equals",
              "values": await props.provincias
            }
          ]
        })
        var auxm = ['Todos']
        municipios["loadResponse"]["data"].map((mun) => {
          auxm.push(mun["EntidadAgricUrbana.municipio"])
        }
        )
        await settotalDeMunicipios(auxm);

        const auxmSoloMunicipios = await cubejsApi.load({
          "measures": [],
          "timeDimensions": [],
          "dimensions": [
            "EntidadAgricUrbana.municipio"
          ],
          "filters": []
        })
        var auxmSoloMun = []
        auxmSoloMunicipios["loadResponse"]["data"].map((mun) => {
          auxmSoloMun.push(mun["EntidadAgricUrbana.municipio"])
        }
        )
        await settotalDeMunicipiosSoloMun(auxmSoloMun);






      }
      asyncrona();
    },
    [props]
  )

  const handleChangeP = async event => {
    var provinciamunicipoio = []
    provinciamunicipoio.push(props.lufarFiltrado)

    provinciamunicipoio.push(event.target.value)
    props.setLugarfiltrado(provinciamunicipoio)
    await props.setProvincias([event.target.value])
  };

  const handleChangeM = async event => {

    if (Array.isArray(event.target.value)) {
      // es un array
      await props.setMunicipios(event.target.value)

      var provinciamunicipoio = []
      provinciamunicipoio.push(props.provincias)
      provinciamunicipoio.push("Todos")
      props.setLugarfiltrado(provinciamunicipoio)
    } else if (typeof event.target.value === 'string') {
      // es un objeto regular que no es un array
      var aux = [];
      await aux.push(event.target["value"])
      await props.setMunicipios(aux)

      var provinciamunicipoio = []
      provinciamunicipoio.push(props.provincias)
      provinciamunicipoio.push(aux)
      props.setLugarfiltrado(provinciamunicipoio)
    } else {
      // puede ser undefined, string, number o boolean.
      console.log("nada sirvió // puede ser undefined, string, number o boolean.")
    }

  };

  const handleChange = () => {
    if (check) {
      setCheck(false)
      var provinciaYmunicipio = [];
      if (provinciaAntesDePais.length == 1 && municipioAntesDePais.length == 1) {
        props.setProvincias(provinciaAntesDePais)
        props.setMunicipios(municipioAntesDePais)
        provinciaYmunicipio.push(provinciaAntesDePais)
        provinciaYmunicipio.push(municipioAntesDePais)
      } else {
        props.setProvincias(totalDeProvincias)
        props.setMunicipios(totalDeMunicipiosSoloMun)
        provinciaYmunicipio.push("Cuba")
      }
      props.setLugarfiltrado(provinciaYmunicipio)
      setInavilitarProvMun(false)
      setOpen(true);
    } else {
      setCheck(true)
      //cuando se pone por pais
      setProvinciaAntesDePais(props.provincias)
      setMunicipioAntesDePais(props.municipios)
      props.setProvincias(totalDeProvincias)
      props.setMunicipios(totalDeMunicipiosSoloMun)
      props.setLugarfiltrado("Cuba")
      setInavilitarProvMun(true)
    }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <div>
      <div className={classes.manager}>
        <Snackbar
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <MySnackbarContentWrapper
            onClose={handleClose}
            variant={props.color == 'purple' ? 'primary' : props.color === "blue" ? 'info' : props.color === "green" ? 'success' : props.color === "orange" ? 'warning' : 'danger'}
            className={classes.margin}
            message="Seleccione provincia y municipio para observar sus estadísticas."
          />
        </Snackbar>
        <IconButton size='small' aria-label="add an alarm" onClick={handleChange} style={{ marginLeft: window.innerWidth > 959 ? "40px" : "none", marginBottom: window.innerWidth > 959 ? "20px" : "none", marginTop: window.innerWidth > 959 ? "10px" : "none", color: check ? props.color == 'purple' ? '#AB47BC' : props.color === "blue" ? '#26C6DA' : props.color === "green" ? '#66BB6A' : props.color === "orange" ? '#FFA726' : '#EF5350' : '#fff' }} >
          <img alt='País' title='País' src={check ? props.color == 'purple' ? Cuba2 : props.color === "blue" ? Cuba3 : props.color === "green" ? Cuba4 : props.color === "orange" ? Cuba6 : Cuba5 : window.innerWidth > 959 ? Cuba1 : Cuba0} />
        </IconButton>
        <Select
          disabled={inavilitarProvMun}
          className={classes.select_link}
          IconComponent='span'
          value={props.provincias}
          onChange={handleChangeP}
          displayEmpty
          input={<Input id="select-multiple" style={{ lineHeight: '30px', fontWeight: 300, fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontSize: '16px', color: window.innerWidth > 959 ? "black" : "white", marginLeft: window.innerWidth > 959 ? "40px" : "none", marginBottom: window.innerWidth > 959 ? "20px" : "none", marginTop: window.innerWidth > 959 ? "10px" : "none" }} />}
          renderValue={() => {
            return <span><LocationOnIcon className={classes.icons} style={{ fontSize: 16, marginRight: window.innerWidth > 959 ? "10px" : "none" }} /> Provincia</span>;
          }}
        >
          <MenuItem value='' disabled={true} className={classes.dropdownItem} >
            <LocationOnIcon className={classes.icons} style={{ fontSize: 16 }} /> Provincia
          </MenuItem>
          {totalDeProvincias.map(name => (
            <MenuItem key={name} value={name} className={classes.dropdownItem}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <Select
          disabled={inavilitarProvMun}
          className={classes.select_link}
          IconComponent='span'
          value={props.municipios}
          onChange={handleChangeM}
          displayEmpty
          input={<Input id="select-multiple1" style={{ lineHeight: '30px', fontWeight: 300, fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontSize: '16px', color: window.innerWidth > 959 ? "black" : "white", marginLeft: window.innerWidth > 959 ? "40px" : "none" }} />}
          renderValue={() => {
            return <span><LocationOnIcon className={classes.icons} style={{ fontSize: 16, marginRight: window.innerWidth > 959 ? "10px" : "none" }} /> Municipio</span>;
          }}
        >
          <MenuItem value='' disabled={true} className={classes.dropdownItem}>
            <LocationOnIcon className={classes.icons} style={{ fontSize: 16 }} /> Municipio
          </MenuItem>
          {totalDeMunicipios.map(name => (
            name == 'Todos' ? <MenuItem key={name} value={totalDeMunicipiosSoloMun} className={classes.dropdownItem}>{name}</MenuItem> : <MenuItem key={name} value={name} className={classes.dropdownItem}>{name}</MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
