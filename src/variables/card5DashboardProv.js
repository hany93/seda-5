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
  barRender = ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map(c => c.category),
      datasets: resultSet.series().map((s, index) => (
        {
          label: 'Área en Uso',
          data: s.series.map(r => ((r.value % 1) === 0) ? r.value : parseFloat(r.value).toFixed(2)),
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
      legend: { display: false },
      tooltips: {
        displayColors: false,
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';

            // if (label) {
            //     label += ': ';
            // }
            let num = tooltipItem.yLabel;
            label += ": " + num;
            return label + ' %';
          }
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: "rgba(255, 255, 255, 0.2)",// Eje x color verde
            zeroLineColor: "rgba(255, 255, 255, 0.2)",
            display: true,
          },
          ticks: {
            fontColor: "#FFF", // Cambiar color de labels
          }
        }],
        yAxes: [{
          scaleLabel: { display: true, labelString: 'Área en Uso ( % )', fontColor: "#FFF" },
          gridLines: {
            color: "rgba(255, 255, 255, 0.2)", // Eje y color rojo
            zeroLineColor: "rgba(255, 255, 255, 0.2)",
            display: true
          },
          ticks: {
            //stepSize: 20,
            max: 120,
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
            "EntidadAgricUrbana.areaEnUsoPorciento"
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
            },
            {
              "dimension": "EntidadAgricUrbana.tecnologia",
              "operator": "equals",
              "values": [
                "Huerto",
                "Organoponico",
                "Parcela",
                "Finca",
                "Ctro Materia Orgánica",
                "Semiprotegido"
              ]
            }
          ]
        }}
        cubejsApi={cubejsApi}
        render={this.renderChart(this.barRender)}
      />);
  }
}
export default gg;