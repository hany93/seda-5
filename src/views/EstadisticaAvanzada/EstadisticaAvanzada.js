import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GraficoGeneral from './graficoGeneral';
import Dropdown from './dropdown'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function EstadisticaAvanzadaPage(props) {
  const classes = useStyles();

  const [measures, setMeasures] = React.useState(["SymAgricUrbanaPoint.count"]);
  const [dimensions, setDimensions] = React.useState(["SymAgricUrbanaPoint.tecnologia"]);
  const [tipoGrafic, setTipoGrafic] = React.useState('bar');
  const [showGM, setShowGM] = React.useState(true);
  const [showGD, setShowGD] = React.useState(true);

  const camposMeasures = async measures => {
    await setMeasures(measures)
  }

  const showGrafic = async (value1, value2) => {
    await setShowGM(value1)
    await setShowGD(value2)
  }

  const camposDimensions = async dimensions => {
    await setDimensions(dimensions)
  }

  const tipoGraficFunction = async grafic => {
    await setTipoGrafic(grafic)
  }
  return (
    <Card>
      <CardHeader color={props.color1}>
        <h4 className={classes.cardTitleWhite}>Estadística Avanzada</h4>
        <p className={classes.cardCategoryWhite}>
          En este espacio .......
        </p>
      </CardHeader>
      <CardBody>
        <Dropdown showGrafic={showGrafic} camposMeasures={camposMeasures} camposDimensions={camposDimensions} tipoGrafic={tipoGraficFunction} />
        {showGM && showGD ? <GraficoGeneral camposMeasures={measures} camposDimensions={dimensions} tipoGrafic={tipoGrafic} municipio="Remedios" /> : ''}
      </CardBody>
    </Card>
  );
}
