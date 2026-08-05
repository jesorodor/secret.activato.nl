interface ViewsSliderProps {
    value: number;
    onChange: (value: number) => void;
}

// Activato policy: max views locked to 1
export function ViewsSlider(_props: ViewsSliderProps) {
    return (
        <div className="flex items-center gap-3">
            <input
                type="number"
                value={1}
                disabled
                readOnly
                className="w-16 px-2 py-1 bg-gray-100 dark:bg-dark-700/50 border border-gray-300 dark:border-dark-500/50 text-gray-900 dark:text-slate-100 text-center opacity-70 cursor-not-allowed text-sm"
            />
            <span className="text-xs text-gray-500 dark:text-slate-400">
                Locked to a single view
            </span>
        </div>
    );
}
