import React, { useEffect } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Verduras from "assets/img/verduras.png";
import Siembra from "assets/img/siembra.png";
import Aspersor from "assets/img/aspersor.png";
import Campo from "assets/img/campo.png";
import Invernadero from "assets/img/invernadero.png";
import Materia from "assets/img/materia.png";
import Card1Dash from "variables/card1Dashboard.js";
import Card2Dash from "variables/card2Dashboard.js";
import Card3Dash from "variables/card3Dashboard.js";
import Card1Dashp from "variables/card1DashboardProv.js";
import Card2Dashp from "variables/card2DashboardProv.js";
import Card3Dashp from "variables/card3DashboardProv.js";
import Card4Dashp from "variables/card4DashboardProv.js";
import Card5Dashp from "variables/card5DashboardProv.js";
import Card1Dashpais from "variables/card1DashboardPais";
import Card2Dashpais from "variables/card2DashboardPais.js";
import Card3Dashpais from "variables/card3DashboardPais.js";
import Card4Dashpais from "variables/card4DashboardPais.js";
import Card5Dashpais from "variables/card5DashboardPais.js";
import Card4Dash from "variables/card4Dashboard.js";
import TablaTotalPorTecnolog from "variables/tablaTotalPorTecnolog/index.js";
import TimelineIcon from '@material-ui/icons/Timeline';
import TableChartIcon from '@material-ui/icons/TableChartOutlined';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';
import Map1 from 'variables/maps.js';
import { Spin } from 'antd';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import CardBody from "components/Card/CardBody.js";
import LanguageIcon from '@material-ui/icons/Language';
import cubejs from '@cubejs-client/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DonutSmallRoundedIcon from '@material-ui/icons/DonutSmallRounded';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(styles);

const API_URL = "http://sed.enpa.vcl.minag.cu"; // change to your actual endpoint

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjUxODE0NjMsImV4cCI6MTU2NTI2Nzg2M30.r3FYOTFyahrqGyE_BWF0HXeXlrDP8YDtWhWTRtehU0I",
  { apiUrl: API_URL + "/cubejs-api/v1" }
);
export default function Dashboard(props) {
  const classes = useStyles();

  const [organoponico, setOrganoponico] = React.useState([]);
  const [semiprotegido, setSemiprotegido] = React.useState([]);
  const [centrodeMateriaOrganica, setcentrodeMateriaOrganica] = React.useState([]);
  const [huerto, setHuerto] = React.useState([]);
  const [parcela, setParcela] = React.useState([]);
  const [finca, setFinca] = React.useState([]);
  const [loading0, setLoading0] = React.useState(true);
  const [loading1, setLoading1] = React.useState(true);
  const [loading2, setLoading2] = React.useState(true);
  const [loading3, setLoading3] = React.useState(true);
  const [loading4, setLoading4] = React.useState(true);
  const [loading5, setLoading5] = React.useState(true);
  const [selectedKeys, setSelectedKeys] = React.useState([]);


  useEffect(

    () => {
      async function asyncrona() {
        const organoponicos = await cubejsApi.load({
          "measures": ["EntidadAgricUrbana.count"],
          "timeDimensions": [],
          "dimensions": [
            "EntidadAgricUrbana.tecnologia"
            //"EntidadAgricUrbana.municipio"
          ],
          "filters": [
            {
              "dimension": "EntidadAgricUrbana.tecnologia",
              "operator": "equals",
              "values": [
                "Organoponico",
                "Huerto",
                "Parcela",
                "Finca",
                "Semiprotegido",
                "Centro de abono orgánico",
              ]
            },
            {
              "dimension": "EntidadAgricUrbana.provincia",
              "operator": "equals",
              "values": await props.provincias
            },
            {
              "dimension": "EntidadAgricUrbana.municipio",
              "operator": "equals",
              "values": props.municipios
            }
          ]
        })
        //var auxo = organoponicos["loadResponse"]["data"][0]["EntidadAgricUrbana.count"]
        //await setOrganoponico(auxo);
        //setLoading(false);
        // setHuerto(0);
        // setOrganoponico(0);
        // setParcela(0);
        // setFinca(0);
        // setSemiprotegido(0);
        // setcentrodeMateriaOrganica(0);

        var auxo = organoponicos["loadResponse"]["data"]
        //console.log(auxo)
        var aa = [];
        auxo.map((item, i) => {
          switch (item['EntidadAgricUrbana.tecnologia']) {
            case 'Huerto':
              setHuerto(item['EntidadAgricUrbana.count']);
              aa.push('Huerto');
              setLoading3(false);
              break;

            case 'Parcela':
              setParcela(item['EntidadAgricUrbana.count']);
              aa.push('Parcela');
              setLoading4(false);
              break;

            case 'Organoponico':
              setOrganoponico(item['EntidadAgricUrbana.count']);
              aa.push('Organoponico');
              setLoading0(false);
              break;

            case 'Finca':
              setFinca(item['EntidadAgricUrbana.count']);
              aa.push('Finca');
              setLoading5(false);
              break;

            case 'Semiprotegido':
              setSemiprotegido(item['EntidadAgricUrbana.count']);
              aa.push('Semiprotegido');
              setLoading1(false);
              break;

            default:
              setcentrodeMateriaOrganica(item['EntidadAgricUrbana.count']);
              aa.push('Centro de abono orgánico');
              setLoading2(false);
              break;
          }
        });
        if (!aa.includes('Huerto')) {
          setHuerto(0);
        }
        if (!aa.includes('Organoponico')) {
          setOrganoponico(0);
        }
        if (!aa.includes('Parcela')) {
          setParcela(0);
        }
        if (!aa.includes('Finca')) {
          setFinca(0);
        }
        if (!aa.includes('Semiprotegido')) {
          setSemiprotegido(0);
        }
        if (!aa.includes('Centro de abono orgánico')) {
          setcentrodeMateriaOrganica(0);
        }
        // const semiprotegidos = await cubejsApi.load({
        //   "measures": ["EntidadAgricUrbana.count"],
        //   "timeDimensions": [],
        //   "dimensions": [
        //     //"EntidadAgricUrbana.municipio"
        //   ],
        //   "filters": [
        //     {
        //       "dimension": "EntidadAgricUrbana.tecnologia",
        //       "operator": "equals",
        //       "values": [
        //         "Semiprotegido"
        //       ]
        //     },
        //     {
        //       "dimension": "EntidadAgricUrbana.provincia",
        //       "operator": "equals",
        //       "values": await props.provincias
        //     },
        //     {
        //       "dimension": "EntidadAgricUrbana.municipio",
        //       "operator": "equals",
        //       "values": props.municipios
        //     }
        //   ]
        // })
        // var auxs = semiprotegidos["loadResponse"]["data"][0]["EntidadAgricUrbana.count"]
        // await setSemiprotegido(auxs);
        // setLoading(false);

        // const centrodeMateriaOrganica = await cubejsApi.load({
        //   "measures": ["EntidadAgricUrbana.count"],
        //   "timeDimensions": [],
        //   "dimensions": [
        //     //"EntidadAgricUrbana.municipio"
        //   ],
        //   "filters": [
        //     {
        //       "dimension": "EntidadAgricUrbana.tecnologia",
        //       "operator": "equals",
        //       "values": [
        //         "Centro de abono orgánico"
        //       ]
        //     },
        //     {
        //       "dimension": "EntidadAgricUrbana.provincia",
        //       "operator": "equals",
        //       "values": await props.provincias
        //     },
        //     {
        //       "dimension": "EntidadAgricUrbana.municipio",
        //       "operator": "equals",
        //       "values": props.municipios
        //     }
        //   ]
        // })
        // var auxc = centrodeMateriaOrganica["loadResponse"]["data"][0]["EntidadAgricUrbana.count"]
        // await setcentrodeMateriaOrganica(auxc);
        // setLoading(false);

        // const huertos = await cubejsApi.load({
        //   "measures": ["EntidadAgricUrbana.count"],
        //   "timeDimensions": [],
        //   "dimensions": [],
        //   "filters": [
        //     {
        //       "dimension": "EntidadAgricUrbana.tecnologia",
        //       "operator": "equals",
        //       "values": [
        //         "Huerto"
        //       ]
        //     },
        //     {
        //       "dimension": "EntidadAgricUrbana.provincia",
        //       "operator": "equals",
        //       "values": await props.provincias
        //     },
        //     {
        //       "dimension": "EntidadAgricUrbana.municipio",
        //       "operator": "equals",
        //       "values": props.municipios
        //     }
        //   ]
        // })
        // var auxh = huertos["loadResponse"]["data"][0]["EntidadAgricUrbana.count"]
        // await setHuerto(auxh);
        // setLoading1(false);

        // const parcelas = await cubejsApi.load({
        //   "measures": ["EntidadAgricUrbana.count"],
        //   "timeDimensions": [],
        //   "dimensions": [],
        //   "filters": [
        //     {
        //       "dimension": "EntidadAgricUrbana.tecnologia",
        //       "operator": "equals",
        //       "values": [
        //         "Parcela"
        //       ]
        //     },
        //     {
        //       "dimension": "EntidadAgricUrbana.provincia",
        //       "operator": "equals",
        //       "values": await props.provincias
        //     },
        //     {
        //       "dimension": "EntidadAgricUrbana.municipio",
        //       "operator": "equals",
        //       "values": props.municipios
        //     }
        //   ]
        // })
        // var auxp = parcelas["loadResponse"]["data"][0]["EntidadAgricUrbana.count"]
        // await setParcela(auxp);
        // setLoading2(false);

        // const fincas = await cubejsApi.load({
        //   "measures": ["EntidadAgricUrbana.count"],
        //   "timeDimensions": [],
        //   "dimensions": [],
        //   "filters": [
        //     {
        //       "dimension": "EntidadAgricUrbana.tecnologia",
        //       "operator": "equals",
        //       "values": [
        //         "Finca"
        //       ]
        //     },
        //     {
        //       "dimension": "EntidadAgricUrbana.provincia",
        //       "operator": "equals",
        //       "values": await props.provincias
        //     },
        //     {
        //       "dimension": "EntidadAgricUrbana.municipio",
        //       "operator": "equals",
        //       "values": props.municipios
        //     }
        //   ]
        // })
        // var auxf = fincas["loadResponse"]["data"][0]["EntidadAgricUrbana.count"]
        // await setFinca(auxf);
        // setLoading3(false);
      }
      asyncrona();
    },
    [props]
  )

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card>
            <CardHeader color="info" className='infoTitle'>
              <h2 style={{ textAlign: 'center', color: '#fff' }}>Estadísticas de Agricultura Urbana y Suburbana</h2>
            </CardHeader>
            <CardBody>
              {props.lugarfiltrado == 'Cuba' ?
                (<Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <h4 style={{ color: '#26c6da', fontSize: '20px', fontWeight: 400, marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LocationOnIcon className={classes.icons} style={{ fontSize: 20, opacity: 0.9, marginRight: '5px' }} /> {props.lugarfiltrado}</h4>
                  </Grid>
                </Grid>) : (props.lugarfiltrado.toString().includes('Todos')) ?
                  (<Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <h4 style={{ color: '#26c6da', fontSize: '20px', fontWeight: 400, marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LocationOnIcon className={classes.icons} style={{ fontSize: 20, opacity: 0.9, marginRight: '5px' }} /> {props.lugarfiltrado.toString().split(".")[0]}</h4>
                    </Grid>
                  </Grid>) :
                  (<Grid container spacing={10}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <h4 style={{ color: '#26c6da', fontSize: '20px', fontWeight: 400, marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}><LocationOnIcon className={classes.icons} style={{ fontSize: 20, opacity: 0.9, marginRight: '5px' }} /> {props.lugarfiltrado.toString().split(".")[0]}</h4>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <h4 style={{ color: '#26c6da', fontSize: '20px', fontWeight: 400, marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}><LocationOnIcon className={classes.icons} style={{ fontSize: 20, opacity: 0.9, marginRight: '5px' }} /> {props.lugarfiltrado.toString().split(".")[1].substring(1)}</h4>
                    </Grid>
                  </Grid>)}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6} lg={4} xl={2}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <img src={Siembra} alt="Organopónicos" />
              </CardIcon>
              <p className={classes.cardCategory}>Cantidad Total</p>
              {loading0 ? <Spin size='small' /> : <h3 className={classes.cardTitle}>{organoponico}</h3>}
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                Organopónicos
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={4} xl={2}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <img src={Invernadero} alt="Semiprotegidos" />
              </CardIcon>
              <p className={classes.cardCategory}>Cantidad Total</p>
              {loading1 ? <Spin size='small' /> : <h3 className={classes.cardTitle}>{semiprotegido}</h3>}
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                Semiprotegidos
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={4} xl={2}>
          <Card>
            <CardHeader color="rose" stats icon>
              <CardIcon color="rose">
                <img src={Materia} alt="Centro de Materia Orgánica" />
              </CardIcon>
              <p className={classes.cardCategory}>Cantidad Total</p>
              {loading2 ? <Spin size='small' /> : <h3 className={classes.cardTitle}>{centrodeMateriaOrganica}</h3>}
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                Ctro Materia Orgánica
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={4} xl={2}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <img src={Verduras} alt="Huertos" />
              </CardIcon>
              <p className={classes.cardCategory}>Cantidad Total</p>
              {loading3 ? <Spin size='small' /> : <h3 className={classes.cardTitle}>{huerto}</h3>}
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                Huertos
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={4} xl={2}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <img src={Aspersor} alt="Parcelas" />
              </CardIcon>
              <p className={classes.cardCategory}>Cantidad Total</p>
              {loading4 ? <Spin size='small' /> : <h3 className={classes.cardTitle}>{parcela}</h3>}
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                Parcelas
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={4} xl={2}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <img src={Campo} alt="Fincas" />
              </CardIcon>
              <p className={classes.cardCategory}>Cantidad Total</p>
              {loading5 ? <Spin size='small' /> : <h3 className={classes.cardTitle}>{finca}</h3>}
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                Fincas
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>                      {/*aki otro contenedor de graficos */}
        <GridItem xs={12} sm={12} md={12} lg={12} xl={4}>
          <Card chart>
            <CardHeader color="success">
              {props.lugarfiltrado == 'Cuba' ? <Card1Dashpais municipios={props.municipios} /> : props.municipios.length == 1 ? <Card1Dash provincias={props.provincias} municipios={props.municipios} /> : <Card1Dashp provincias={props.provincias} municipios={props.municipios} />}
            </CardHeader>
            <CardBody>
              <div className={classes.stats}>
                <BarChartOutlinedIcon /> {props.lugarfiltrado == 'Cuba' ? 'Cantidad Por Provincia' : props.municipios.length == 1 ? 'Cantidad Por Tecnologías' : 'Cantidad Por Municipios'}
              </div>
            </CardBody>
            <CardFooter chart>
              <p className={classes.cardCategory}>
                Detalles >>
              </p>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={6} xl={4}>
          <Card chart>
            <CardHeader color="warning">
              {props.lugarfiltrado == 'Cuba' ? <Card2Dashpais municipios={props.municipios} /> : props.municipios.length == 1 ? <Card2Dash provincias={props.provincias} municipios={props.municipios} /> : <Card2Dashp provincias={props.provincias} municipios={props.municipios} />}
            </CardHeader>
            <CardBody>
              <div className={classes.stats}>
                <TimelineIcon /> {props.lugarfiltrado == 'Cuba' ? 'Cantidad Por Tecnologías' : props.municipios.length == 1 ? 'Área Total Por Ministerios' : 'Cantidad Por Tecnologías'}
              </div>
            </CardBody>
            <CardFooter chart>
              <p className={classes.cardCategory}>
                Detalles >>
              </p>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={6} xl={4}>
          <Card chart>
            <CardHeader color="danger">
              {props.lugarfiltrado == 'Cuba' ? <Card3Dashpais municipios={props.municipios} /> : props.municipios.length == 1 ? <Card3Dash provincias={props.provincias} municipios={props.municipios} /> : <Card3Dashp provincias={props.provincias} municipios={props.municipios} />}
            </CardHeader>
            <CardBody>
              <div className={classes.stats}>
                <BarChartOutlinedIcon />  {props.lugarfiltrado == 'Cuba' ? 'Área Total Por Tecnologías' : props.municipios.length == 1 ? 'Cantidad Por Empresas' : 'Área Total Por Tecnologías'}
              </div>
            </CardBody>
            <CardFooter chart>
              <p className={classes.cardCategory}>
                Detalles >>
              </p>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      {props.municipios.length == 1 ? '' : (
        <GridContainer>
          <GridItem xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card chart>
              <CardHeader color="white">
                {props.lugarfiltrado == 'Cuba' ? <Card4Dashpais municipios={props.municipios} /> : <Card4Dashp provincias={props.provincias} municipios={props.municipios} />}
              </CardHeader>
              <CardBody>
                <div className={classes.stats}>
                  <DonutSmallRoundedIcon />  {props.lugarfiltrado == 'Cuba' ? 'Área en Uso Por Provincias' : 'Área en Uso Por Municipios'}
                </div>
              </CardBody>
              <CardFooter chart>
                <p className={classes.cardCategory}>
                  Detalles >>
              </p>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card chart>
              <CardHeader color="rose">
                {props.lugarfiltrado == 'Cuba' ? <Card5Dashpais municipios={props.municipios} /> : <Card5Dashp provincias={props.provincias} municipios={props.municipios} />}
              </CardHeader>
              <CardBody>
                <div className={classes.stats}>
                  <BarChartOutlinedIcon />  {props.lugarfiltrado == 'Cuba' ? 'Área en Uso Por Tecnologías' : 'Área en Uso Por Tecnologías'}
                </div>
              </CardBody>
              <CardFooter chart>
                <p className={classes.cardCategory}>
                  Detalles >>
              </p>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      )}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card >
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <LanguageIcon />
              </CardIcon>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} lg={12} xl={6}>
                  <TablaTotalPorTecnolog provincias={props.provincias} municipios={props.municipios} setSelectedKeys={setSelectedKeys} reiniciarPuntos={props.reiniciarPuntos} setReiniciarPuntos={props.setReiniciarPuntos} />
                </GridItem>
                <GridItem xs={12} sm={12} md={12} lg={12} xl={6}>
                  <Map1 selectedKeys1={selectedKeys} reiniciarPuntos={props.reiniciarPuntos} setReiniciarPuntos={props.setReiniciarPuntos} />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "Área Total y Cantidad",
                tabIcon: TimelineIcon,
                tabContent: (
                  <Card4Dash municipios={props.municipios} />
                )
              },
              {
                tabName: "Tecnologías",
                tabIcon: TableChartIcon,
                tabContent: (
                  <TablaTotalPorTecnolog municipios={props.municipios} />
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer> */}
    </div>
  );
}
