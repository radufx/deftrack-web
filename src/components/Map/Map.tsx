import { useCallback, useState } from 'react';

import Loader from '@components/Loader/Loader';

import { useLoadScript, GoogleMap } from '@react-google-maps/api';

type MapT = google.maps.Map;

const center = {
  lat: 46.76950311942368,
  lng: 23.590049077867448,
};

const Map = () => {
  const [map, setMap] = useState<MapT | null>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  });

  const onLoad = useCallback(function callback(map: MapT) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    map.setZoom(2);
    // map.setMapTypeId('satellite');
    map.setOptions({ disableDoubleClickZoom: true, zoom: 20 });

    map.addListener('dblclick', (event: any) => {
      const marker = new google.maps.Marker({
        position: event.latLng,
        map,
        title: 'Click to zoom',
      });

      map.panTo(marker.getPosition() as google.maps.LatLng);
    });

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: MapT) {
    setMap(null);
  }, []);

  return (
    <div className="flex h-full w-full grow items-center justify-center">
      {!isLoaded ? (
        <Loader color="#83CB3D" size={86} />
      ) : (
        <GoogleMap onLoad={onLoad} onUnmount={onUnmount} mapContainerClassName="w-full h-full" zoom={2} center={center} />
      )}
    </div>
  );
};

export default Map;
