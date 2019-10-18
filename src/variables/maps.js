import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import React from 'react';
import { defaults } from 'ol/interaction';
import { defaults as defaultsControls, FullScreen } from 'ol/control';

class Maps1 extends React.Component {
    componentDidMount = () => {
        new Map({
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
                <div id="map" style={{ width: 'auto', height: '400px', borderRadius: '10px' }} />
            </div>
        );
    }
}
export default Maps1;