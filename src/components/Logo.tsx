import logoColor from '../assets/logo-activato-color.png';
import logoWhite from '../assets/logo-activato-white.png';

// Activato wordmark. Swaps to a white version in dark mode so it stays legible
// (the full-colour logo's blue text would disappear on a dark background).
// `className` from callers controls sizing (e.g. h-12 w-auto); the legacy
// fill-* utilities passed by Header/Footer are harmless no-ops on an <img>.
const Logo = ({ className, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <>
        <img
            src={logoColor}
            alt="Activato"
            className={`block dark:hidden ${className ?? ''}`}
            {...rest}
        />
        <img
            src={logoWhite}
            alt="Activato"
            className={`hidden dark:block ${className ?? ''}`}
            {...rest}
        />
    </>
);

export default Logo;
