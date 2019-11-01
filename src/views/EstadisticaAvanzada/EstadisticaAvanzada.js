import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
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

  const [measures, setMeasures] = React.useState(["EntidadAgricUrbana.count"]);
  const [dimensions, setDimensions] = React.useState(["EntidadAgricUrbana.tecnologia"]);
  const [tipoGrafic, setTipoGrafic] = React.useState('bar');
  const [filtro, setFiltro] = React.useState('EntidadAgricUrbana.tecnologia');
  const [operador, setOperador] = React.useState('contains');
  const [showGM, setShowGM] = React.useState(true);
  const [showGD, setShowGD] = React.useState(true);

  //const [dimensionFiltrada, setDimensionFiltrada] = React.useState([]);
  const [valorFiltro, setValorFiltro] = React.useState(true);

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

  const dimensionDelFiltro = async filtro => {
    await setFiltro(filtro)
  }

  const operadorDelFiltro = async operador => {
    await setOperador(operador)
  }

  return (
    <div>
      <Dropdown
        color={props.color1}
        showGrafic={showGrafic}
        camposMeasures={camposMeasures}
        camposDimensions={camposDimensions}
        tipoGrafic={tipoGraficFunction}
        dimensionDelFiltro={dimensionDelFiltro}
        operadorDelFiltro={operadorDelFiltro}
        provincias={props.provincias}
        municipios={props.municipios}
        //setDimensionFiltrada={setDimensionFiltrada}
        setValorFiltro={setValorFiltro}
      />
      <br />
      <Card>
        <CardBody>
          {showGM && showGD ? <GraficoGeneral
            camposMeasures={measures}
            camposDimensions={dimensions}
            tipoGrafic={tipoGrafic}
            provincias={props.provincias}
            municipios={props.municipios}
            filtro={filtro}
            operador={operador}
            //dimensionFiltrada={dimensionFiltrada}
            valorFiltro={valorFiltro}
          /> : ''}
        </CardBody>
      </Card>
    </div>
  );
}
