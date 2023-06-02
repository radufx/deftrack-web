import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import { addInterestZone, getUserInterestZones, updateZoneDetails } from '@utils/queries/interestZones';

const useInterestZones = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: interestZones, isLoading } = useQuery({
    queryKey: ['interest-zones', session?.user.sub],
    queryFn: () => getUserInterestZones({ userId: session?.user.sub! }),
    enabled: !!session?.user,
  });

  const {
    mutate,
    error,
    isLoading: isAddingLoading,
  } = useMutation({
    mutationFn: addInterestZone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interest-zones'] });
      toast.success('Interest zone succesfully created!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    },
    onError: () => {
      toast.error('Something went wrong.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    },
  });

  const {
    mutate: updateZoneDetailsMutate,
    error: updateZoneDetailsError,
    isLoading: isUpdatingLoading,
  } = useMutation({
    mutationFn: updateZoneDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interest-zones'] });
      toast.success('Your changes have been saved!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    },
    onError: () => {
      toast.error('Something went wrong.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    },
  });

  return {
    addInterestZone: mutate,
    updateZoneDetails: updateZoneDetailsMutate,
    error: error || updateZoneDetailsError,
    isLoading: isLoading || isAddingLoading || isUpdatingLoading,
    interestZones,
  };
};

export default useInterestZones;
