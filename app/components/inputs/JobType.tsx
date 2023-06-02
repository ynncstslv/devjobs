'use client';

import { FC } from 'react';

import Select from 'react-select';

import useJobType from '@/app/hooks/useJobType';

export type JobTypeValue = {
	label: string;
};

interface JobTypeProps {
	title: string;
	subtitle: string;
	value?: JobTypeValue;
	onChange: (value: JobTypeValue) => void;
}

const JobType: FC<JobTypeProps> = ({ title, subtitle, value, onChange }) => {
	const { getAll } = useJobType();

	const options = getAll().map((item) => ({
		label: item.label,
	}));

	return (
		<div className="flex flex-col items-start gap-4">
			<div className="flex flex-col">
				<div className="font-medium">{title}</div>
				<div className="font-light text-gray-600">{subtitle}</div>
			</div>
			<Select
				value={value}
				options={options}
				placeholder="Any Type"
				onChange={(value) => onChange(value as JobTypeValue)}
				formatOptionLabel={(option: any) => (
					<div className="flex flex-row items-center gap-3">
						<div>{option.label}</div>
					</div>
				)}
				className="w-full"
				classNames={{
					control: () => 'p-3 border-2',
					input: () => 'text-lg',
					option: () => 'text-lg',
				}}
				theme={(theme) => ({
					...theme,
					borderRadius: 6,
					colors: { ...theme.colors, primary25: '#e4eeff' },
				})}
				isClearable
			/>
		</div>
	);
};

export default JobType;
