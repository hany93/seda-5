import React, { Component } from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { Bar } from 'react-chartjs-2';

const COLORS_SERIES = ['#FFF', '#FFF', '#FFF'];

const API_URL = "http://sed.enpa.vcl.minag.cu"; // change to your actual endpoint

const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzA2MjE1MzQsImV4cCI6MTU3MDcwNzkzNH0.h2-lXlU4PCCR7ywMIywLRD2JQpUU6Uv_wlEzkbrpK8w",
    { apiUrl: API_URL + "/cubejs-api/v1" }
);

class gg extends Component {

    barRender = ({ resultSet }) => {
        const data = {
            labels: resultSet.categories().map(c => c.category),
            datasets: resultSet.series().map((s, index) => (
                {
                    label: 'Cantidad',
                    data: s.series.map(r => r.value),
                    backgroundColor: COLORS_SERIES[index],
                    fill: false
                }
            )),
        };
        const options = {
            legend: { display: false, },
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.2) ",// Eje x color verde
                        zeroLineColor: "rgba(255, 255, 255, 0.2)",
                        display: true,
                    },
                    ticks: {
                        fontColor: "#FFF" // Cambiar color de labels
                    }
                }],
                yAxes: [{
                    scaleLabel: { display: true, labelString: 'Cantidad(Unid)', fontColor: "#FFF" },
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.2)", // Eje y color rojo
                        zeroLineColor: "rgba(255, 255, 255, 0.2)",
                        display: true
                    },
                    ticks: {
                        fontColor: "#FFF" // Cambiar color de labels
                    }
                }]
            }
        };
        return <Bar data={data} options={options} />;
    };

    renderChart = (Component) => ({ resultSet, error }) => (
        (resultSet && <Component resultSet={resultSet} />) ||
        (error && 'No existen datos.') ||
        (<Spin />)
    )

    render() {
        return (
            <QueryRenderer
                query={{
                    "measures": [
                        "EntidadAgricUrbana.count"
                    ],
                    "timeDimensions": [],
                    "dimensions": [
                        "EntidadAgricUrbana.tecnologia"
                    ],
                    "filters": [
                        {
                            "dimension": "EntidadAgricUrbana.municipio",
                            "operator": "equals",
                            "values": this.props.municipios
                        },
                        {
                            "dimension": "EntidadAgricUrbana.provincia",
                            "operator": "equals",
                            "values": this.props.provincias
                        }
                    ]
                }}
                cubejsApi={cubejsApi}
                render={this.renderChart(this.barRender)}
            />);
    }
}
export default gg;