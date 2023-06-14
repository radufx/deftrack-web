import { useState } from 'react';

import { useZodForm } from '@/src/hooks/useZodForm';
import { interestZoneSchema } from '@/src/utils/schemas/interestZone';
import Button from '@components/Button/Button';
import useInterestZones from '@/src/hooks/useInterestZones';
import Form from '@components/Form/Form';
import Loader from '@components/Loader/Loader';
import RecordFileInput from '@components/RecordFileInput/RecordFileInput';
import RecordFileInfo from '@components/RecordFileInfo/RecordFileInfo';
import useRecords from '@hooks/useRecords';
import RecordInformation from '@components/RecordInformation/RecordInformation';

import { MenuItem, Select, TextField } from '@mui/material';
import Link from 'next/link';

interface InterestZoneFormProps {
  zone: Partial<InterestZone>;
}

export interface RecordInfo {
  file: File;
  timestamp: number;
}

const InterestZoneForm = ({ zone }: InterestZoneFormProps) => {
  const form = useZodForm({
    schema: interestZoneSchema,
    mode: 'onChange',
    defaultValues: zone,
  });

  const { isValid } = form.formState;
  const { addInterestZone, isLoading, error, updateZoneDetails } = useInterestZones();
  const { isLoading: isLoadingRecords, isUploading, records, uploadRecords } = useRecords(zone as InterestZone);
  const [selectedFiles, setSelectedFiles] = useState<RecordInfo[]>([]);

  const submitForm = async (data: typeof interestZoneSchema._type) => {
    if (zone.id) {
      updateZoneDetails(
        { ...data, id: zone.id },
        {
          onSuccess: async () => {
            await uploadRecords(selectedFiles);
            setSelectedFiles([]);
          },
          onSettled: () => setSelectedFiles([]),
        }
      );
    } else {
      addInterestZone({ ...data, userId: zone.userId!, lat: zone.lat!, lng: zone.lng!, id: zone.id ?? '' });
    }
  };

  const onNewFileSelect = (file: File, timestamp: number) => {
    setSelectedFiles([
      ...selectedFiles,
      {
        file,
        timestamp,
      },
    ]);
  };

  return (
    <Form form={form} onSubmit={(data) => submitForm(data)} className="flex flex-col gap-4">
      <TextField label="Name" error={!!form.formState.errors.name} type="text" {...form.register('name')} variant="standard" />
      <TextField label="Description" type="text" {...form.register('description')} variant="standard" />
      <Select label="Priority" {...form.register('priority')} defaultValue={zone.priority ?? 'unset'}>
        <MenuItem value="unset">None</MenuItem>
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </Select>
      {zone.id && (
        <div className="flex w-full flex-col gap-[6px]">
          {isLoadingRecords ? (
            <Loader color="#8cd9b3" size={50} className="mx-auto" />
          ) : (
            <>
              {records?.map((record) => (
                <RecordInformation record={record} key={record.id} />
              ))}
              {selectedFiles.map((recordInfo: RecordInfo, index: number) => (
                <RecordFileInfo name={recordInfo.file.name} timestamp={recordInfo.timestamp} key={index} />
              ))}
              {<RecordFileInput onFileSelect={onNewFileSelect} />}
            </>
          )}
        </div>
      )}
      <Button type="submit" className="mt-2 gap-2" disabled={isLoading || !isValid}>
        {zone.id ? 'Update zone ' : 'Create zone'}
        {(isLoading || isUploading) && <Loader color="#8cd9b3" size={30} />}
      </Button>
      {zone?.id && (
        <Link className="mx-auto" href={`/interest-zones/${zone.id}`}>
          View history
        </Link>
      )}
    </Form>
  );
};

export default InterestZoneForm;
