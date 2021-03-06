import React, { Component } from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const COLORS_SERIES = ['#FFF'];

const API_URL = "http://sed.enpa.vcl.minag.cu"; // change to your actual endpoint

const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzA2MjE1MzQsImV4cCI6MTU3MDcwNzkzNH0.h2-lXlU4PCCR7ywMIywLRD2JQpUU6Uv_wlEzkbrpK8w",
    { apiUrl: API_URL + "/cubejs-api/v1" }
);

class gg extends Component {
    maxGrafico = (value) => {
        if (Number.isInteger(value)) {
            var numLenght = value.toString().length;
            var num = value.toString().charAt(0);
            var aux = '1';
            for (let index = 1; index < numLenght; index++) {
                num += 0;
                aux += 0;
            }
            // console.log('...................')
            // console.log(value)
            // console.log(parseInt(num))
            // console.log(parseInt(aux))
            // console.log(parseInt(num) + (2*parseInt(aux)))
            return parseInt(num) + (2*parseInt(aux));
        } else {
            var value1 = Math.trunc(value);
            var numLenght = value1.toString().length;
            var num = value1.toString().charAt(0);
            var aux = '1';
            for (let index = 1; index < numLenght; index++) {
                num += 0;
                aux += 0;
            }
            // console.log(',,,,,,,,,,,,,,,,,,,,,,,')
            // console.log(value)
            // console.log(parseInt(num))
            // console.log(parseInt(aux))
            // console.log(parseInt(num) + parseInt(aux) + 100)
            return parseInt(num) + (2*parseInt(aux));
        }
    }
    barRender = ({ resultSet }) => {
        const data = {
            labels: resultSet.categories().map(c => c.category),
            datasets: resultSet.series().map((s, index) => (
                {
                    label: 'Cantidad',
                    data: s.series.map(r => r.value),
                    backgroundColor: COLORS_SERIES[0],
                    fill: false
                }
            )),
        };
        const options = {
            plugins: {
                datalabels: {
                    color: '#FFF',
                    anchor: 'end',
                    align: 'top',
                    offset: -5,
                    formatter: function (value, context) {
                        return value;
                    }
                }
            },
            responsive: true,
            fullWidth: true,
            legend: { display: false, },
            tooltips: {
                displayColors: false,
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        // if (label) {
                        //     label += ': ';
                        // }
                        label += ": " + tooltipItem.yLabel;
                        return label + ' Unid';
                    }
                }
            },
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
                    scaleLabel: { display: true, labelString: 'Cantidad ( Unid )', fontColor: "#FFF" },
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.2)", // Eje y color rojo
                        zeroLineColor: "rgba(255, 255, 255, 0.2)",
                        display: true
                    },
                    ticks: {
                        //stepSize: (this.maxGrafico(Math.max(...data.datasets[0].data)) > 0 && this.maxGrafico(Math.max(...data.datasets[0].data)) < 1000) ? 150 : 500,
                        max: this.maxGrafico(Math.max(...data.datasets[0].data)),
                        fontColor: "#FFF", // Cambiar color de labels
                        beginAtZero: true
                    }
                }]
            }
        };
        return <Bar data={data} options={options} plugins={[ChartDataLabels]} />;
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
                        "EntidadAgricUrbana.provincia"
                    ],
                    "filters": []
                }}
                cubejsApi={cubejsApi}
                render={this.renderChart(this.barRender)}
            />);
    }
}
export default gg;