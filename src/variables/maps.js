import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import React from 'react';
import { defaults } from 'ol/interaction';
import { defaults as defaultsControls, FullScreen } from 'ol/control';
import nuevoazul from 'assets/img/nuevoazul.png'
import Point from 'ol/geom/Point';
import { Style, Icon, Text, Fill, Stroke, IconImage } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj.js';
import { Feature } from 'ol';

let map;

const iconStyle = new Style({
    image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: nuevoazul
    }),
    text: new Text({
        text: 'Bienvenido a Londres',
        font: 'bold 15px Open Sans',
        //font: 'bold 20px "Open Sans", "Arial Unicode MS", "sans-serif"',
        fill: new Fill({
            color: 'blue'
        }),
        offsetX: 100,
        offsetY: 8
    })
});
class Maps1 extends React.Component {

    componentWillReceiveProps = (nextprops) => {
        //console.log(nextprops.selectedKeys1)
        var array = nextprops.selectedKeys1;
        array.map(a => {
            console.log(a['EntidadAgricUrbana.longitud'])
            console.log(a['EntidadAgricUrbana.latitud'])
            var iconFeature = new Feature({
                geometry: new Point(fromLonLat([a['EntidadAgricUrbana.longitud'], a['EntidadAgricUrbana.latitud']])),
                population: 4000,
                rainfall: 500
            });

            iconFeature.setStyle(iconStyle);

            var vectorSource = new VectorSource({
                features: [iconFeature]
            });

            var vectorLayer = new VectorLayer({
                source: vectorSource
            });

            map.addLayer(vectorLayer);
        });
    }

    componentDidMount = () => {
        map = new Map({
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