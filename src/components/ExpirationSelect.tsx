import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useHemmeligStore } from '../store/hemmeligStore';

interface ExpirationSelectProps {
    value?: number;
    onChange: (expiration?: number) => void;
}

export function ExpirationSelect({ value, onChange }: ExpirationSelectProps) {
    const { settings: instanceSettings } = useHemmeligStore();
    const { t } = useTranslation();

    const defaultExpirationInSeconds = instanceSettings?.defaultSecretExpiration
        ? instanceSettings.defaultSecretExpiration * 3600
        : undefined;

    // Activato policy: expiration locked to 3 days
    const baseOptions = [{ value: 259200, label: t('expiration.3_days') }];

    const options =
        defaultExpirationInSeconds &&
        !baseOptions.some((opt) => opt.value === defaultExpirationInSeconds)
            ? [
                  {
                      value: defaultExpirationInSeconds,
                      label: t('expiration.default_hours', {
                          hours: instanceSettings.defaultSecretExpiration,
                      }),
                  },
                  ...baseOptions,
              ]
            : baseOptions;

    return (
        <div className="relative">
            <select
                value={value !== undefined ? value : defaultExpirationInSeconds}
                onChange={(e) => onChange(parseInt(e.target.value))}
                disabled
                className="w-full appearance-none opacity-70 cursor-not-allowed bg-gray-100 dark:bg-dark-700/50 border border-gray-300 dark:border-dark-500/50 px-3 py-2 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-300 cursor-pointer hover:border-gray-300 dark:border-dark-500/50"
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="bg-gray-100 dark:bg-dark-700"
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-slate-400" />
            </div>
        </div>
    );
}
