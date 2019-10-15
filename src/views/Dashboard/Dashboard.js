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
import Card1Dash from "variables/card1Dashboard.js";
import Card2Dash from "variables/card2Dashboard.js";
import Card3Dash from "variables/card3Dashboard.js";
import Card4Dash from "variables/card4Dashboard.js";
import TablaTotalPorMinist from "variables/tablaTotalPorMinist/index.js";
import TablaTotalPorTecnolog from "variables/tablaTotalPorTecnolog/index.js";
import TimelineIcon from '@material-ui/icons/Timeline';
import TableChartIcon from '@material-ui/icons/TableChartOutlined';
import ShowChartRoundedIcon from '@material-ui/icons/ShowChartRounded';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';
import Map1 from 'variables/maps.js';
import { Spin } from 'antd';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import CardBody from "components/Card/CardBody.js";
import LanguageIcon from '@material-ui/icons/Language';
import cubejs from '@cubejs-client/core';

const useStyles = makeStyles(styles);

const API_URL = "http://sed.enpa.vcl.minag.cu"; // change to your actual endpoint

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjUxODE0NjMsImV4cCI6MTU2NTI2Nzg2M30.r3FYOTFyahrqGyE_BWF0HXeXlrDP8YDtWhWTRtehU0I",
  { apiUrl: API_URL + "/cubejs-api/v1" }
);

export default function Dashboard(props) {

  //console.log(props.municipios)


  const classes = useStyles();

  const [organoponico, setOrganoponico] = React.useState([]);
  const [huerto, setHuerto] = React.useState([]);
  const [parcela, setParcela] = React.useState([]);
  const [finca, setFinca] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loading1, setLoading1] = React.useState(true);
  const [loading2, setLoading2] = React.useState(true);
  const [loading3, setLoading3] = React.useState(true);



  useEffect(

    () => {

      async function asyncrona() {
        const organoponicos = await cubejsApi.load({
          "measures": ["SymAgricUrbanaPoint.count"],
          "timeDimensions": [],
          "dimensions": [
            //"SymAgricUrbanaPoint.municipio"
          ],
          "filters": [
            {
              "dimension": "SymAgricUrbanaPoint.tecnologia",
              "operator": "equals",
              "values": [
                "organoponico"
              ]
            },
            {
              "dimension": "SymAgricUrbanaPoint.municipio",
              "operator": "equals",
              "values": props.municipios
            }
          ]
        })
        var auxo = organoponicos["loadResponse"]["data"][0]["SymAgricUrbanaPoint.count"]
        await setOrganoponico(auxo);
        setLoading(false);

        const huertos = await cubejsApi.load({
          "measures": ["SymAgricUrbanaPoint.count"],
          "timeDimensions": [],
          "dimensions": [],
          "filters": [
            {
              "dimension": "SymAgricUrbanaPoint.tecnologia",
              "operator": "equals",
              "values": [
                "Huerto"
              ]
            },
            {
              "dimension": "SymAgricUrbanaPoint.municipio",
              "operator": "equals",
              "values": props.municipios
            }
          ]
        })
        var auxh = huertos["loadResponse"]["data"][0]["SymAgricUrbanaPoint.count"]
        await setHuerto(auxh);
        setLoading1(false);

        const parcelas = await cubejsApi.load({
          "measures": ["SymAgricUrbanaPoint.count"],
          "timeDimensions": [],
          "dimensions": [],
          "filters": [
            {
              "dimension": "SymAgricUrbanaPoint.tecnologia",
              "operator": "equals",
              "values": [
                "Parcela"
              ]
            },
            {
              "dimension": "SymAgricUrbanaPoint.municipio",
              "operator": "equals",
              "values": props.municipios
            }
          ]
        })
        var auxp = parcelas["loadResponse"]["data"][0]["SymAgricUrbanaPoint.count"]
        await setParcela(auxp);
        setLoading2(false);

        const fincas = await cubejsApi.load({
          "measures": ["SymAgricUrbanaPoint.count"],
          "timeDimensions": [],
          "dimensions": [],
          "filters": [
            {
              "dimension": "SymAgricUrbanaPoint.tecnologia",
              "operator": "equals",
              "values": [
                "Finca"
              ]
            },
            {
              "dimension": "SymAgricUrbanaPoint.municipio",
              "operator": "equals",
              "values": props.municipios
            }
          ]
        })
        var auxf = fincas["loadResponse"]["data"][0]["SymAgricUrbanaPoint.count"]
        await setFinca(auxf);
        setLoading3(false);
      }
      asyncrona();
    },
    [props]
  )

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card >
            <CardHeader color="info">
              <h2 style={{ textAlign: 'center', color: '#fff' }}>Estadísticas de Agricultura Urbana y Suburbana</h2>
            </CardHeader>
            <CardFooter chart>
              {props.lugarfiltrado}
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <img src={Siembra} className={classes.imgIconCard} alt="Organopónicos" />
              </CardIcon>
              <p className={classes.cardCategory}>Cantidad Total</p>
              {loading ? <Spin size='small' /> : <h3 className={classes.cardTitle}>{organoponico}</h3>}
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                Organopónicos
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <img src={Verduras} className={classes.imgIconCard} alt="Huertos" />
              </CardIcon>
              <p className={classes.cardCategory}>Cantidad Total</p>
              {loading1 ? <Spin size='small' /> : <h3 className={classes.cardTitle}>{huerto}</h3>}
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                Huertos
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <img src={Aspersor} className={classes.imgIconCard} alt="Parcelas" />
              </CardIcon>
              <p className={classes.cardCategory}>Cantidad Total</p>
              {loading2 ? <Spin size='small' /> : <h3 className={classes.cardTitle}>{parcela}</h3>}
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                Parcelas
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <img src={Campo} className={classes.imgIconCard} alt="Fincas" />
              </CardIcon>
              <p className={classes.cardCategory}>Cantidad Total</p>
              {loading3 ? <Spin size='small' /> : <h3 className={classes.cardTitle}>{finca}</h3>}
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
        <GridItem xs={12} sm={12} md={4}>
          <Card >
            <CardHeader color="success">
              <Card1Dash municipios={props.municipios} />
            </CardHeader>
            <CardFooter chart>
              <div className={classes.stats}>
                <ShowChartRoundedIcon /> Por Tecnologías
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <Card2Dash municipios={props.municipios} />
            </CardHeader>
            <CardFooter chart>
              <div className={classes.stats}>
                <BarChartOutlinedIcon /> Por Municipios
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <Card3Dash municipios={props.municipios} />
            </CardHeader>
            <CardFooter chart>
              <div className={classes.stats}>
                <TimelineIcon /> Por Ministerios
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card >
          <CardHeader color="primary" stats icon>
            <CardIcon color="primary">
              <LanguageIcon />
            </CardIcon>
          </CardHeader>
          <CardBody>
            <Map1 />
          </CardBody>
        </Card>
      </GridItem>
      <GridContainer>
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
              },
              {
                tabName: "Ministerio",
                tabIcon: TableChartIcon,
                tabContent: (
                  <TablaTotalPorMinist municipios={props.municipios} />
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
