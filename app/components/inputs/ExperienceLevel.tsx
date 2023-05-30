'use client';

import useExperienceLevel from '@/app/hooks/useExperienceLevel';
import Select from 'react-select';

export type ExperienceLevelValue = {
	label: string;
	value: string;
};

interface ExperienceSelectProps {
	value?: ExperienceLevelValue;
	onChange: (value: ExperienceLevelValue) => void;
	title: string;
	subtitle: string;
}

const ExperienceLevel: React.FC<ExperienceSelectProps> = ({
	value,
	onChange,
	title,
	subtitle,
}) => {
	const { getAll } = useExperienceLevel();

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
				onChange={(value) => onChange(value as ExperienceLevelValue)}
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

export default ExperienceLevel;
