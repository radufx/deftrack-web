import { useFormatter } from 'next-intl';

interface RecordFileInfoProps {
  name: string;
  timestamp: number;
}

const RecordFileInfo = ({ name, timestamp }: RecordFileInfoProps) => {
  const format = useFormatter();
  const now = new Date();
  const recordDate = new Date(timestamp);

  return (
    <div className="flex w-full justify-between">
      <span>{name}</span>
      <span className="font-medium">From {format.relativeTime(recordDate, now)}</span>
    </div>
  );
};

export default RecordFileInfo;
