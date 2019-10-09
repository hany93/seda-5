import React from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { Line, Bar, Pie } from 'react-chartjs-2';
import moment from 'moment';

const COLORS_SERIES = ['#ab47bc', '#26c6da'];

const lineRender = ({ resultSet }) => {
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
        legend: { display: true,
        position: "bottom",
        },
    };
    return <Line data={data} options={options} />;
};

const API_URL = "http://sed.enpa.vcl.minag.cu"; // change to your actual endpoint

const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzA2MjE1MzQsImV4cCI6MTU3MDcwNzkzNH0.h2-lXlU4PCCR7ywMIywLRD2JQpUU6Uv_wlEzkbrpK8w",
    { apiUrl: API_URL + "/cubejs-api/v1" }
);

const renderChart = (Component) => ({ resultSet, error }) => (
    (resultSet && <Component resultSet={resultSet} />) ||
    (error && error.toString()) ||
    (<Spin />)
)

const ChartRenderer = () => <QueryRenderer
    query={{
        "measures": [
            "SymAgricUrbanaPoint.count",
            "SymAgricUrbanaPoint.areaTotal"
        ],
        "timeDimensions": [],
        "dimensions": [
            "SymAgricUrbanaPoint.tecnologia",
            "SymAgricUrbanaPoint.ministerio"
        ],
        "filters": []
    }}
    cubejsApi={cubejsApi}
    render={renderChart(lineRender)}
/>;

export default ChartRenderer;