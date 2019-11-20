import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import GraficoGeneral from './graficoGeneral';
import Dropdown from './dropdown'

export default function EstadisticaAvanzadaPage(props) {

  const [measures, setMeasures] = React.useState(["EntidadAgricUrbana.count"]);
  const [dimensions, setDimensions] = React.useState(["EntidadAgricUrbana.tecnologia"]);
  const [tipoGrafic, setTipoGrafic] = React.useState('bar');
  const [filtro, setFiltro] = React.useState('EntidadAgricUrbana.tecnologia');
  const [operador, setOperador] = React.useState('contains');
  const [showGM, setShowGM] = React.useState(true);
  const [showGD, setShowGD] = React.useState(true);
  const [checkedA, setCheckedA] = React.useState(false);

  //const [dimensionFiltrada, setDimensionFiltrada] = React.useState([]);
  const [valorFiltro, setValorFiltro] = React.useState(true);

  const camposMeasures = async measures => {
    setMeasures(measures)
    //await setMeasures(measures)
  }

  const showGrafic = async (value1, value2) => {
    setShowGM(value1)
    setShowGD(value2)
    // await setShowGM(value1)
    // await setShowGD(value2)
  }

  const camposDimensions = async dimensions => {
    setDimensions(dimensions)
    //await setDimensions(dimensions)
  }

  const tipoGraficFunction = async grafic => {
    setTipoGrafic(grafic)
    //await setTipoGrafic(grafic)
  }

  const dimensionDelFiltro = async filtro => {
    setFiltro(filtro)
    //await setFiltro(filtro)
  }

  const operadorDelFiltro = async operador => {
    setOperador(operador)
    //await setOperador(operador)
  }
  React.useEffect(() => {
    props.setLoading(true)
  },
    []
  );
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
        setCheckedA={setCheckedA}
        checkedA={checkedA}
      />
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
            checkedA={checkedA}
          /> : ''}
        </CardBody>
      </Card>
    </div>
  );
}
