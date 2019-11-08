import React, { Component } from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const API_URL = "http://sed.enpa.vcl.minag.cu"; // change to your actual endpoint

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzA2MjE1MzQsImV4cCI6MTU3MDcwNzkzNH0.h2-lXlU4PCCR7ywMIywLRD2JQpUU6Uv_wlEzkbrpK8w",
  { apiUrl: API_URL + "/cubejs-api/v1" }
);

function aleatorio(inferior, superior) {
  var numPosibilidades = superior - inferior
  var aleat = Math.random() * numPosibilidades
  aleat = Math.floor(aleat)
  return parseInt(inferior) + aleat
}

function dame_color_aleatorio() {
  var hexadecimal = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F")
  var color_aleatorio = "#";
  for (let i = 0; i < 6; i++) {
    var posarray = aleatorio(0, hexadecimal.length)
    color_aleatorio += hexadecimal[posarray]
  }
  return color_aleatorio
}

class gg extends Component {

  pieRender = ({ resultSet }) => {
    var cantColores = resultSet['loadResponse']['data'];
    var COLORS_SERIES = [];
    cantColores.map(cc => COLORS_SERIES.push(dame_color_aleatorio()))
    const data = {
      labels: resultSet.categories().map(c => c.category),
      datasets: resultSet.series().map(s => (
        {
          label: 'Área en Uso',
          data: s.series.map(r => ((r.value % 1) === 0) ? r.value : parseFloat(r.value).toFixed(2)),
          backgroundColor: COLORS_SERIES,
          hoverBackgroundColor: COLORS_SERIES,
          pointStyle: 'circle',
        }
      ))
    };
    const options = {
      plugins: {
        datalabels: {
          color: '#FFF',
          anchor: 'center',
          align: 'center',
          formatter: function (value, context) {
            return value + " %";
          }
        }
      },
      responsive: true,
      fullWidth: true,
      legend: {
        display: true,
        position: 'right',
        labels: {
          padding: 20,
          usePointStyle: true,
          generateLabels: function (chart) {
            var data = chart.data;
            //console.log(data)
            if (data.labels.length && data.datasets.length) {
              return data.labels.map(function (label, i) {
                //console.log(i+"..."+label)
                return {
                  text: label,
                  fillStyle: '#fff',
                  strokeStyle: data.datasets[0].backgroundColor[i],
                  lineWidth: 3,
                  // Extra data used for toggling the correct item
                  index: i
                };
              });
            }
            return [];
          }
        }
      },
      tooltips: {
        displayColors: true,
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';

            // if (label) {
            //     label += ': ';
            // }
            // console.log(tooltipItem)
            // console.log(data)
            let num = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            label += ": " + num;
            return label + ' %';
          }
        }
      },
    };
    return <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />;
  };

  renderChart = (Component) => ({ resultSet, error }) => (
    (resultSet && <Component resultSet={resultSet} />) ||
    (error && <p style={{ color: '#000' }}>No existen datos.</p>) ||
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
            "EntidadAgricUrbana.provincia"
          ],
          "filters": []
        }}
        cubejsApi={cubejsApi}
        render={this.renderChart(this.pieRender)}
      />);
  }
}
export default gg;