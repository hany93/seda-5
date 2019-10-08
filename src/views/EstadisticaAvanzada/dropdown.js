import React from 'react';
import { Row } from 'antd';
import { Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

export default function Dropdown(props) {

    const [showGM, setShowGM] = React.useState(true);
    const [showGD, setShowGD] = React.useState(true);
    const [mesure, setMesure] = React.useState(['SymAgricUrbanaPoint.count']);
    const [dimension, setDimension] = React.useState(['SymAgricUrbanaPoint.tecnologia']);
    const [grafico, setGrafico] = React.useState('pie');

    const handleChangeMeasures = async event => {
        var value = event.target.value;
        if (value.length > 0) {
            setMesure(value)
            props.camposMeasures(mesure)
            await setShowGM(true)
            props.showGrafic(showGM, showGD)
        } else {
            //Message.error('Debe seleccionar el valor por el eje Y.', 5);
            await setShowGM(false)
            props.showGrafic(showGM, showGD)
        }
    }

    const handleChangeDimensions = async event => {
        var value = event.target.value;
        if (value.length > 0) {
            setDimension(value)
            props.camposDimensions(dimension)
            await setShowGD(true)
            props.showGrafic(showGM, showGD)
        } else {
            //Message.error('Debe seleccionar la categoría por el eje X.', 5);
            await setShowGD(false)
            props.showGrafic(showGM, showGD)
        }
    }

    const handleChangeGrafic = event => {
        var value = event.target.value;
        setGrafico(value)
        props.tipoGrafic(grafico)
    }
    return (
        <div>
            <Row>
                <InputLabel htmlFor="select-multiple">Valores (eje Y):</InputLabel>
                <Select
                    value={mesure}
                    style={{ width: '50%' }}
                    onChange={handleChangeMeasures}
                    input={<Input id="select-multiple" />}
                    defaultValue='SymAgricUrbanaPoint.count'
                >
                    <MenuItem value='SymAgricUrbanaPoint.count'>Cantidad</MenuItem>
                    <MenuItem value='SymAgricUrbanaPoint.areaTotal'>Área</MenuItem>
                </Select>
            </Row>
            <Row>
                <br />
                <InputLabel htmlFor="select-multiple1">Categorías (eje X):</InputLabel>
                <Select
                    value={dimension}
                    style={{ width: '50%' }}
                    onChange={handleChangeDimensions}
                    input={<Input id="select-multiple1" />}
                    defaultValue='SymAgricUrbanaPoint.nombre'
                >
                    <MenuItem value="SymAgricUrbanaPoint.nombre">Nombre</MenuItem>
                    <MenuItem value="SymAgricUrbanaPoint.tecnologia">Tecnología</MenuItem>
                    <MenuItem value="SymAgricUrbanaPoint.ministerio">Ministerio</MenuItem>
                    <MenuItem value="SymAgricUrbanaPoint.consejoPopular">Consejo Popular</MenuItem>
                    <MenuItem value="SymAgricUrbanaPoint.provincia">Provincia</MenuItem>
                    <MenuItem value="SymAgricUrbanaPoint.entidad">Entidad</MenuItem>
                    <MenuItem value="SymAgricUrbanaPoint.productor">Productor</MenuItem>
                </Select>
            </Row>
            <Row>
            </Row>
            <Row>
                <br />
                <InputLabel htmlFor="select-multiple2">Tipo de Gráfico:</InputLabel>
                <Select
                    value={grafico}
                    style={{ width: '50%' }}
                    onChange={handleChangeGrafic}
                    input={<Input id="select-multiple2" />}
                    defaultValue='bar'
                >
                    <MenuItem value="bar">Gráfico de Barras</MenuItem>
                    <MenuItem value="pie">Gráfico de Pastel</MenuItem>
                    <MenuItem value="line">Gráfico de Líneas</MenuItem>
                    <MenuItem value="area">Gráfico de Área</MenuItem>
                    <MenuItem value="table">Tabla</MenuItem>
                </Select>
            </Row>
            <Row>
            </Row>
        </div>
    );
}