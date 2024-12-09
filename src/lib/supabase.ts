import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hqywgkxinyscwznezmku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxeXdna3hpbnlzY3d6bmV6bWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjU2MDAsImV4cCI6MjAyNTQwMTYwMH0.zp1v56uxy8rdx5ypatb0ockcb9tr6a';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      shifts: {
        Row: {
          id: string;
          date: string;
          timePeriod: string;
          netTips: number;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          date: string;
          timePeriod: string;
          netTips: number;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: string;
          date?: string;
          timePeriod?: string;
          netTips?: number;
          updatedAt?: string;
        };
      };
      rules: {
        Row: {
          id: string;
          shiftId: string;
          intervals: number;
          multiplierValue: number;
          multiplierEnabled: boolean;
          provisionValue: number;
          provisionThreshold: number;
          provisionEnabled: boolean;
        };
        Insert: {
          id?: string;
          shiftId: string;
          intervals?: number;
          multiplierValue?: number;
          multiplierEnabled?: boolean;
          provisionValue?: number;
          provisionThreshold?: number;
          provisionEnabled?: boolean;
        };
        Update: {
          intervals?: number;
          multiplierValue?: number;
          multiplierEnabled?: boolean;
          provisionValue?: number;
          provisionThreshold?: number;
          provisionEnabled?: boolean;
        };
      };
      staff: {
        Row: {
          id: string;
          shiftId: string;
          name: string;
          type: string;
          startTime: string | null;
          endTime: string | null;
          breaks: number | null;
          expenses: number;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          shiftId: string;
          name: string;
          type: string;
          startTime?: string | null;
          endTime?: string | null;
          breaks?: number | null;
          expenses?: number;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          name?: string;
          type?: string;
          startTime?: string | null;
          endTime?: string | null;
          breaks?: number | null;
          expenses?: number;
          updatedAt?: string;
        };
      };
    };
  };
};