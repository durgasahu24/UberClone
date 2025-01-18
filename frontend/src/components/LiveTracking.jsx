// LiveTracking.jsx
import { useRef ,useEffect} from 'react';
import VectorSource from 'ol/source/Vector';  // This should be in the JavaScript/JSX file
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';
import 'ol/ol.css';  // Import OpenLayers CSS


export const LiveTracking = ({ height = '100vh', width = '100%' }) => {
  const mapRef = useRef(null);

  useEffect(() => {
      const vectorSource = new VectorSource();
      const marker = new Feature({
          geometry: new Point(fromLonLat([-0.09, 51.505])),
      });

      marker.setStyle(
          new Style({
              image: new Icon({
                  src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                  scale: 0.05,
              }),
          })
      );

      vectorSource.addFeature(marker);

      const map = new Map({
          target: mapRef.current,
          layers: [
              new TileLayer({
                  source: new OSM(),
              }),
              new VectorLayer({
                  source: vectorSource,
              }),
          ],
          view: new View({
              center: fromLonLat([-0.09, 51.505]),
              zoom: 13,
          }),
      });

      navigator.geolocation.watchPosition(({ coords }) => {
          const newPosition = fromLonLat([coords.longitude, coords.latitude]);
          marker.getGeometry().setCoordinates(newPosition);
          map.getView().setCenter(newPosition);
      });

      return () => map.setTarget(null);
  }, []);

  return (
      <div
          ref={mapRef}
          style={{
              height: height,
              width: width,
              border: "1px solid #ccc", // Optional: For visibility during development
          }}
      />
  );
};
