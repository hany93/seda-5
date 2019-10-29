import React, { Component } from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { Line } from 'react-chartjs-2';

const COLORS_SERIES = ['#ab47bc', '#26c6da'];

const API_URL = "http://sed.enpa.vcl.minag.cu"; // change to your actual endpoint

const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzA2MjE1MzQsImV4cCI6MTU3MDcwNzkzNH0.h2-lXlU4PCCR7ywMIywLRD2JQpUU6Uv_wlEzkbrpK8w",
    { apiUrl: API_URL + "/cubejs-api/v1" }
);

class gg extends Component {

    lineRender = ({ resultSet }) => {
        const data = {
            labels: resultSet.categories().map(c => c.category),
            datasets: resultSet.series().map((s, index) => (
                {
                    label: index === 0 ? 'Cantidad' : 'Área Total',
                    data: s.series.map(r => r.value),
                    borderColor: COLORS_SERIES[index],
                    fill: false
                }
            )),
        };
        const options = {
            responsive: true,
            fullWidth: true,
            legend: {
                display: true,
                position: "bottom",
            },
        };
        return <Line data={data} options={options} />;
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
                        "EntidadAgricUrbana.count",
                        "EntidadAgricUrbana.areaTotal"
                    ],
                    "timeDimensions": [],
                    "dimensions": [
                        "EntidadAgricUrbana.tecnologia",
                        "EntidadAgricUrbana.ministerio"
                    ],
                    "filters": [
                        {
                            "dimension": "EntidadAgricUrbana.municipio",
                            "operator": "equals",
                            "values": this.props.municipios
                        }
                    ]
                }}
                cubejsApi={cubejsApi}
                render={this.renderChart(this.lineRender)}
            />);
    }
}
export default gg;