import React, { Component } from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { Table } from 'antd';
import "antd/dist/antd.css";

const API_URL = "http://192.168.0.10:4000"; // change to your actual endpoint

const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjUxODE0NjMsImV4cCI6MTU2NTI2Nzg2M30.r3FYOTFyahrqGyE_BWF0HXeXlrDP8YDtWhWTRtehU0I",
    { apiUrl: API_URL + "/cubejs-api/v1" }
);

class gg extends Component {

    state = {
        showGM: true,
        showGD: true
    }

    async componentDidMount() {
        const tt = await cubejsApi.load({
            "measures": [],
            "timeDimensions": [],
            "dimensions": [
                "SymAgricUrbanaPoint.municipio"
            ],
            "filters": []
        })
        console.log(tt["loadResponse"]["data"])
        var aux = []
        tt["loadResponse"]["data"].map((p) =>
            aux.push(p["SymAgricUrbanaPoint.municipio"])
        )
        console.log(aux)
    }

    //[0]["SymAgricUrbanaPoint.municipio"]

    render() {
        return (
            <QueryRenderer
                query={{
                    "measures": [
                        "SymAgricUrbanaPoint.count"
                    ],
                    "timeDimensions": [],
                    "filters": [
                        {
                            "dimension": "SymAgricUrbanaPoint.municipio",
                            "operator": "equals",
                            "values": this.props.municipios
                        }
                    ],
                    "dimensions": [
                        "SymAgricUrbanaPoint.tecnologia"
                    ]
                }}
                cubejsApi={cubejsApi}
                render={({ resultSet, measures, availableMeasures, updateMeasures }) => {
                    if (updateMeasures) {
                        //console.log(updateMeasures)
                    }

                    if (!resultSet) {
                        return (<Spin />)
                    }

                    if (resultSet) {

                        var tablepivotNew = resultSet.tablePivot();

                        resultSet["loadResponse"]["annotation"]["dimensions"]["SymAgricUrbanaPoint.tecnologia"]["title"] = "Tecnología:"
                        resultSet["loadResponse"]["annotation"]["measures"]["SymAgricUrbanaPoint.count"]["title"] = "Total"
                        return (
                            <div>
                                <Table
                                    pagination={false}
                                    columns={resultSet.tableColumns().map(c => ({ ...c, dataIndex: c.key }))}
                                    dataSource={tablepivotNew}
                                />
                            </div>
                        )
                    }
                }}
            />);
    }
}

export default gg;