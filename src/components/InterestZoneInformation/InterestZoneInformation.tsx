import Image from 'next/image';
import { useState } from 'react';

import useRecords from '@/src/hooks/useRecords';
import { Record } from '@/src/types/record';
import PriorityTag from '@components/PriorityTag/PriorityTag';
import InterestZoneModal from '@components/InterestZoneModal/InterestZoneModal';
import Button from '@components/Button/Button';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import { useFormatter } from 'next-intl';

interface InterestZoneInformationProps {
  zone: InterestZone;
}

const RecordInfo = ({ record, index }: { record: Record; index: number }) => {
  const format = useFormatter();
  const recordDate = new Date(record.timestamp);

  return (
    <div className="flex flex-col leading-none">
      <Image src={record.image} width={200} height={200} className="cover mb-1" alt="image" />
      <span className="font-normal">Date: {format.dateTime(recordDate)}</span>
      <span className="items-center">
        Vegetation: ~<span className="font-semibold">{Math.floor(record.vegetationRate * 100)}%</span>
      </span>
    </div>
  );
};

const InterestZoneInformation = ({ zone }: InterestZoneInformationProps) => {
  const { records } = useRecords(zone);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <ScrollArea.Root className="h-full w-full overflow-hidden md:h-[calc(100vh-152px)]">
      <ScrollArea.Viewport className="h-full w-full">
        <div className="flex flex-col gap-4 p-8">
          <div className="flex w-full items-center justify-between rounded-sm border-b-[2px] border-gray-800 px-2 pb-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{zone.name}</span>
              <span className="-mt-1 text-gray-500">
                Location: {zone.lat.toFixed(4)} {zone.lng.toFixed(4)}
              </span>
            </div>
            {zone.priority !== 'unset' && (
              <div className="flex gap-2">
                <span className="text-md font-medium">Priority</span>
                <PriorityTag priority={zone.priority} />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 px-2">
            <span className="text-gray-500">Description</span>
            <span>{zone.description}</span>
          </div>
          {(records?.length ?? 0) > 0 && (
            <div className="flex flex-col px-2">
              <span className="mb-2 text-gray-500">History</span>
              <div className="flex w-full flex-wrap gap-5">
                {records?.map((record, index) => (
                  <RecordInfo record={record} key={record.id} index={index} />
                ))}
              </div>
              <Button onClick={handleOpen} className="mt-10">
                EDIT DETAILS
              </Button>
            </div>
          )}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" className="invisible">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <InterestZoneModal open={openModal} handleClose={handleClose} zone={zone} />
    </ScrollArea.Root>
  );
};

export default InterestZoneInformation;
