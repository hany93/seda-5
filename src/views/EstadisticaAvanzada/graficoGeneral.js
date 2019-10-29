import React, { Component } from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Line, Bubble, Pie, Bar, } from 'react-chartjs-2';
import { Spin, Table } from 'antd';
const COLORS_SERIES = ['#FF6492', '#141446', '#7A77FF'];

const API_URL = "http://sed.enpa.vcl.minag.cu"; // change to your actual endpoint

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjUxODE0NjMsImV4cCI6MTU2NTI2Nzg2M30.r3FYOTFyahrqGyE_BWF0HXeXlrDP8YDtWhWTRtehU0I",
  { apiUrl: API_URL + "/cubejs-api/v1" }
);

class gg extends Component {

  state = {
    tipoGraficFunction: "",
    camposMeasures: "",
    camposDimensions: ""
  };

  componentWillMount() {
    this.setState({ tipoGraficFunction: this.barRender })
  }

  async componentWillReceiveProps(nextprops) {
    await this.setState({ camposMeasures: nextprops.camposMeasures })
    await this.setState({ camposDimensions: nextprops.camposDimensions })

    switch (nextprops.tipoGrafic) {
      case "bar":
        this.setState({ tipoGraficFunction: this.barRender })
        break;

      case "pie":
        this.setState({ tipoGraficFunction: this.pieRender })
        break;

      case "area":
        this.setState({ tipoGraficFunction: this.areaRender })
        break;

      case "line":
        this.setState({ tipoGraficFunction: this.lineRender })
        break;

      case "table":
        this.setState({ tipoGraficFunction: this.tableRender })
        break;

      default:
        break;
    }
  }

  stackedChartData = (resultSet) => {
    const data = resultSet.pivot().map(
      ({ xValues, yValuesArray }) =>
        yValuesArray.map(([yValues, m]) => ({
          x: resultSet.axisValuesString(xValues, ', '),
          color: resultSet.axisValuesString(yValues, ', '),
          measure: m && Number.parseFloat(m)
        }))
    ).reduce((a, b) => a.concat(b));
    return data;
  }

  barRender = ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map(c => c.category),
      datasets: resultSet.series().map((s, index) => (
        {
          label: (s.title === 'Entidad Agric Urbana Area Total') ? 'Área Total' : 'Cantidad',
          data: s.series.map(r => r.value),
          backgroundColor: COLORS_SERIES[index],
          fill: false
        }
      )),
    };
    const options = {
      responsive: true,
      fullWidth: true,
      legend: { position: 'bottom' },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';
            label += ": " + tooltipItem.yLabel;
            if (data.datasets[tooltipItem.datasetIndex].label=='Cantidad') {
              return label + ' Unid';              
            } else {
              return label + ' ha';              
            }
          }
        }
      },
      scales: {
        xAxes: [{ stacked: true }] ,
        yAxes: [{
          scaleLabel: { display: true, labelString: (this.props.camposMeasures.length > 1) ? 'Cantidad(Unid) / Área Total(ha)' : (this.props.camposMeasures[0] == 'EntidadAgricUrbana.count') ? 'Cantidad(Unid)' : 'Área Total(ha)', fontColor: "#000" },
        }]
      }
    };
    return <Bar data={data} options={options} />;
  };

  lineRender = ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map(c => c.category),
      datasets: resultSet.series().map((s, index) => (
        {
          label: (s.title === 'Entidad Agric Urbana Area Total') ? 'Área Total' : 'Cantidad',
          data: s.series.map(r => r.value),
          borderColor: COLORS_SERIES[index],
          fill: false
        }
      )),
    };
    const options = {
      responsive: true,
      fullWidth: true,
      legend: { position: 'bottom' }
    };
    return <Line data={data} options={options} />;
  };

  areaRender = ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map(c => c.category),
      datasets: resultSet.series().map((s, index) => (
        {
          label: (s.title === 'Entidad Agric Urbana Area Total') ? 'Área Total' : 'Cantidad',
          data: s.series.map(r => r.value),
          backgroundColor: COLORS_SERIES[index]
        }
      )),
    };
    const options = {
      responsive: true,
      fullWidth: true,
      legend: { position: 'bottom' },
      scales: { yAxes: [{ stacked: true }] }
    };
    return <Line data={data} options={options} />;
  };

  pieRender = ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map(c => c.category),
      datasets: resultSet.series().map(s => (
        {
          label: (s.title === 'Entidad Agric Urbana Area Total') ? 'Área Total' : 'Cantidad',
          data: s.series.map(r => r.value),
          backgroundColor: COLORS_SERIES,
          hoverBackgroundColor: COLORS_SERIES,
        }
      ))
    };
    const options = {
      responsive: true,
      fullWidth: true,
      legend: { position: 'right' }
    };
    return <Pie data={data} options={options} />;
  };

  tableRender = ({ resultSet }) => (
    <Table
      pagination={false}
      columns={resultSet.tableColumns().map(c => ({ ...c, dataIndex: c.key }))}
      dataSource={resultSet.tablePivot()}
    />

  );

  renderChart = (Component) => ({ resultSet, error }) => (
    (resultSet && <Component resultSet={resultSet} />) ||
    (error && 'No existen datos.') ||
    (<Spin />)
  )

  render() {


    return (
      <QueryRenderer
        query={{
          "measures": this.props.camposMeasures,
          "timeDimensions": [],
          "dimensions": this.props.camposDimensions,
          "filters": [
            {
              "dimension": "EntidadAgricUrbana.municipio",
              "operator": "equals",
              "values": this.props.municipios
            }
          ]
        }}
        cubejsApi={cubejsApi}
        render={this.renderChart(this.state.tipoGraficFunction)}
      />);
  }

}

export default gg;