import React from 'react';
import { Row } from 'antd';
import { Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

export default function Dropdown(props) {

    const [showGM, setShowGM] = React.useState(true);
    const [showGD, setShowGD] = React.useState(true);
    const [mesure, setMesure] = React.useState(['EntidadAgricUrbana.count']);
    const [dimension, setDimension] = React.useState(['EntidadAgricUrbana.tecnologia']);
    const [grafico, setGrafico] = React.useState('bar');

    const handleChangeMeasures = async event => {
        var value = event.target.value;
        await setMesure(value)
        props.camposMeasures(value)
        await setShowGM(true)
        props.showGrafic(showGM, showGD)
    }

    const handleChangeDimensions = async event => {
        var value = event.target.value;
        setDimension(value)
        props.camposDimensions(value)
        await setShowGD(true)
        props.showGrafic(showGM, showGD)
    }

    const handleChangeGrafic = async event => {
        var value = event.target.value;
        await setGrafico(value)
        props.tipoGrafic(value)
    }

    return (
        <div>
            <Row>
                <InputLabel htmlFor="select-multiple">Valores (eje Y):</InputLabel>
                <Select
                    multiple
                    value={mesure}
                    style={{ width: '50%' }}
                    onChange={handleChangeMeasures}
                    input={<Input id="select-multiple" />}
                    defaultValue="EntidadAgricUrbana.count"
                >
                    <MenuItem value="EntidadAgricUrbana.count">Cantidad</MenuItem>
                    <MenuItem value="EntidadAgricUrbana.areaTotal">Área</MenuItem>
                </Select>
            </Row>
            <Row>
                <br />
                <InputLabel htmlFor="select-multiple1">Categorías (eje X):</InputLabel>
                <Select
                    multiple
                    value={dimension}
                    style={{ width: '50%' }}
                    onChange={handleChangeDimensions}
                    input={<Input id="select-multiple1" />}
                    defaultValue="EntidadAgricUrbana.nombre"
                >
                    <MenuItem value="EntidadAgricUrbana.nombre">Nombre</MenuItem>
                    <MenuItem value="EntidadAgricUrbana.tecnologia">Tecnología</MenuItem>
                    <MenuItem value="EntidadAgricUrbana.ministerio">Ministerio</MenuItem>
                    <MenuItem value="EntidadAgricUrbana.consejoPopular">Consejo Popular</MenuItem>
                    <MenuItem value="EntidadAgricUrbana.municipio">Municipio</MenuItem>
                    <MenuItem value="EntidadAgricUrbana.provincia">Provincia</MenuItem>
                    <MenuItem value="EntidadAgricUrbana.entidad">Entidad</MenuItem>
                    <MenuItem value="EntidadAgricUrbana.productor">Productor</MenuItem>
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