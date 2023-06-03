import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { addZoneRecords, getRecordImageSignedUrl, getZoneRecords } from '@utils/queries/records';
import { RecordInfo } from '@components/InterestZoneForm/InterestZoneForm';
import { Record } from '@/src/types/record';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { toast } from 'react-toastify';

const useRecords = (zone?: InterestZone) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { data: records, isLoading } = useQuery({
    queryKey: ['records', zone?.id],
    queryFn: () => getZoneRecords(zone?.id!),
    enabled: !!session?.user && !!zone?.id,
  });

  const uploadRecord = async (record: RecordInfo): Promise<Record> => {
    const body = {
      name: record.file.name,
      type: record.file.type,
      userId: session?.user.sub!,
      recordId: uuidv4(),
    };

    const { url } = await getRecordImageSignedUrl(body);

    const response = await axios.put(url, record.file, {
      headers: { 'Content-type': record.file.type, 'Access-Control-Allow-Origin': '*' },
    });
    const imageUrl = `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}${body.userId}/${body.recordId}`;

    return {
      id: body.recordId,
      userId: body.userId,
      zoneId: zone?.id!,
      image: imageUrl,
      description: '',
      notes: '',
      timestamp: record.timestamp,
      vegetationRate: 1,
    };
  };

  const uploadRecordsFn = async (records: RecordInfo[]) => {
    setIsUploading(true);

    try {
      const newRecords = await Promise.all(records.map((record) => uploadRecord(record)));
      await addZoneRecords(newRecords);

      queryClient.invalidateQueries({ queryKey: ['records', zone?.id] });
      toast.success('Records succesfully uploaded!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong uploading the records.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    records,
    isUploading,
    isLoading,
    uploadRecords: uploadRecordsFn,
  };
};

export default useRecords;
