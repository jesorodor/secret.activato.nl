import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Logo from './Logo.tsx';
import { ThemeToggle } from './ThemeToggle';

export function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="mt-16 py-8 border-t border-gray-200 dark:border-dark-600">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Left - Dutch flag and tagline */}
                    <div className="flex items-center space-x-3">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <svg
                                className="w-5 h-3.5"
                                viewBox="0 0 22 16"
                                fill="none"
                                aria-label="Dutch flag"
                            >
                                <rect width="22" height="16" fill="#AE1C28" />
                                <rect y="5.333" width="22" height="5.333" fill="#FFFFFF" />
                                <rect y="10.666" width="22" height="5.334" fill="#21468B" />
                            </svg>
                            <span className="text-gray-500 dark:text-slate-400 text-xs group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
                                {t('footer.tagline')}
                            </span>
                        </Link>
                    </div>

                    {/* Right - logo (no link) + theme toggle */}
                    <div className="flex items-center space-x-3">
                        <Logo className="h-4 w-auto fill-current text-gray-500 dark:text-slate-400" />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </footer>
    );
}
