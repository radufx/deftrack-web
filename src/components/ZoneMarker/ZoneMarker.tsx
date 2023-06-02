import { useState } from 'react';

import { Marker } from '@react-google-maps/api';
import InterestZoneModal from '../InterestZoneModal/InterestZoneModal';

interface ZoneMarkerProps {
  zone: InterestZone;
}

const ZoneMarker = ({ zone }: ZoneMarkerProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <>
      <Marker onClick={handleOpen} position={{ lat: zone.lat, lng: zone.lng }} />
      <InterestZoneModal open={openModal} handleClose={handleClose} zone={zone} />
    </>
  );
};

export default ZoneMarker;
