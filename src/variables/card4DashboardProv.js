import React, { Component } from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { Doughnut } from 'react-chartjs-2';

const COLORS_SERIES = ['#ec407a', '#66bb6a', '#ab47bc', '#26c6da'];

const API_URL = "http://sed.enpa.vcl.minag.cu"; // change to your actual endpoint

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzA2MjE1MzQsImV4cCI6MTU3MDcwNzkzNH0.h2-lXlU4PCCR7ywMIywLRD2JQpUU6Uv_wlEzkbrpK8w",
  { apiUrl: API_URL + "/cubejs-api/v1" }
);

class gg extends Component {

  pieRender = ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map(c => c.category),
      datasets: resultSet.series().map(s => (
        {
          label: s.title,
          data: s.series.map(r => r.value),
          backgroundColor: COLORS_SERIES,
          hoverBackgroundColor: COLORS_SERIES,
        }
      ))
    };
    const options = {
      legend: { display: true, position: 'right' },
      scales: {
        xAxes: [{
          gridLines: {
            color: "#000",// Eje x color verde
            zeroLineColor: "#000",
            display: true,
          },
          ticks: {
            fontColor: "#000", // Cambiar color de labels
            fontSize: 10,
            minRotation: 2
          }
        }],
        yAxes: [{
          scaleLabel: { display: true, labelString: 'Cantidad(Unidades)', fontColor: "#000" },
          gridLines: {
            color: "#000", // Eje y color rojo
            zeroLineColor: "#000",
            display: true
          },
          ticks: {
            fontColor: "#000" // Cambiar color de labels
          }
        }]
      }
    };
    return <Doughnut data={data} options={options} />;
  };

  renderChart = (Component) => ({ resultSet, error }) => (
    (resultSet && <Component resultSet={resultSet} />) ||
    (error && 'No hay datos.') ||
    (<Spin />)
  )

  render() {
    return (
      <QueryRenderer
        query={{
          "measures": [
<<<<<<< HEAD
            "SymAgricUrbanaPoint.areaTotal"
          ],
          "timeDimensions": [],
          "dimensions": [
            "SymAgricUrbanaPoint.tecnologia"
=======
            "EntidadAgricUrbana.count"
          ],
          "timeDimensions": [],
          "dimensions": [
            "EntidadAgricUrbana.entidad"
>>>>>>> ddd3aac7de06539cef595d2501713717ec476846
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
        render={this.renderChart(this.pieRender)}
      />);
  }
}
export default gg;