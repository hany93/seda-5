import React from 'react';
import { Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from "@material-ui/core/Grid";

import cubejs from '@cubejs-client/core';

const hexToRgb = input => {
    input = input + "";
    input = input.replace("#", "");
    let hexRegex = /[0-9A-Fa-f]/g;
    if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
        throw new Error("input is not a valid hex color.");
    }
    if (input.length === 3) {
        let first = input[0];
        let second = input[1];
        let last = input[2];
        input = first + first + second + second + last + last;
    }
    input = input.toUpperCase(input);
    let first = input[0] + input[1];
    let second = input[2] + input[3];
    let last = input[4] + input[5];
    return (
        parseInt(first, 16) +
        ", " +
        parseInt(second, 16) +
        ", " +
        parseInt(last, 16)
    );
};
const useStyles = makeStyles(theme => ({
    input: {
        margin: theme.spacing(1),
    },
    buttonClass: {
        margin: theme.spacing(1),
        color: '#fff',
        boxShadow: (props) => props.color === 'primary' ? "0 4px 20px 0 rgba(" +
            hexToRgb('#000') +
            ",.14), 0 7px 10px -5px rgba(" +
            hexToRgb('#9c27b0') +
            ",.4)" : props.color === "info" ? "0 4px 20px 0 rgba(" +
                hexToRgb('#000') +
                ",.14), 0 7px 10px -5px rgba(" +
                hexToRgb('#00acc1') +
                ",.4)" : props.color === "success" ? "0 4px 20px 0 rgba(" +
                    hexToRgb('#000') +
                    ",.14), 0 7px 10px -5px rgba(" +
                    hexToRgb('#4caf50') +
                    ",.4)" : props.color === "warning" ? "0 4px 20px 0 rgba(" +
                        hexToRgb('#000') +
                        ",.14), 0 7px 10px -5px rgba(" +
                        hexToRgb('#ff9800') +
                        ",.4)" : "0 4px 20px 0 rgba(" +
                        hexToRgb('#000') +
                        ",.14), 0 7px 10px -5px rgba(" +
                        hexToRgb('#f44336') +
                        ",.4)",
        backgroundColor: (props) => props.color === 'primary' ? '#AB47BC' : props.color === "info" ? '#26C6DA' : props.color === "success" ? '#66BB6A' : props.color === "warning" ? '#FFA726' : '#EF5350',
        '&:hover': {
            backgroundColor: (props) => props.color === 'primary' ? '#af2cc5' : props.color === "info" ? '#00d3ee' : props.color === "success" ? '#5cb860' : props.color === "warning" ? '#ffa21a' : '#f55a4e',
        }
    }
}));

const API_URL = "http://sed.enpa.vcl.minag.cu"; // change to your actual endpoint

const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjUxODE0NjMsImV4cCI6MTU2NTI2Nzg2M30.r3FYOTFyahrqGyE_BWF0HXeXlrDP8YDtWhWTRtehU0I",
    { apiUrl: API_URL + "/cubejs-api/v1" }
);

export default function Dropdown(props) {
    const classes = useStyles(props);

    const [showGM, setShowGM] = React.useState(true);
    const [showGD, setShowGD] = React.useState(true);
    const [mesure, setMesure] = React.useState(['EntidadAgricUrbana.count']);
    const [dimension, setDimension] = React.useState(['EntidadAgricUrbana.tecnologia']);
    const [grafico, setGrafico] = React.useState('bar');
    const [filtro, setFiltro] = React.useState('');
    const [operador, setOperador] = React.useState('equals');
    //const [addFiltro, setAddFiltro] = React.useState([]);
    const [valoresDimensionFiltro, setvaloresDimensionFiltro] = React.useState([]);
    //const [dimensionFiltrada, setDimensionFiltrada] = React.useState([]);
    const [valorDelFiltro, setValorDelFiltro] = React.useState('');
    // const [checkedA, setCheckedA] = React.useState(false);
    const [classDisable, setClassDisable] = React.useState(true);

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

    const handleChangeFiltro = async event => {
        var value = event.target.value;
        await setFiltro(value)
        props.dimensionDelFiltro(value)

        const valoresDimensionFiltro = await cubejsApi.load({
            "dimensions": [
                value
            ],
            "filters": [
                {
                    "dimension": "EntidadAgricUrbana.provincia",
                    "operator": "equals",
                    "values": props.provincias
                },
                {
                    "dimension": "EntidadAgricUrbana.municipio",
                    "operator": "equals",
                    "values": props.municipios
                }
            ]
        })


        var auxdim = []
        valoresDimensionFiltro["loadResponse"]["data"].map((dim) =>
            auxdim.push(dim[value])
        )
        await setvaloresDimensionFiltro(auxdim);
        //await setDimensionFiltrada(value);

    }

    const handleChangeOperador = async event => {
        var value = event.target.value;
        await setOperador(value)
        props.operadorDelFiltro(value)
    }

    const handleChangeValor = async event => {
        var value = event.target.value;
        //props.setDimensionFiltrada(dimensionFiltrada)
        props.setValorFiltro(value)
        setValorDelFiltro(value)
    }

    // const handleAddFiltro = async () => {
    //     var a = addFiltro;
    //     a.push(
    //         <GridContainer spacing={5}>
    //             <GridItem xs={12} sm={12} md={6} lg={4} xl={4}>
    //                 <InputLabel htmlFor="select-multiple2">Filtro:</InputLabel>
    //                 <Select
    //                     value={filtro}
    //                     style={{ width: '100%' }}
    //                     onChange={handleChangeFiltro}
    //                     input={<Input id="select-multiple2" />}
    //                     defaultValue='EntidadAgricUrbana.tecnologia'
    //                 >
    //                     <MenuItem value="EntidadAgricUrbana.nombre">Nombre</MenuItem>
    //                     <MenuItem value="EntidadAgricUrbana.tecnologia">Tecnología</MenuItem>
    //                     <MenuItem value="EntidadAgricUrbana.ministerio">Ministerio</MenuItem>
    //                     <MenuItem value="EntidadAgricUrbana.consejoPopular">Consejo Popular</MenuItem>
    //                     <MenuItem value="EntidadAgricUrbana.municipio">Municipio</MenuItem>
    //                     <MenuItem value="EntidadAgricUrbana.provincia">Provincia</MenuItem>
    //                     <MenuItem value="EntidadAgricUrbana.entidad">Entidad</MenuItem>
    //                     <MenuItem value="EntidadAgricUrbana.productor">Productor</MenuItem>
    //                 </Select>
    //             </GridItem>
    //             <GridItem xs={12} sm={12} md={6} lg={4} xl={4}>
    //                 <InputLabel htmlFor="select-multiple2">Operador:</InputLabel>
    //                 <Select
    //                     value={operador}
    //                     style={{ width: '100%' }}
    //                     onChange={handleChangeOperador}
    //                     input={<Input id="select-multiple2" />}
    //                     defaultValue='equals'
    //                 >
    //                     <MenuItem value="contains">Contiene</MenuItem>
    //                     <MenuItem value="notContains">No contiene</MenuItem>
    //                     <MenuItem value="equals">Igual</MenuItem>
    //                     <MenuItem value="notEquals">No es igual</MenuItem>
    //                     <MenuItem value="set">Está establecido</MenuItem>
    //                     <MenuItem value="notSet">No está establecido</MenuItem>
    //                 </Select>
    //             </GridItem>
    //             <GridItem xs={12} sm={12} md={6} lg={4} xl={4}>
    //                 <Input
    //                     placeholder="Valor del Filtro"
    //                     className={classes.input}                        
    //                     style={{ width: '100%' }}
    //                     inputProps={{
    //                         'aria-label': 'description',
    //                     }}
    //                 />
    //             </GridItem>
    //         </GridContainer>
    //     );
    //     setAddFiltro(a)
    // }
    //    const d=[<GridContainer spacing={5} >
    //     <GridItem xs={12} sm={12} md={6} lg={4} xl={4}>
    //         <InputLabel htmlFor="select-multiple2">Filtro:</InputLabel>
    //         <Select
    //             value={filtro}
    //             style={{ width: '50%' }}
    //             onChange={handleChangeFiltro}
    //             input={<Input id="select-multiple2" />}
    //             defaultValue='EntidadAgricUrbana.tecnologia'
    //         >
    //             <MenuItem value="EntidadAgricUrbana.nombre">Nombre</MenuItem>
    //             <MenuItem value="EntidadAgricUrbana.tecnologia">Tecnología</MenuItem>
    //             <MenuItem value="EntidadAgricUrbana.ministerio">Ministerio</MenuItem>
    //             <MenuItem value="EntidadAgricUrbana.consejoPopular">Consejo Popular</MenuItem>
    //             <MenuItem value="EntidadAgricUrbana.municipio">Municipio</MenuItem>
    //             <MenuItem value="EntidadAgricUrbana.provincia">Provincia</MenuItem>
    //             <MenuItem value="EntidadAgricUrbana.entidad">Entidad</MenuItem>
    //             <MenuItem value="EntidadAgricUrbana.productor">Productor</MenuItem>
    //         </Select>
    //     </GridItem>
    //     <GridItem xs={12} sm={12} md={6} lg={4} xl={4}>
    //         <InputLabel htmlFor="select-multiple2">Operador:</InputLabel>
    //         <Select
    //             value={operador}
    //             style={{ width: '50%' }}
    //             onChange={handleChangeOperador}
    //             input={<Input id="select-multiple2" />}
    //             defaultValue='equals'
    //         >
    //             <MenuItem value="contains">Contiene</MenuItem>
    //             <MenuItem value="notContains">No contiene</MenuItem>
    //             <MenuItem value="equals">Igual</MenuItem>
    //             <MenuItem value="notEquals">No es igual</MenuItem>
    //             <MenuItem value="set">Está establecido</MenuItem>
    //             <MenuItem value="notSet">No está establecido</MenuItem>
    //         </Select>
    //     </GridItem>
    // </GridContainer>,
    // <GridContainer spacing={5} >
    //                 <GridItem xs={12} sm={12} md={6} lg={4} xl={4}>
    //                     <InputLabel htmlFor="select-multiple2">Filtro:</InputLabel>
    //                     <Select
    //                         value={filtro}
    //                         style={{ width: '50%' }}
    //                         onChange={handleChangeFiltro}
    //                         input={<Input id="select-multiple2" />}
    //                         defaultValue='EntidadAgricUrbana.tecnologia'
    //                     >
    //                         <MenuItem value="EntidadAgricUrbana.nombre">Nombre</MenuItem>
    //                         <MenuItem value="EntidadAgricUrbana.tecnologia">Tecnología</MenuItem>
    //                         <MenuItem value="EntidadAgricUrbana.ministerio">Ministerio</MenuItem>
    //                         <MenuItem value="EntidadAgricUrbana.consejoPopular">Consejo Popular</MenuItem>
    //                         <MenuItem value="EntidadAgricUrbana.municipio">Municipio</MenuItem>
    //                         <MenuItem value="EntidadAgricUrbana.provincia">Provincia</MenuItem>
    //                         <MenuItem value="EntidadAgricUrbana.entidad">Entidad</MenuItem>
    //                         <MenuItem value="EntidadAgricUrbana.productor">Productor</MenuItem>
    //                     </Select>
    //                 </GridItem>
    //                 <GridItem xs={12} sm={12} md={6} lg={4} xl={4}>
    //                     <InputLabel htmlFor="select-multiple2">Operador:</InputLabel>
    //                     <Select
    //                         value={operador}
    //                         style={{ width: '50%' }}
    //                         onChange={handleChangeOperador}
    //                         input={<Input id="select-multiple2" />}
    //                         defaultValue='equals'
    //                     >
    //                         <MenuItem value="contains">Contiene</MenuItem>
    //                         <MenuItem value="notContains">No contiene</MenuItem>
    //                         <MenuItem value="equals">Igual</MenuItem>
    //                         <MenuItem value="notEquals">No es igual</MenuItem>
    //                         <MenuItem value="set">Está establecido</MenuItem>
    //                         <MenuItem value="notSet">No está establecido</MenuItem>
    //                     </Select>
    //                 </GridItem>
    //             </GridContainer>]
    const handleChange = event => {
        props.setCheckedA(event.target.checked)
        // setCheckedA(event.target.checked);
        if (classDisable) {
            setClassDisable(false);
        } else {
            setClassDisable(true);
        }
    };
    return (
        <div>
            <GridContainer spacing={5}>
                <GridItem xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Card>
                        <CardHeader color={props.color}>
                            <h2 style={{ textAlign: 'center', color: '#fff' }}>Valores Estadísticos</h2>
                        </CardHeader>
                        <CardBody>
                            <GridContainer spacing={5}>
                                <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <InputLabel htmlFor="select-multiple">Valores (eje Y):</InputLabel>
                                    <Select
                                        multiple
                                        value={mesure}
                                        style={{ width: '100%' }}
                                        onChange={handleChangeMeasures}
                                        input={<Input id="select-multiple" />}>
                                        <MenuItem value="EntidadAgricUrbana.count">Cantidad</MenuItem>
                                        <MenuItem value="EntidadAgricUrbana.areaTotal">Área Total</MenuItem>
                                    </Select>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <InputLabel htmlFor="select-multiple1" style={{ paddingTop: 50 }}>Categorías (eje X):</InputLabel>
                                    <Select
                                        multiple
                                        value={dimension}
                                        style={{ width: '100%' }}
                                        onChange={handleChangeDimensions}
                                        input={<Input id="select-multiple1" />}>
                                        <MenuItem value="EntidadAgricUrbana.nombre">Nombre</MenuItem>
                                        <MenuItem value="EntidadAgricUrbana.tecnologia">Tecnología</MenuItem>
                                        <MenuItem value="EntidadAgricUrbana.ministerio">Ministerio</MenuItem>
                                        <MenuItem value="EntidadAgricUrbana.consejoPopular">Consejo Popular</MenuItem>
                                        {/* <MenuItem value="EntidadAgricUrbana.municipio">Municipio</MenuItem>
                                        <MenuItem value="EntidadAgricUrbana.provincia">Provincia</MenuItem> */}
                                        <MenuItem value="EntidadAgricUrbana.entidad">Entidad</MenuItem>
                                        <MenuItem value="EntidadAgricUrbana.productor">Productor</MenuItem>
                                    </Select>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <InputLabel htmlFor="select-multiple2" style={{ paddingTop: 50 }}>Tipo de Gráfico:</InputLabel>
                                    <Select
                                        value={grafico}
                                        style={{ width: '100%' }}
                                        onChange={handleChangeGrafic}
                                        input={<Input id="select-multiple2" />}>
                                        <MenuItem value="bar">Gráfico de Barras</MenuItem>
                                        <MenuItem value="pie">Gráfico de Pastel</MenuItem>
                                        <MenuItem value="line">Gráfico de Líneas</MenuItem>
                                        <MenuItem value="area">Gráfico de Área</MenuItem>
                                        <MenuItem value="table">Tabla</MenuItem>
                                    </Select>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Card>
                        <CardHeader color={props.color}>
                            <Grid container>
                                <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                                    Off<Switch
                                        checked={props.checkedA}
                                        onChange={handleChange}
                                        value="checkedA"
                                        color="default"
                                        inputProps={{ 'aria-label': 'checkbox' }}
                                    />On
                                </Grid>
                                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                                    <h2 style={{ textAlign: 'left', color: '#fff' }}>Filtros</h2>
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <GridContainer spacing={5}>
                                <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <InputLabel htmlFor="select-multiple2">Filtro:</InputLabel>
                                    <Select
                                        disabled={classDisable}
                                        value={filtro}
                                        style={{ width: '100%' }}
                                        onChange={handleChangeFiltro}
                                        input={<Input id="select-multiple2" />}>
                                        <MenuItem value="EntidadAgricUrbana.nombre">Nombre</MenuItem>
                                        <MenuItem value="EntidadAgricUrbana.tecnologia">Tecnología</MenuItem>
                                        <MenuItem value="EntidadAgricUrbana.ministerio">Ministerio</MenuItem>
                                        <MenuItem value="EntidadAgricUrbana.consejoPopular">Consejo Popular</MenuItem>
                                        {/* <MenuItem value="EntidadAgricUrbana.municipio">Municipio</MenuItem>
                                        <MenuItem value="EntidadAgricUrbana.provincia">Provincia</MenuItem> */}
                                        <MenuItem value="EntidadAgricUrbana.entidad">Entidad</MenuItem>
                                        <MenuItem value="EntidadAgricUrbana.productor">Productor</MenuItem>
                                    </Select>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <InputLabel htmlFor="select-multiple2" style={{ paddingTop: 50 }}>Operador:</InputLabel>
                                    <Select
                                        disabled={classDisable}
                                        value={operador}
                                        style={{ width: '100%' }}
                                        onChange={handleChangeOperador}
                                        input={<Input id="select-multiple2" />}>
                                        <MenuItem value="contains">Contiene</MenuItem>
                                        <MenuItem value="notContains">No contiene</MenuItem>
                                        <MenuItem value="equals">Igual</MenuItem>
                                        <MenuItem value="notEquals">No es igual</MenuItem>
                                        <MenuItem value="set">Está establecido</MenuItem>
                                        <MenuItem value="notSet">No está establecido</MenuItem>
                                    </Select>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <InputLabel htmlFor="select-multiple2" style={{ paddingTop: 50 }}>Valor filtrado:</InputLabel>
                                    <Select
                                        disabled={classDisable}
                                        value={valorDelFiltro}
                                        style={{ width: '100%' }}
                                        onChange={handleChangeValor}
                                        input={<Input id="select-multiple2" />}>

                                        {valoresDimensionFiltro.map(name => (
                                            <MenuItem key={name} value={name} className={classes.dropdownItem}>{name}</MenuItem>
                                        ))}

                                    </Select>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            {/* <GridContainer spacing={5}>
                <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Button variant="contained" className={classes.buttonClass} onClick={handleAddFiltro}>
                        Añadir Filtro
                    </Button>
                </GridItem>
            </GridContainer>
            <div>
                {addFiltro}
            </div> */}
        </div>
    );
}