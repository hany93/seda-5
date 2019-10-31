import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import React from 'react';
import { defaults } from 'ol/interaction';
import { defaults as defaultsControls, FullScreen } from 'ol/control';
import nuevoazul from 'assets/img/location.png'
import Point from 'ol/geom/Point';
import { Style, Icon, Text, Fill } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';

let mapa;

var tileLayer = new TileLayer({
    source: new XYZ({
        url: 'http://ide.enpa.minag.cu/geoserver/www/tms/2017/sat/{z}/{x}/{-y}.jpg',
    })
})

class Maps1 extends React.Component {

    componentDidMount = () => {
        mapa = new Map({
            target: 'map',
            layers: [
                tileLayer
            ],
            view: new View({
                center: fromLonLat([-80.1390444444445, 22.3754027777778]),
                zoom: 6
            }),
            controls: defaultsControls({
                rotate: false,
                fullScreen: true
            }).extend([new FullScreen()]),
            interactions: defaults({
                doubleClickZoom: true,
                dragAndDrop: true,
                keyboardPan: true,
                keyboardZoom: false,
                mouseWheelZoom: false,
                pointer: true,
                select: true
            }),
            // loadTilesWhileAnimating: true
        });
    };

    componentWillReceiveProps = nextprops => {
        var array = nextprops.selectedKeys1;
        var arregloDePuntos = [];

        if (!array.length) {
            var layers = mapa.getLayers()
            if (layers["array_"].length > 1) {
                mapa.removeLayer(layers["array_"][1]);
            }
        } else {
            var layers = mapa.getLayers()
            if (layers["array_"].length > 1) {
                mapa.removeLayer(layers["array_"][1]);
            }
            array.map(a => {
                var x = parseInt(a['EntidadAgricUrbana.longitud']);
                var y = parseInt(a['EntidadAgricUrbana.latitud']);
                var iconFeature = new Feature({
                    geometry: new Point(fromLonLat([a['EntidadAgricUrbana.longitud'], a['EntidadAgricUrbana.latitud']]))
                });
                iconFeature.setStyle(new Style({
                    image: new Icon /** @type {module:ol/style/Icon~Options} */({
                        anchor: [0.5, 35],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: nuevoazul
                    }),
                    text: new Text({
                        text: a['EntidadAgricUrbana.nombre'].toString().trim(),
                        font: 'bold 15px Open Sans',
                        //font: 'bold 20px "Open Sans", "Arial Unicode MS", "sans-serif"',
                        fill: new Fill({
                            color: '#fff'
                        }),
                        offsetX: 0,
                        offsetY: 4,
                        maxAngle: 90,
                        placement: 400
                    })
                }));
                arregloDePuntos.push(iconFeature)
            });
            var vectorsource = new VectorSource({
                features: arregloDePuntos
            });
            var vectorLayer = new VectorLayer({
                source: vectorsource
            });
            mapa.addLayer(vectorLayer);
        }
    }

    render() {
        return (
            <div>
                <div id="map" style={{ width: 'auto', height: '700px', borderRadius: '10px' }} />
            </div>
        );
    }
}
export default Maps1;