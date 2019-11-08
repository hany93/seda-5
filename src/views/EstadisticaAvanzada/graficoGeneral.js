import React, { Component } from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Line, Bubble, Pie, Bar, } from 'react-chartjs-2';
import { Spin, Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { async } from 'q';
const COLORS_SERIES = ['#FF6492', '#7A77FF', '#141446'];

const API_URL = "http://sed.enpa.vcl.minag.cu"; // change to your actual endpoint

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjUxODE0NjMsImV4cCI6MTU2NTI2Nzg2M30.r3FYOTFyahrqGyE_BWF0HXeXlrDP8YDtWhWTRtehU0I",
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

  state = {
    tipoGraficFunction: "",
    camposMeasures: "",
    camposDimensions: "",
    searchText: ''
  };

  componentDidMount() {
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

  maxGrafico = (value) => {
    if (Number.isInteger(value)) {
      var numLenght = value.toString().length;
      var num = value.toString().charAt(0);
      var aux = '1';
      for (let index = 1; index < numLenght; index++) {
        num += 0;
        aux += 0;
      }
      return parseInt(num) + parseInt(aux) + 50;
    } else {
      var value1 = Math.trunc(value);
      var numLenght = value1.toString().length;
      var num = value1.toString().charAt(0);
      var aux = '1';
      for (let index = 1; index < numLenght; index++) {
        num += 0;
        aux += 0;
      }
      return parseInt(num) + parseInt(aux) + 50;
    }
  }

  barRender = ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map(c => c.category),
      datasets: resultSet.series().map((s, index) => (
        {
          label: (s.title === 'Entidad Agric Urbana Area Total') ? 'Área Total' : 'Cantidad',
          data: s.series.map(r => ((r.value % 1) === 0) ? r.value : parseFloat(r.value).toFixed(2)),
          backgroundColor: COLORS_SERIES[index],
          fill: false
        }
      )),
    };
    const options = {
      plugins: {
        datalabels: {
          color: '#000',
          anchor: 'end',
          align: 'top',
          offset: 5,
          formatter: function (value, context) {
            return value;
          }
        }
      },
      responsive: true,
      fullWidth: true,
      legend: { position: 'bottom' },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';
            label += ": " + tooltipItem.yLabel;
            if (data.datasets[tooltipItem.datasetIndex].label == 'Cantidad') {
              return label + ' Unid';
            } else {
              return label + ' ha';
            }
          }
        }
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: (this.props.camposMeasures.length > 1) ? 'Cantidad(Unid) / Área Total(ha)' : (this.props.camposMeasures[0] == 'EntidadAgricUrbana.count') ? 'Cantidad(Unid)' : 'Área Total(ha)',
            fontColor: "#000"
          },
          ticks: {
            stepSize: 50,
            max: (data.datasets.length > 1) ?
              (typeof data.datasets[0] !== "undefined" && typeof data.datasets[1] !== "undefined") ?
                this.maxGrafico(Math.max(...data.datasets[0].data.concat(...data.datasets[1].data)))
                : 1000
              : (typeof data.datasets[0] !== "undefined") ?
                this.maxGrafico(Math.max(...data.datasets[0].data))
                : 1000,
            fontColor: "#000", // Cambiar color de labels
            beginAtZero: true
          }
        }]
      }
    };
    return <Bar data={data} options={options} plugins={[ChartDataLabels]} />;
  };

  lineRender = ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map(c => c.category),
      datasets: resultSet.series().map((s, index) => (
        {
          label: (s.title === 'Entidad Agric Urbana Area Total') ? 'Área Total' : 'Cantidad',
          data: s.series.map(r => ((r.value % 1) === 0) ? r.value : parseFloat(r.value).toFixed(2)),
          borderColor: COLORS_SERIES[index],
          fill: false
        }
      )),
    };
    const options = {
      plugins: {
        datalabels: {
          color: '#000',
          anchor: 'end',
          align: 'top',
          offset: 5,
          formatter: function (value, context) {
            return value;
          }
        }
      },
      responsive: true,
      fullWidth: true,
      legend: { position: 'bottom' },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';
            label += ": " + tooltipItem.yLabel;
            if (data.datasets[tooltipItem.datasetIndex].label == 'Cantidad') {
              return label + ' Unid';
            } else {
              return label + ' ha';
            }
          }
        }
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: (this.props.camposMeasures.length > 1) ? 'Cantidad(Unid) / Área Total(ha)' : (this.props.camposMeasures[0] == 'EntidadAgricUrbana.count') ? 'Cantidad(Unid)' : 'Área Total(ha)',
            fontColor: "#000"
          },
          ticks: {
            stepSize: 50,
            max: (data.datasets.length > 1) ?
              (typeof data.datasets[0] !== "undefined" && typeof data.datasets[1] !== "undefined") ?
                this.maxGrafico(Math.max(...data.datasets[0].data.concat(...data.datasets[1].data)))
                : 1000
              : (typeof data.datasets[0] !== "undefined") ?
                this.maxGrafico(Math.max(...data.datasets[0].data))
                : 1000,
            fontColor: "#000", // Cambiar color de labels
            beginAtZero: true
          }
        }]
      }
    };
    return <Line data={data} options={options} plugins={[ChartDataLabels]} />;
  };

  areaRender = ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map(c => c.category),
      datasets: resultSet.series().map((s, index) => (
        {
          label: (s.title === 'Entidad Agric Urbana Area Total') ? 'Área Total' : 'Cantidad',
          data: s.series.map(r => ((r.value % 1) === 0) ? r.value : parseFloat(r.value).toFixed(2)),
          backgroundColor: COLORS_SERIES[index]
        }
      )),
    };
    const options = {
      plugins: {
        datalabels: {
          color: '#000',
          anchor: 'end',
          align: 'top',
          offset: 5,
          formatter: function (value, context) {
            return value;
          }
        }
      },
      responsive: true,
      fullWidth: true,
      legend: { position: 'bottom' },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';
            label += ": " + tooltipItem.yLabel;
            if (data.datasets[tooltipItem.datasetIndex].label == 'Cantidad') {
              return label + ' Unid';
            } else {
              return label + ' ha';
            }
          }
        }
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            stacked: true,
            display: true,
            labelString: (this.props.camposMeasures.length > 1) ? 'Cantidad(Unid) / Área Total(ha)' : (this.props.camposMeasures[0] == 'EntidadAgricUrbana.count') ? 'Cantidad(Unid)' : 'Área Total(ha)',
            fontColor: "#000"
          },
          ticks: {
            stepSize: 50,
            max: (data.datasets.length > 1) ?
              (typeof data.datasets[0] !== "undefined" && typeof data.datasets[1] !== "undefined") ?
                this.maxGrafico(Math.max(...data.datasets[0].data.concat(...data.datasets[1].data)))
                : 1000
              : (typeof data.datasets[0] !== "undefined") ?
                this.maxGrafico(Math.max(...data.datasets[0].data))
                : 1000,
            fontColor: "#000", // Cambiar color de labels
            beginAtZero: true
          }
        }]
      }
    };
    return <Line data={data} options={options} plugins={[ChartDataLabels]} />;
  };

  pieRender = ({ resultSet }) => {
    var cantColores = resultSet['loadResponse']['data'];
    var COLORS_SERIES = [];
    cantColores.map(cc => COLORS_SERIES.push(dame_color_aleatorio()))
    const data = {
      labels: resultSet.categories().map(c => c.category),
      datasets: resultSet.series().map(s => (
        {
          label: (s.title === 'Entidad Agric Urbana Area Total') ? 'Área Total' : 'Cantidad',
          data: s.series.map(r => ((r.value % 1) === 0) ? r.value : parseFloat(r.value).toFixed(2)),
          backgroundColor: COLORS_SERIES,
          hoverBackgroundColor: COLORS_SERIES,
          pointStyle: 'circle'
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
            //console.log(context.dataset.label)
            return (context.dataset.label === 'Cantidad') ? value + ' Unid' : value + ' ha';
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
            if (data.labels.length && data.datasets.length) {
              return data.labels.map(function (label, i) {
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
            label += ": " + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return (data.datasets[0].label == 'Cantidad') ? label + ' Unid' : label + ' ha';
          }
        }
      },
    };
    return <Pie data={data} options={options} plugins={[ChartDataLabels]} />;
  };

  placeholderAux = (dataIndex) => {
    switch (dataIndex) {
      case 'EntidadAgricUrbana.nombre':
        return 'Nombre';
      case 'EntidadAgricUrbana.tecnologia':
        return 'Tecnología';
      case 'EntidadAgricUrbana.consejoPopular':
        return 'Consejo Popular';
      case 'EntidadAgricUrbana.ministerio':
        return 'Ministerio';
      case 'EntidadAgricUrbana.entidad':
        return 'Entidad';
      case 'EntidadAgricUrbana.productor':
        return 'Productor';
      default:
        break;
    }
  }

  aux = (data) => {
    if (data == null) {
      return true;
    } else {
      return false;
    }
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Buscar ` + this.placeholderAux(dataIndex)}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 210, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 100, marginRight: 8 }}
        >
          Buscar
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 100 }}>
          Eliminar Filtro
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      (this.aux(record[dataIndex])) ?
        false
        :
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  tableRender = ({ resultSet }) => {
    var tablepivotNew = resultSet.tablePivot();
    tablepivotNew.map((r, index) => {
      r['key'] = index;
      if (r['EntidadAgricUrbana.areaTotal']) {
        let num = r['EntidadAgricUrbana.areaTotal'];
        r['EntidadAgricUrbana.areaTotal'] = ((num % 1) === 0) ? num : parseFloat(num).toFixed(2);
      }
    })
    Object.keys(resultSet["loadResponse"]["annotation"]["dimensions"]).map((r, index) => {
      switch (r) {
        case 'EntidadAgricUrbana.nombre':
          resultSet["loadResponse"]["annotation"]["dimensions"]["EntidadAgricUrbana.nombre"]["title"] = "Nombre";
          break;
        case 'EntidadAgricUrbana.tecnologia':
          resultSet["loadResponse"]["annotation"]["dimensions"]["EntidadAgricUrbana.tecnologia"]["title"] = "Tecnología";
          break;
        case 'EntidadAgricUrbana.consejoPopular':
          resultSet["loadResponse"]["annotation"]["dimensions"]["EntidadAgricUrbana.consejoPopular"]["title"] = "Consejo Popular";
          break;
        case 'EntidadAgricUrbana.ministerio':
          resultSet["loadResponse"]["annotation"]["dimensions"]["EntidadAgricUrbana.ministerio"]["title"] = "Ministerio";
          break;
        case 'EntidadAgricUrbana.entidad':
          resultSet["loadResponse"]["annotation"]["dimensions"]["EntidadAgricUrbana.entidad"]["title"] = "Entidad";
          break;
        case 'EntidadAgricUrbana.productor':
          resultSet["loadResponse"]["annotation"]["dimensions"]["EntidadAgricUrbana.productor"]["title"] = "Productor";
          break;
        default:
          break;
      }
    })
    Object.keys(resultSet["loadResponse"]["annotation"]["measures"]).map((r, index) => {
      switch (r) {
        case 'EntidadAgricUrbana.areaTotal':
          resultSet["loadResponse"]["annotation"]["measures"]["EntidadAgricUrbana.areaTotal"]["title"] = "Área Total (ha)";
          break;
        case 'EntidadAgricUrbana.count':
          resultSet["loadResponse"]["annotation"]["measures"]["EntidadAgricUrbana.count"]["title"] = "Cantidad (Unid)";
          break;
        default:
          break;
      }
    })
    return (
      <Table
        className='tableResponsive'
        pagination={{ pageSize: 6 }}
        columns={resultSet.tableColumns().map(c => ({ ...c, dataIndex: c.key, ...this.getColumnSearchProps(c.key) }))}
        dataSource={tablepivotNew}
      />
    )
  }
  // tableRender = ({ resultSet }) => (
  //   <Table
  //     pagination={{ pageSize: 6 }}
  //     columns={resultSet.tableColumns().map(c => ({ ...c, dataIndex: c.key }))}
  //     dataSource={resultSet.tablePivot()}
  //   />

  // );

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
          "filters": (this.props.checkedA) ? [
            {
              "dimension": "EntidadAgricUrbana.municipio",
              "operator": "equals",
              "values": this.props.municipios
            },
            {
              "dimension": this.props.filtro,
              "operator": this.props.operador,
              "values": [
                this.props.valorFiltro
              ]
            }
          ] : [
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