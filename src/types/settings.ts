export type SettingMode = 'auto' | 'off' | 'on' | 'static';

export interface SettingModeConfig {
  mode: SettingMode;
  value: string | number;
  label: string;
  effectiveStatus?: string;
  details?: string;
  amount?: number;
}

export interface SettingModeColors {
  auto: {
    badge: string;
    text: string;
  };
  on: {
    badge: string;
    text: string;
  };
  off: {
    badge: string;
    text: string;
  };
  static: {
    badge: string;
    text: string;
  };
}