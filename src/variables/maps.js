import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import React from 'react';


var rasterLayercache = new TileLayer({
    //source: new OSM({
    projection: "EPSG:4326",
    source: new XYZ({
        //url: 'geocache/osmmapMapnik/{z}/{x}/{-y}.png'
        url: 'http://localhost/osmmapMapnik/{z}/{x}/{-y}.png'
    }),
    type: "base"
});

let map;

class Maps1 extends React.Component {
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
                center: [22.408987, -79.962018],
                zoom: 5
            })
        });
    };
    render() {
        return (
            <div>
                <div id="map" style={{ width: '100%', height: '400px' }} />
            </div>
        );
    }
}
export default Maps1;