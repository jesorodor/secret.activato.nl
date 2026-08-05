interface ViewsSliderProps {
    value: number;
    onChange: (value: number) => void;
}

// Activato policy: max views is administrator-controlled and locked to 1.
// Shown disabled/grayed so users can see the value but cannot change it.
export function ViewsSlider({ value }: ViewsSliderProps) {
    return (
        <div className="flex items-center gap-3 opacity-60">
            <input
                type="range"
                min="1"
                max="999"
                value={value}
                disabled
                title="Set by administrator"
                className="flex-1 h-2 bg-gray-200 dark:bg-dark-600 appearance-none cursor-not-allowed slider touch-manipulation"
            />
            <input
                type="number"
                min="1"
                max="999"
                value={value}
                disabled
                readOnly
                title="Set by administrator"
                className="w-16 px-2 py-1 bg-gray-100 dark:bg-dark-700/50 border border-gray-300 dark:border-dark-500/50 text-gray-900 dark:text-slate-100 text-center cursor-not-allowed text-sm"
            />
        </div>
    );
}
