import { useZodForm } from '@/src/hooks/useZodForm';
import { interestZoneSchema } from '@/src/utils/schemas/interestZone';
import Button from '@components/Button/Button';
import useInterestZones from '@/src/hooks/useInterestZones';
import Form from '@components/Form/Form';
import Loader from '@components/Loader/Loader';

import { MenuItem, Select, TextField } from '@mui/material';

interface InterestZoneFormProps {
  zone: Partial<InterestZone>;
}

const InterestZoneForm = ({ zone }: InterestZoneFormProps) => {
  const form = useZodForm({
    schema: interestZoneSchema,
    mode: 'onChange',
    defaultValues: zone,
  });

  const { isValid } = form.formState;
  const { addInterestZone, isLoading, error, updateZoneDetails } = useInterestZones();

  const submitForm = (data: typeof interestZoneSchema._type) => {
    if (zone.id) {
      updateZoneDetails({ ...data, id: zone.id });
    } else {
      addInterestZone({ ...data, userId: zone.userId!, lat: zone.lat!, lng: zone.lng!, id: zone.id ?? '' });
    }
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
      <Button type="submit" className="gap-2" disabled={isLoading || !isValid}>
        {zone.id ? 'Update zone ' : 'Create zone'}
        {isLoading && <Loader color="#8cd9b3" size={30} />}
      </Button>
    </Form>
  );
};

export default InterestZoneForm;
