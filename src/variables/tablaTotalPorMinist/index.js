import React, { Component } from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Table, Spin } from 'antd';
import "antd/dist/antd.css";

const API_URL = "http://192.168.0.10:4000"; // change to your actual endpoint

const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjUxODE0NjMsImV4cCI6MTU2NTI2Nzg2M30.r3FYOTFyahrqGyE_BWF0HXeXlrDP8YDtWhWTRtehU0I",
    { apiUrl: API_URL + "/cubejs-api/v1" }
);

class gg extends Component {

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
                            "dimension": "SymAgricUrbanaPoint.provincia",
                            "operator": "equals",
                            "values": [
                                'Villa Clara'
                            ]
                        },
                        {
                            "dimension": "SymAgricUrbanaPoint.municipio",
                            "operator": "equals",
                            "values": [
                                'Remedios',
                                'Santa Clara'
                            ]
                        }
                    ],
                    "dimensions": [
                        "SymAgricUrbanaPoint.ministerio"
                    ]
                }}
                cubejsApi={cubejsApi}
                render={({ resultSet, measures, availableMeasures, updateMeasures }) => {
                    if (!resultSet) {
                        return (<Spin />)
                    }

                    if (resultSet) {
                        var tablepivotNew = resultSet.tablePivot();
                        resultSet["loadResponse"]["annotation"]["dimensions"]["SymAgricUrbanaPoint.ministerio"]["title"] = "Pertenecen a:"
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