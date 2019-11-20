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
  //const [check, setCheck] = React.useState(true);
  const [totalDeMunicipiosSoloMun, settotalDeMunicipiosSoloMun] = React.useState([]);

  // const [inavilitarProvMun, setInavilitarProvMun] = React.useState(true);
  // const [provinciaAntesDePais, setProvinciaAntesDePais] = React.useState([]);
  // const [municipioAntesDePais, setMunicipioAntesDePais] = React.useState([]);
  // const [itemSelecDropDownMun, setItemSelecDropDownMun] = React.useState("Todos");

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

        settotalDeProvincias(auxp);
        //await settotalDeProvincias(auxp);


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
        settotalDeMunicipiosSoloMun(auxmSoloMun);
        //await settotalDeMunicipiosSoloMun(auxmSoloMun);

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
              "values": props.provincias
              //"values": await props.provincias
            }
          ]
        })
        var auxm = ["Todos"]
        municipios["loadResponse"]["data"].map((mun) => {
          auxm.push(mun["EntidadAgricUrbana.municipio"])
        }
        )
        settotalDeMunicipios(auxm);
        //await settotalDeMunicipios(auxm);
      }
      asyncrona();
    },
    [props]
  )

  const handleChangeP = async event => {
    props.setLoading(true)
    props.setReiniciarPuntos(false)
    props.setProvincias([event.target.value])
    props.setMunicipios(totalDeMunicipiosSoloMun)
    // await props.setProvincias([event.target.value])
    // await props.setMunicipios(totalDeMunicipiosSoloMun)
    props.setItemSelecDropDownMun("Todos")

    var provinciamunicipoio = []
    provinciamunicipoio.push(event.target.value + ".")
    provinciamunicipoio.push("Todos")
    props.setLugarfiltrado(provinciamunicipoio)
    //await props.setLugarfiltrado(provinciamunicipoio)
  };

  const handleChangeM = async event => {
    props.setLoading(true)
    props.setReiniciarPuntos(false)
    if (event.target.value === "Todos") {
      props.setItemSelecDropDownMun("Todos")

      //await props.setMunicipios(totalDeMunicipiosSoloMun)
      props.setMunicipios(totalDeMunicipiosSoloMun)

      var provinciamunicipoio = []
      provinciamunicipoio.push(props.provincias + ".")
      provinciamunicipoio.push("Todos")
      props.setLugarfiltrado(provinciamunicipoio)
    } else {
      props.setItemSelecDropDownMun(event.target.value)

      var aux = [];
      // await aux.push(event.target["value"])
      // await props.setMunicipios(aux)
      aux.push(event.target["value"])
      props.setMunicipios(aux)

      var provinciamunicipoio = []
      provinciamunicipoio.push(props.provincias + ".")
      provinciamunicipoio.push(aux)
      props.setLugarfiltrado(provinciamunicipoio)
    }

  };

  const handleChange = () => {
    props.setLoading(true)
    if (props.check) {
      props.setCheck(false)
      var provinciaYmunicipio = [];
      if ((props.provinciaAntesDePais.length == 1 && props.municipioAntesDePais.length == 1) || (props.provinciaAntesDePais.length == 1 && props.municipioAntesDePais.length > 1)) {
        props.setReiniciarPuntos(false)
        props.setProvincias(props.provinciaAntesDePais)
        props.setMunicipios(props.municipioAntesDePais)
        if (props.municipioAntesDePais.length > 1) {
          provinciaYmunicipio.push(props.provinciaAntesDePais + ".")
          provinciaYmunicipio.push("Todos")
        } else {
          provinciaYmunicipio.push(props.provinciaAntesDePais + ".")
          provinciaYmunicipio.push(props.municipioAntesDePais)
        }
      } else {
        props.setProvincias(totalDeProvincias)
        props.setMunicipios(totalDeMunicipiosSoloMun)
        provinciaYmunicipio.push("Cuba")
      }
      props.setLugarfiltrado(provinciaYmunicipio)
      props.setInavilitarProvMun(false)
      const a = {
        content: <span style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}><InfoIcon style={{ fontSize: 20, opacity: 0.9, marginRight: '10px', color: props.color == 'purple' ? '#AB47BC' : props.color === "blue" ? '#26C6DA' : props.color === "green" ? '#66BB6A' : props.color === "orange" ? '#FFA726' : '#EF5350' }} /> Seleccione provincia y municipio para observar sus estadísticas.</span>
      }
      message.open(a);
    } else {
      props.setReiniciarPuntos(false)
      props.setCheck(true)
      props.setProvinciaAntesDePais(props.provincias)
      props.setMunicipioAntesDePais(props.municipios)
      props.setProvincias(totalDeProvincias)
      props.setMunicipios(totalDeMunicipiosSoloMun)
      props.setLugarfiltrado("Cuba")
      props.setInavilitarProvMun(true)
    }
  };

  return (
    <div>
      <div className={classes.manager}>
        <IconButton size='small' aria-label="add an alarm" onClick={handleChange} style={{ marginLeft: "40px", marginRight: "40px", marginBottom: "20px", marginTop: "10px", color: props.check ? props.color == 'purple' ? '#AB47BC' : props.color === "blue" ? '#26C6DA' : props.color === "green" ? '#66BB6A' : props.color === "orange" ? '#FFA726' : '#EF5350' : '#fff' }} >
          <img alt='País' title='País' src={props.check ? props.color == 'purple' ? Cuba2 : props.color === "blue" ? Cuba3 : props.color === "green" ? Cuba4 : props.color === "orange" ? Cuba6 : Cuba5 : !props.colorItem ? Cuba1 : Cuba0} />&nbsp; {!props.colorItem ? '' : 'País'}
        </IconButton>
        <Select
          disabled={props.inavilitarProvMun}
          className={classes.select_link}
          IconComponent='span'
          value={props.provincias}
          onChange={handleChangeP}
          displayEmpty
          input={<Input id="select-multiple" style={{ lineHeight: '30px', fontWeight: 300, fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontSize: '16px', color: !props.colorItem ? "black" : "white", marginLeft: "40px", marginBottom: "20px", marginTop: "10px" }} />}
          renderValue={() => {
            return <span style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}><LocationOnIcon className={classes.icons} style={{ fontSize: 20, opacity: 0.9, marginRight: '5px' }} /> Provincia</span>;
          }}
        >
          <MenuItem value='' disabled={true} className={classes.dropdownItem} >
            <span style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}><LocationOnIcon className={classes.icons} style={{ fontSize: 20, opacity: 0.9, marginRight: '5px' }} /> Provincia</span>
          </MenuItem>
          {totalDeProvincias.map(name => (
            <MenuItem key={name} value={name} className={classes.dropdownItem}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <Select
          disabled={props.inavilitarProvMun}
          className={classes.select_link}
          IconComponent='span'
          value={props.itemSelecDropDownMun}
          onChange={handleChangeM}
          displayEmpty
          input={<Input id="select-multiple1" style={{ lineHeight: '30px', fontWeight: 300, fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontSize: '16px', color: !props.colorItem ? "black" : "white", marginLeft: "40px" }} />}
          renderValue={() => {
            return <span style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}><LocationOnIcon className={classes.icons} style={{ fontSize: 20, opacity: 0.9, marginRight: '5px' }} /> Municipio</span>;
          }}
        >
          <MenuItem value='' disabled={true} className={classes.dropdownItem}>
            <span style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}><LocationOnIcon className={classes.icons} style={{ fontSize: 20, opacity: 0.9, marginRight: '5px' }} /> Municipio</span>
          </MenuItem>
          {totalDeMunicipios.map(name => (
            <MenuItem key={name} value={name} className={classes.dropdownItem}>{name}</MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
