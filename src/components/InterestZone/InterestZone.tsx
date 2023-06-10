import useRecords from '@/src/hooks/useRecords';
import PriorityTag from '@components/PriorityTag/PriorityTag';
import { useRouter } from 'next/router';

interface InterestZoneProps {
  zone: InterestZone;
}

const InterestZone = ({ zone }: InterestZoneProps) => {
  const { records } = useRecords(zone);
  const router = useRouter();

  const onZoneClick = () => {
    router.push(`/interest-zones/${zone.id}`);
  };

  return (
    <div
      onClick={onZoneClick}
      className="flex h-[240px] w-full max-w-[380px] cursor-pointer flex-col justify-between rounded-md border-[1px] border-[#bababaa9] px-4 py-2"
    >
      <div className="flex flex-col ">
        <div className="flex w-full items-center justify-between">
          <span className="text-2xl font-semibold">{zone.name}</span>
          <PriorityTag priority={zone.priority} />
        </div>
        <span className="pt-2 text-justify text-gray-900">
          {zone.description?.slice(0, 150)}
          {(zone.description?.length ?? 0) > 150 ? '...' : ''}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {records && records?.length > 0 && (
          <span className="font-medium">
            Most recent vegetation rate: {Math.floor(records[records?.length - 1].vegetationRate * 100)}%
          </span>
        )}
        <span className="text-gray-600">
          {zone.lat.toFixed(4)} {zone.lng.toFixed(4)}
        </span>
      </div>
    </div>
  );
};

export default InterestZone;
