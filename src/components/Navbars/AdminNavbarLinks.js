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
import InfoIcon from '@material-ui/icons/Info';
import { message } from 'antd';

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
  const [check, setCheck] = React.useState(true);
  const [totalDeMunicipiosSoloMun, settotalDeMunicipiosSoloMun] = React.useState([]);
  const [inavilitarProvMun, setInavilitarProvMun] = React.useState(true);
  const [provinciaAntesDePais, setProvinciaAntesDePais] = React.useState([]);
  const [municipioAntesDePais, setMunicipioAntesDePais] = React.useState([]);

  const [itemSelecDropDownMun, setItemSelecDropDownMun] = React.useState("Todos");

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
        var auxm = ["Todos"]
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
    await props.setProvincias([event.target.value])
    await props.setLugarfiltrado([])
    await props.setLugarfiltrado(event.target.value)
  };

  const handleChangeM = async event => {

    if (event.target.value === "Todos") {
      setItemSelecDropDownMun("Todos")

      await props.setMunicipios(totalDeMunicipiosSoloMun)

      var provinciamunicipoio = []
      provinciamunicipoio.push(props.provincias)
      provinciamunicipoio.push("Todos")
      props.setLugarfiltrado(provinciamunicipoio)
    } else {
      setItemSelecDropDownMun(event.target.value)

      var aux = [];
      await aux.push(event.target["value"])
      await props.setMunicipios(aux)

      var provinciamunicipoio = []
      provinciamunicipoio.push(props.provincias)
      provinciamunicipoio.push(aux)
      props.setLugarfiltrado(provinciamunicipoio)
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
      const a = {
        content: <span style={{ fontSize: '20px' }}>Seleccione provincia y municipio para observar sus estadísticas.</span>,
        icon: <InfoIcon style={{ paddingBottom: 0, marginRight: '10px', color: props.color == 'purple' ? '#AB47BC' : props.color === "blue" ? '#26C6DA' : props.color === "green" ? '#66BB6A' : props.color === "orange" ? '#FFA726' : '#EF5350' }} />
      }
      message.info(a);
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

  return (
    <div>
      <div className={classes.manager}>
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
          value={itemSelecDropDownMun}
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
            <MenuItem key={name} value={name} className={classes.dropdownItem}>{name}</MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
