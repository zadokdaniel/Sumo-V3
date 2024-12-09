import { z } from 'zod';

export const localeSchema = z.object({
  code: z.string(),
  currency: z.string(),
  symbol: z.string(),
  position: z.enum(['prefix', 'suffix']),
  separator: z.object({
    decimal: z.string(),
    thousand: z.string(),
  }),
});

export type LocaleConfig = z.infer<typeof localeSchema>;

export const locales: Record<string, LocaleConfig> = {
  'en-US': {
    code: 'en-US',
    currency: 'USD',
    symbol: '$',
    position: 'prefix',
    separator: {
      decimal: '.',
      thousand: ',',
    },
  },
  'he-IL': {
    code: 'he-IL',
    currency: 'ILS',
    symbol: '₪',
    position: 'suffix',
    separator: {
      decimal: '.',
      thousand: ',',
    },
  },
  'de-DE': {
    code: 'de-DE',
    currency: 'EUR',
    symbol: '€',
    position: 'suffix',
    separator: {
      decimal: ',',
      thousand: '.',
    },
  },
  'fr-FR': {
    code: 'fr-FR',
    currency: 'EUR',
    symbol: '€',
    position: 'suffix',
    separator: {
      decimal: ',',
      thousand: ' ',
    },
  },
};

export function formatNumber(
  value: number,
  locale: LocaleConfig,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    compact?: boolean;
  } = {}
): string {
  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    compact = false,
  } = options;

  let formattedValue: string;

  if (compact && value >= 1000) {
    const compactValue = value / 1000;
    formattedValue = formatNumber(compactValue, locale, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return `${formattedValue}K`;
  }

  // Format the number according to locale settings
  const parts = value.toFixed(maximumFractionDigits).split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, locale.separator.thousand);
  const decimalPart = parts[1] || '0'.repeat(minimumFractionDigits);

  formattedValue = `${integerPart}${locale.separator.decimal}${decimalPart}`;

  // Add currency symbol based on position
  return locale.position === 'prefix'
    ? `${locale.symbol}${formattedValue}`
    : `${formattedValue}${locale.symbol}`;
}

export function parseLocaleNumber(value: string, locale: LocaleConfig): number {
  // Remove currency symbol and any whitespace
  const cleanValue = value
    .replace(locale.symbol, '')
    .replace(/\s/g, '')
    .trim();

  // Replace locale-specific separators with standard format
  const standardized = cleanValue
    .replace(new RegExp(`\\${locale.separator.thousand}`, 'g'), '')
    .replace(locale.separator.decimal, '.');

  return parseFloat(standardized);
}