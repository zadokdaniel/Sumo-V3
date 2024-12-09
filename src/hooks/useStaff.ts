import { useQuery, useMutation, useQueryClient } from 'react-query';
import { staffApi } from '../lib/api';
import { socketClient } from '../lib/socket';
import { EVENTS } from '../../server/constants';
import { CreateStaffInput, UpdateStaffInput } from '../../server/schemas/staff';

export function useStaff(shiftId: string) {
  const queryClient = useQueryClient();

  const { data: staff, isLoading, error } = useQuery(
    ['staff', shiftId],
    () => staffApi.getByShiftId(shiftId),
    {
      onSuccess: () => {
        // Subscribe to real-time updates
        socketClient.subscribe(EVENTS.STAFF_ADDED, ({ staff: newStaff }) => {
          queryClient.setQueryData(['staff', shiftId], (old: any[]) => [...old, newStaff]);
        });

        socketClient.subscribe(EVENTS.STAFF_UPDATED, (updatedStaff) => {
          queryClient.setQueryData(['staff', shiftId], (old: any[]) =>
            old.map((staff) => (staff.id === updatedStaff.id ? updatedStaff : staff))
          );
        });

        socketClient.subscribe(EVENTS.STAFF_REMOVED, (removedId) => {
          queryClient.setQueryData(['staff', shiftId], (old: any[]) =>
            old.filter((staff) => staff.id !== removedId)
          );
        });
      },
    }
  );

  const addMutation = useMutation(
    (data: CreateStaffInput) => staffApi.create(shiftId, data),
    {
      onMutate: async (newStaff) => {
        await queryClient.cancelQueries(['staff', shiftId]);
        const previousStaff = queryClient.getQueryData(['staff', shiftId]);

        queryClient.setQueryData(['staff', shiftId], (old: any[]) => [
          ...old,
          { id: 'temp-id', ...newStaff },
        ]);

        return { previousStaff };
      },
      onError: (err, newStaff, context: any) => {
        queryClient.setQueryData(['staff', shiftId], context.previousStaff);
      },
      onSettled: () => {
        queryClient.invalidateQueries(['staff', shiftId]);
      },
    }
  );

  const updateMutation = useMutation(
    ({ id, data }: { id: string; data: UpdateStaffInput }) =>
      staffApi.update(id, data),
    {
      onMutate: async ({ id, data }) => {
        await queryClient.cancelQueries(['staff', shiftId]);
        const previousStaff = queryClient.getQueryData(['staff', shiftId]);

        queryClient.setQueryData(['staff', shiftId], (old: any[]) =>
          old.map((staff) =>
            staff.id === id ? { ...staff, ...data } : staff
          )
        );

        return { previousStaff };
      },
      onError: (err, variables, context: any) => {
        queryClient.setQueryData(['staff', shiftId], context.previousStaff);
      },
      onSettled: () => {
        queryClient.invalidateQueries(['staff', shiftId]);
      },
    }
  );

  const deleteMutation = useMutation(
    (id: string) => staffApi.delete(id),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries(['staff', shiftId]);
        const previousStaff = queryClient.getQueryData(['staff', shiftId]);

        queryClient.setQueryData(['staff', shiftId], (old: any[]) =>
          old.filter((staff) => staff.id !== id)
        );

        return { previousStaff };
      },
      onError: (err, id, context: any) => {
        queryClient.setQueryData(['staff', shiftId], context.previousStaff);
      },
      onSettled: () => {
        queryClient.invalidateQueries(['staff', shiftId]);
      },
    }
  );

  return {
    staff,
    isLoading,
    error,
    addStaff: addMutation.mutate,
    updateStaff: updateMutation.mutate,
    deleteStaff: deleteMutation.mutate,
    isAdding: addMutation.isLoading,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
    addError: addMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
}