import { Record } from '@/src/types/record';

import { useFormatter } from 'next-intl';

const RecordInformation = ({ record }: { record: Record }) => {
  const format = useFormatter();
  const now = new Date();
  const recordDate = new Date(record.timestamp);

  return (
    <div className="flex w-full items-center justify-between font-medium">
      <span className="items-center">
        Vegetation: ~<span className="font-semibold">{Math.floor(record.vegetationRate * 100)}%</span>
      </span>
      <span>From {format.relativeTime(recordDate, now)}</span>
    </div>
  );
};
export default RecordInformation;
