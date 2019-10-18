import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';
import Cuba0 from 'assets/img/cuba0.png'
import Cuba1 from 'assets/img/cuba1.png'
import Cuba2 from 'assets/img/cuba2.png'
import Cuba3 from 'assets/img/cuba3.png'
import Cuba4 from 'assets/img/cuba4.png'
import Cuba5 from 'assets/img/cuba5.png'
import Cuba6 from 'assets/img/cuba6.png'
import LocationOnIcon from '@material-ui/icons/LocationOn';

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

  const [totalDeMunicipios, settotalDeMunicipios] = React.useState([]);
  const [totalDeProvincias, settotalDeProvincias] = React.useState([]);
  const [stateSwitch, setStateSwitch] = React.useState(true);
  const [totalDeMunicipiosSoloMun, settotalDeMunicipiosSoloMun] = React.useState([]);
  const [inavilitarProvMun, setInavilitarProvMun] = React.useState(true);

  const [provinciaAntesDePais, setProvinciaAntesDePais] = React.useState(props.provincias);
  const [municipioAntesDePais, setMunicipioAntesDePais] = React.useState(props.municipios);

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
        var auxmSoloMunicipios = []
        municipios["loadResponse"]["data"].map((mun) => {
          auxm.push(mun["EntidadAgricUrbana.municipio"])
          auxmSoloMunicipios.push(mun["EntidadAgricUrbana.municipio"])
        }
        )
        await settotalDeMunicipios(auxm);
        await settotalDeMunicipiosSoloMun(auxmSoloMunicipios);

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

  const handleChange = event => {
    if (stateSwitch) {
      setStateSwitch(false);
    } else {
      setStateSwitch(true);
    }


    if (stateSwitch) {
      console.log(stateSwitch)

      //cuando se pone por pais
      setProvinciaAntesDePais(props.provincias)
      setMunicipioAntesDePais(props.municipios)
      props.setProvincias(totalDeProvincias)
      props.setMunicipios(totalDeMunicipios)
      props.setLugarfiltrado("País")
      setInavilitarProvMun(stateSwitch)
    } else {
      console.log(stateSwitch)

      props.setProvincias(provinciaAntesDePais)
      props.setMunicipios(municipioAntesDePais)
      var provinciaYmunicipio = [];
      provinciaYmunicipio.push(provinciaAntesDePais)
      provinciaYmunicipio.push(municipioAntesDePais)
      props.setLugarfiltrado(provinciaYmunicipio)
      setInavilitarProvMun(stateSwitch)
    }
  };

  return (
    <div>
      <div className={classes.manager}>
        <img alt='País' title='País' src={stateSwitch ? props.color == 'purple' ? Cuba2 : props.color === "blue" ? Cuba3 : props.color === "green" ? Cuba4 : props.color === "orange" ? Cuba6 : Cuba5 : window.innerWidth > 959 ? Cuba1 : Cuba0} style={{ marginLeft: window.innerWidth > 959 ? "40px" : "none", marginBottom: window.innerWidth > 959 ? "20px" : "none", marginTop: window.innerWidth > 959 ? "10px" : "none" }} />
        <Switch
          defaultChecked
          checked={stateSwitch}
          onChange={handleChange}
          //value="checked"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          color='default'
          style={{ color: stateSwitch ? props.color == 'purple' ? '#AB47BC' : props.color === "blue" ? '#26C6DA' : props.color === "green" ? '#66BB6A' : props.color === "orange" ? '#FFA726' : '#EF5350' : '#fff' }}
        />
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
