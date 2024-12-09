import { supabase } from './supabase';
import type { Database } from './supabase';

type Shift = Database['public']['Tables']['shifts']['Row'];
type ShiftInsert = Database['public']['Tables']['shifts']['Insert'];
type ShiftUpdate = Database['public']['Tables']['shifts']['Update'];

type Staff = Database['public']['Tables']['staff']['Row'];
type StaffInsert = Database['public']['Tables']['staff']['Insert'];
type StaffUpdate = Database['public']['Tables']['staff']['Update'];

export const shiftsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('shifts')
      .select('*, rules(*), staff(*)');
    
    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('shifts')
      .select('*, rules(*), staff(*)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  create: async (data: ShiftInsert) => {
    const { data: shift, error } = await supabase
      .from('shifts')
      .insert([data])
      .select('*, rules(*), staff(*)')
      .single();
    
    if (error) throw error;
    return shift;
  },

  update: async (id: string, data: ShiftUpdate) => {
    const { data: shift, error } = await supabase
      .from('shifts')
      .update(data)
      .eq('id', id)
      .select('*, rules(*), staff(*)')
      .single();
    
    if (error) throw error;
    return shift;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('shifts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

export const staffApi = {
  getByShiftId: async (shiftId: string) => {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .eq('shiftId', shiftId);
    
    if (error) throw error;
    return data;
  },

  create: async (data: StaffInsert) => {
    const { data: staff, error } = await supabase
      .from('staff')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return staff;
  },

  update: async (id: string, data: StaffUpdate) => {
    const { data: staff, error } = await supabase
      .from('staff')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return staff;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('staff')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};