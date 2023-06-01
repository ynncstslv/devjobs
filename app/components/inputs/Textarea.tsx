'use client';

import { FC } from 'react';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface TextareaProps {
	id: string;
	label: string;
	required?: boolean;
	disabled?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const Textarea: FC<TextareaProps> = ({
	id,
	label,
	required,
	disabled,
	register,
	errors,
}) => {
	return (
		<div className="w-full relative">
			<textarea
				id={id}
				placeholder=" "
				className={`peer w-full h-[30vh] p-7 pt-6 font-light border-2 rounded-lg outline-none bg-white overflow-y-auto resize-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
					errors[id]
						? 'border-rose-500 focus:border-rose-500'
						: 'border-neutral-300 focus:border-black'
				}`}
				{...register(id, { required })}
				disabled={disabled}
			/>
			<label
				className={`absolute top-5 left-7 text-sm transform origin-[0] -translate-y-3 duration-150 z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
					errors[id] ? 'text-rose-500' : 'text-zinc-400'
				}`}
			>
				{label}
			</label>
		</div>
	);
};

export default Textarea;
