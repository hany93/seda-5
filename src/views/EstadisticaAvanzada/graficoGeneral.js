import React, { Component } from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Chart, Axis, Tooltip, Geom, Coord, Legend } from 'bizcharts';
import { Spin, Table } from 'antd';


const API_URL = "http://192.168.0.10:4000"; // change to your actual endpoint

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

  barRender = ({ resultSet }) => (
    <Chart scale={{ x: { tickCount: 8 } }} height={400} data={this.stackedChartData(resultSet)} forceFit>
      <Axis name="x" />
      <Axis name="measure" />
      <Tooltip />
      <Geom type="intervalStack" position={`x*measure`} color="color" />
    </Chart>
  );

  lineRender = ({ resultSet }) => (
    <Chart scale={{ x: { tickCount: 8 } }} height={400} data={this.stackedChartData(resultSet)} forceFit>
      <Axis name="x" />
      <Axis name="measure" />
      <Tooltip crosshairs={{ type: 'y' }} />
      <Geom type="line" position={`x*measure`} size={2} color="color" />
    </Chart>
  );

  areaRender = ({ resultSet }) => (
    <Chart scale={{ x: { tickCount: 8 } }} height={400} data={this.stackedChartData(resultSet)} forceFit>
      <Axis name="x" />
      <Axis name="measure" />
      <Tooltip crosshairs={{ type: 'y' }} />
      <Geom type="areaStack" position={`x*measure`} size={2} color="color" />
    </Chart>
  );

  pieRender = ({ resultSet }) => (
    <Chart height={400} data={resultSet.chartPivot()} forceFit>
      <Coord type='theta' radius={0.75} />
      {resultSet.seriesNames().map(s => (<Axis name={s.key} />))}
      <Legend position='right' />
      <Tooltip />
      {resultSet.seriesNames().map(s => (<Geom type="intervalStack" position={s.key} color="category" />))}
    </Chart>
  );

  tableRender = ({ resultSet }) => (
    <Table
      pagination={false}
      columns={resultSet.tableColumns().map(c => ({ ...c, dataIndex: c.key }))}
      dataSource={resultSet.tablePivot()}
    />

  );

  renderChart = (Component) => ({ resultSet, error }) => (
    (resultSet && <Component resultSet={resultSet} />) ||
    (error && error.toString()) ||
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
            //{
            //  "dimension": "SymAgricUrbanaPoint.municipio",
            //  "operator": "equals",
            //  "values": [
            //    this.props.municipio.charAt(0).toUpperCase() + this.props.municipio.slice(1)
            //    ]
            // }
          ]
        }}
        cubejsApi={cubejsApi}
        render={this.renderChart(this.state.tipoGraficFunction)}
      />);
  }

}

export default gg;