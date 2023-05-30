'use client';

import useVisaSelect from '@/app/hooks/useVisaSelect';
import Select from 'react-select';

export type VisaSelectValue = {
	label: string;
	value: string;
};

interface VisaSelectProps {
	value?: VisaSelectValue;
	onChange: (value: VisaSelectValue) => void;
	title: string;
	subtitle: string;
}

const VisaSelect: React.FC<VisaSelectProps> = ({
	value,
	onChange,
	title,
	subtitle,
}) => {
	const { getAll } = useVisaSelect();

	return (
		<div className="flex flex-row items-start justify-between">
			<div className="flex flex-col">
				<div className="font-medium">{title}</div>
				<div className="font-light text-gray-600">{subtitle}</div>
			</div>
			<Select
				placeholder="Select an option"
				isClearable
				options={getAll()}
				value={value}
				onChange={(value) => onChange(value as VisaSelectValue)}
				formatOptionLabel={(option: any) => (
					<div className="flex flex-row items-center gap-3">
						<div>{option.label}</div>
					</div>
				)}
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

export default VisaSelect;
