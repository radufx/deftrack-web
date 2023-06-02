import InterestZoneForm from '@components/InterestZoneForm/InterestZoneForm';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

interface InterestZoneModalProps {
  open: boolean;
  handleClose: () => void;
  zone: Partial<InterestZone>;
}

const InterestZoneModal = ({ open, handleClose, zone }: InterestZoneModalProps) => {
  const methods = useForm();

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="absolute left-[50%] top-[50%] flex w-full max-w-[400px] translate-x-[-50%] translate-y-[-50%] flex-col gap-3 rounded-md bg-white px-4 py-6">
        <FontAwesomeIcon icon={faClose} onClick={handleClose} className="absolute right-4 top-3 cursor-pointer text-xl" />
        <span className="text-center text-lg font-semibold">{zone.id ? 'Edit zone details' : 'Fill in zone details'}</span>
        <FormProvider {...methods}>
          <InterestZoneForm zone={zone} />
        </FormProvider>
      </div>
    </Modal>
  );
};

export default InterestZoneModal;
