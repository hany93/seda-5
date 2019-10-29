import React, { Component } from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Table, Spin, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

import 'antd/dist/antd.css';
import './campo.css'

const API_URL = "http://sed.enpa.vcl.minag.cu"; // change to your actual endpoint

const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjUxODE0NjMsImV4cCI6MTU2NTI2Nzg2M30.r3FYOTFyahrqGyE_BWF0HXeXlrDP8YDtWhWTRtehU0I",
    { apiUrl: API_URL + "/cubejs-api/v1" }
);

class gg extends Component {
    state = {
        searchText: '',
        columns: []
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

    // campoInvisible = (campo) => {
    //     if (campo == 'EntidadAgricUrbana.id') {
    //         return "className:\"hideCampo\", dataIndex:" + campo;
    //     } else {
    //         return "dataIndex:" + campo;
    //     }
    // }

    render() {
        return (
            <QueryRenderer
                query={{
                    "measures": [],
                    "timeDimensions": [],
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
                        }
                    ],
                    "dimensions": [
                        "EntidadAgricUrbana.nombre",
                        "EntidadAgricUrbana.tecnologia",
                        "EntidadAgricUrbana.consejoPopular",
                        "EntidadAgricUrbana.ministerio",
                        "EntidadAgricUrbana.entidad",
                        "EntidadAgricUrbana.productor",
                        "EntidadAgricUrbana.longitud",
                        "EntidadAgricUrbana.latitud"
                    ]
                }}
                cubejsApi={cubejsApi}
                render={({ resultSet, measures, availableMeasures, updateMeasures }) => {


                    if (resultSet) {

                        var tablepivotNew = resultSet.tablePivot();
                        tablepivotNew.map((r, index) => {
                            r['key'] = index;
                        })
                        resultSet["loadResponse"]["annotation"]["dimensions"]["EntidadAgricUrbana.nombre"]["title"] = "Nombre"
                        resultSet["loadResponse"]["annotation"]["dimensions"]["EntidadAgricUrbana.tecnologia"]["title"] = "Tecnología"
                        resultSet["loadResponse"]["annotation"]["dimensions"]["EntidadAgricUrbana.consejoPopular"]["title"] = "Consejo Popular"
                        resultSet["loadResponse"]["annotation"]["dimensions"]["EntidadAgricUrbana.ministerio"]["title"] = "Ministerio"
                        resultSet["loadResponse"]["annotation"]["dimensions"]["EntidadAgricUrbana.entidad"]["title"] = "Entidad"
                        resultSet["loadResponse"]["annotation"]["dimensions"]["EntidadAgricUrbana.productor"]["title"] = "Productor"
                        var array = resultSet.tableColumns().map(c => ({ ...c, className: (c.key == 'EntidadAgricUrbana.longitud' || c.key == 'EntidadAgricUrbana.latitud') ? 'campoHidden' : '', dataIndex: c.key, ...this.getColumnSearchProps(c.key) }));
                        // rowSelection object indicates the need for row selection
                        const rowSelection = {
                            onChange: (selectedRowKeys, selectedRows) => {
                                this.props.setSelectedKeys(selectedRows);
                            },
                        };
                        return (
                            <Table
                                className='tableResponsive'
                                pagination={{ pageSize: 6 }}
                                columns={array}
                                rowSelection={rowSelection}
                                dataSource={tablepivotNew}
                            />
                        )
                    } else {
                        return (<Spin />)
                    }
                }}
            />);
    }
}

export default gg;