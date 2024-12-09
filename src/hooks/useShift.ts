import { useQuery, useMutation, useQueryClient } from 'react-query';
import { shiftsApi } from '../lib/api';
import { socketClient } from '../lib/socket';
import { EVENTS } from '../../server/constants';
import { CreateShiftInput, UpdateShiftInput } from '../../server/schemas/shift';

export function useShift(id: string) {
  const queryClient = useQueryClient();

  const { data: shift, isLoading, error } = useQuery(
    ['shift', id],
    () => shiftsApi.getById(id),
    {
      onSuccess: (data) => {
        // Subscribe to real-time updates when shift data is loaded
        socketClient.subscribe(EVENTS.SHIFT_UPDATED, (updatedShift) => {
          if (updatedShift.id === id) {
            queryClient.setQueryData(['shift', id], updatedShift);
          }
        });
      },
      onError: (error) => {
        console.error('Error fetching shift:', error);
      },
    }
  );

  const updateMutation = useMutation(
    (data: UpdateShiftInput) => shiftsApi.update(id, data),
    {
      onMutate: async (newData) => {
        // Cancel outgoing refetches
        await queryClient.cancelQueries(['shift', id]);

        // Snapshot the previous value
        const previousShift = queryClient.getQueryData(['shift', id]);

        // Optimistically update to the new value
        queryClient.setQueryData(['shift', id], (old: any) => ({
          ...old,
          ...newData,
        }));

        return { previousShift };
      },
      onError: (err, newData, context: any) => {
        // If the mutation fails, use the context returned from onMutate to roll back
        queryClient.setQueryData(['shift', id], context.previousShift);
      },
      onSettled: () => {
        // Always refetch after error or success
        queryClient.invalidateQueries(['shift', id]);
      },
    }
  );

  return {
    shift,
    isLoading,
    error,
    updateShift: updateMutation.mutate,
    isUpdating: updateMutation.isLoading,
    updateError: updateMutation.error,
  };
}