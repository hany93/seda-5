import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import React from 'react';
import { defaults } from 'ol/interaction';
import { defaults as defaultsControls, FullScreen } from 'ol/control';
import nuevoazul from 'assets/img/nuevoazul.png'
import Point from 'ol/geom/Point';
import { Style, Icon, Text, Fill, Circle, IconImage } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj.js';
import { Feature } from 'ol';

let mapa;

const iconStyle = new Style({
    image: new Circle({
        radius: 9,
        fill: new Fill({ color: 'red' })
    })
});
class Maps1 extends React.Component {

    componentWillReceiveProps = nextprops => {
        //console.log(nextprops.selectedKeys1)
        var array = nextprops.selectedKeys1;
        var markerss = [];
        console.log(array.length)
        if (array.length > 0) {
            array.map(a => {
                console.log(a['EntidadAgricUrbana.longitud'])
                //console.log(a['EntidadAgricUrbana.latitud'])
                var x = parseInt(a['EntidadAgricUrbana.longitud']);
                var y = parseInt(a['EntidadAgricUrbana.latitud']);
                var iconFeature = new Feature({
                    geometry: new Point(fromLonLat([x, y]))
                });
                iconFeature.setStyle(iconStyle);
                markerss.push(iconFeature)
            });
            var vectorsource = new VectorSource({
                features: markerss
            });
            var vectorLayer = new VectorLayer({
                source: vectorsource
            });

            mapa.addLayer(vectorLayer);
        }
        console.log('ya salio')
    }

    componentDidMount = () => {
        mapa = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'http://ide.enpa.minag.cu/geoserver/www/tms/2017/sat/{z}/{x}/{-y}.jpg'
                    })
                })
            ],
            view: new View({
                projection: 'EPSG:4326',
                center: [-79.8125, 22.742],
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
            })
        });
    };
    render() {
        return (
            <div>
                <div id="map" style={{ width: 'auto', height: '700px', borderRadius: '10px' }} />
            </div>
        );
    }
}
export default Maps1;