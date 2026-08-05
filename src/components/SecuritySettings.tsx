import { Key } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHemmeligStore } from '../store/hemmeligStore';
import { useSecretStore } from '../store/secretStore';
import { Card } from './Card';
import { ToggleSwitch } from './ToggleSwitch';

// Activato policy: security section reduced to password protection only.
// Expiration (3 days) and max views (1) are hard-locked server-side and hidden.
export function SecuritySettings() {
    const { password, setSecretData } = useSecretStore();
    const { settings: instanceSettings } = useHemmeligStore();
    const { t } = useTranslation();
    const [isPasswordEnabled, setIsPasswordEnabled] = useState(!!password);

    // If the instance disables password protection, render nothing at all.
    if (!instanceSettings.allowPasswordProtection) {
        return null;
    }

    return (
        <Card noPadding className="p-5 sm:p-6" hover>
            <div className="space-y-3">
                {/* Password Protection */}
                <div className="p-4 bg-gray-50 dark:bg-dark-700/30 border border-gray-100 dark:border-dark-600/50 transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-900/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                            <div className="w-8 h-8 flex items-center justify-center bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                                <Key className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-slate-200">
                                {t('security_settings.password_protection_title')}
                            </span>
                        </div>
                        <ToggleSwitch
                            checked={isPasswordEnabled}
                            onChange={(val) => {
                                setIsPasswordEnabled(val);
                                if (!val) setSecretData({ password: null });
                            }}
                        />
                    </div>

                    {isPasswordEnabled && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-500/50">
                            <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">
                                {t('security_settings.password_protection_description')}
                            </p>
                            <input
                                type="text"
                                value={password || ''}
                                onChange={(e) => setSecretData({ password: e.target.value })}
                                placeholder={t('security_settings.password_placeholder')}
                                minLength={5}
                                className={`w-full px-3 py-2 bg-white dark:bg-dark-600 border text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                                    password && password.length > 0 && password.length < 5
                                        ? 'border-red-500 dark:border-red-500 focus:ring-red-500/30'
                                        : 'border-gray-300 dark:border-dark-500 focus:ring-blue-500/30 focus:border-blue-500'
                                }`}
                            />
                            {password && password.length > 0 && password.length < 5 ? (
                                <p className="text-xs text-red-500 mt-2">
                                    {t('security_settings.password_error')}
                                </p>
                            ) : (
                                <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
                                    {t('security_settings.password_hint')}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
