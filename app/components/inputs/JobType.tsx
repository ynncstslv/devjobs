'use client';

import useJobType from '@/app/hooks/useJobType';
import Select from 'react-select';

export type JobTypeValue = {
	label: string;
	value: string;
};

interface JobTypeProps {
	value?: JobTypeValue;
	onChange: (value: JobTypeValue) => void;
	title: string;
	subtitle: string;
}

const JobType: React.FC<JobTypeProps> = ({
	value,
	onChange,
	title,
	subtitle,
}) => {
	const { getAll } = useJobType();

	return (
		<div className="flex flex-col items-start gap-4">
			<div className="flex flex-col">
				<div className="font-medium">{title}</div>
				<div className="font-light text-gray-600">{subtitle}</div>
			</div>
			<Select
				placeholder="Any"
				isClearable
				options={getAll()}
				value={value}
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
					colors: {
						...theme.colors,
						primary25: '#e4eeff',
					},
				})}
			/>
		</div>
	);
};

export default JobType;
