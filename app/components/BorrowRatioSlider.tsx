import React from "react";

interface BorrowRatioSliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
}

const BorrowRatioSlider: React.FC<BorrowRatioSliderProps> = ({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
}) => {
    return (
        <div className="w-full">
            <div className="relative items-center w-full px-12" style={{height: 48}}>
                {/* Track background */}
                <div className="absolute top-1/2 left-0 w-full px-12 h-1 bg-muted rounded-full -translate-y-1/2 z-0" />
                {/* Colored track from center to thumb (left) */}
                {value < 50 && (
                    <div
                        className="absolute top-1/2 h-1 bg-primary rounded-full z-10"
                        style={{
                            left: `calc(${value}% + 0.5%)`,
                            width: `calc(50% - ${value}% )`,
                            transform: 'translateY(-50%)',
                        }}
                    />
                )}
                {/* Colored track from center to thumb (right) */}
                {value > 50 && (
                    <div
                        className="absolute top-1/2 h-1 bg-primary rounded-full z-10"
                        style={{
                            left: '50%',
                            width: `calc(${value}% - 50%)`,
                            transform: 'translateY(-50%)',
                        }}
                    />
                )}
                {/* Custom Thumb */}
                <div
                    className="absolute top-1/2 z-20"
                    style={{
                        left: `calc(${value}% + 0.5% - 8px)`, // 8px = half bar width
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                    }}
                >
                    <div className="w-4 h-8 rounded-full bg-neutral-100 border-4 border-primary flex items-center justify-center">
                    </div>
                </div>
                {/* Range Input (invisible, for interaction) */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={e => onChange(Number(e.target.value))}
                    className="absolute w-full h-9 top-0 left-0 opacity-0 cursor-pointer z-30"
                    aria-label="Borrow Ratio Slider"
                />
            </div>
            {/* Labels */}
            <div className="flex w-full justify-between text-neutral-400 text-m font-medium select-none">
                <span className='opacity-70'>100%</span>
                <span className='opacity-70'>75%</span>
                <span className={value <= 53 && value >= 47 ? 'text-neutral-600 font-bold' : 'opacity-70'}>50%</span>
                <span className='opacity-70'>75%</span>
                <span className='opacity-70'>100%</span>
            </div>
        </div>
    );
};

export default BorrowRatioSlider;
