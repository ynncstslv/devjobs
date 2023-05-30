'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterTimesProps {
	title: string;
	subtitle: string;
	value: number;
	onChange: (value: number) => void;
}

const CounterTimes: React.FC<CounterTimesProps> = ({
	title,
	subtitle,
	value,
	onChange,
}) => {
	const onAddTimes = useCallback(() => {
		onChange(value + 5);
	}, [onChange, value]);

	const onReduceTimes = useCallback(() => {
		if (value === 5) {
			return;
		}

		onChange(value - 5);
	}, [value, onChange]);

	return (
		<div className="flex flex-row items-center justify-between">
			<div className="flex flex-col">
				<div className="font-medium">{title}</div>
				<div className="font-light text-gray-600">{subtitle}</div>
			</div>
			<div className="flex flex-row items-center gap-4">
				<div
					onClick={onReduceTimes}
					className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
				>
					<AiOutlineMinus />
				</div>
				<div className="font-light text-xl text-neutral-600">{value}</div>
				<div
					onClick={onAddTimes}
					className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
				>
					<AiOutlinePlus />
				</div>
			</div>
		</div>
	);
};

export default CounterTimes;
