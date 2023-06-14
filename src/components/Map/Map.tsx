import { useCallback, useState } from 'react';

import Loader from '@components/Loader/Loader';
import useInterestZones from '@hooks/useInterestZones';
import ZoneMarker from '@components/ZoneMarker/ZoneMarker';
import InterestZoneModal from '@components/InterestZoneModal/InterestZoneModal';

import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import { useSession } from 'next-auth/react';
import { twMerge } from 'tailwind-merge';

type MapT = google.maps.Map;

const center = {
  lat: 46.76950311942368,
  lng: 23.590049077867448,
};

interface MapProps {
  readOnly?: boolean;
  centerTo?: { lat: number; lng: number };
  className?: string;
}

const Map = ({ readOnly = false, centerTo, className = '' }: MapProps) => {
  const [map, setMap] = useState<MapT | null>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  });
  const { interestZones } = useInterestZones();
  const [addZoneMarker, setAddZoneMarker] = useState<google.maps.Marker | null>(null);
  const { data: session } = useSession();

  const handleModalClose = () => {
    addZoneMarker?.setMap(null);
    setAddZoneMarker(null);
  };

  const onLoad = useCallback(function callback(map: MapT) {
    const bounds = new window.google.maps.LatLngBounds(centerTo ?? center);
    map.fitBounds(bounds);
    map.setZoom(2);
    map.setOptions({ disableDoubleClickZoom: true, zoom: 20 });

    !readOnly &&
      map.addListener('dblclick', (event: any) => {
        const marker = new google.maps.Marker({
          position: event.latLng,
          map,
        });
        setAddZoneMarker(marker);
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
        <GoogleMap
          onLoad={onLoad}
          onUnmount={onUnmount}
          mapContainerClassName={twMerge('w-full h-full', className)}
          zoom={2}
          center={centerTo ?? center}
        >
          {interestZones?.map((zone: InterestZone) => (
            <ZoneMarker zone={zone} key={zone.id} />
          ))}
          {addZoneMarker && (
            <InterestZoneModal
              open={true}
              handleClose={handleModalClose}
              zone={{
                lat: addZoneMarker.getPosition()?.lat(),
                lng: addZoneMarker.getPosition()?.lng(),
                userId: session?.user.sub,
              }}
            />
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
