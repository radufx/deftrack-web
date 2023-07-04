import { useState } from 'react';

import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input } from '@mui/material';

interface RecordFileInputProps {
  onFileSelect: (file: File, timestamp: number) => void;
}

const RecordFileInput = ({ onFileSelect }: RecordFileInputProps) => {
  const [uploadMode, setUploadMode] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(null);

  const onFileChange = (event: any) => {
    if (date) {
      onFileSelect(event.target.files[0], date?.getTime());
      setUploadMode(false);
    }
  };

  const onDateChange = (event: any) => {
    if (!event.target.value) setDate(null);
    else {
      const date = new Date(event.target.value);
      if (date.getTime() > Date.now() + 86400000) setDate(null);
      else setDate(date);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {!uploadMode ? (
        <>
          <FontAwesomeIcon icon={faCirclePlus} className="cursor-pointer" onClick={() => setUploadMode(true)} />
          <span className="text-gray-600">Add a record</span>
        </>
      ) : (
        <div className="flex w-full justify-between gap-8">
          <Button variant="contained" className="text-md w-full" component="label" disabled={date === null}>
            SELECT IMAGERY
            <input type="file" onChange={onFileChange} className="hidden" id="file" name="file" />
          </Button>
          <Input error={date === null} type="date" className="cursor-pointer" onChange={onDateChange} />
        </div>
      )}
    </div>
  );
};

export default RecordFileInput;
