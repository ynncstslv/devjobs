'use client';

import usePostJobModal from '@/app/hooks/usePostJobModal';
import Modal from './Modal';
import { useMemo, useState } from 'react';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
import CounterTimes from '../inputs/CounterTimes';
import ExperienceLevel from '../inputs/ExperienceLevel';
import VisaSelect from '../inputs/VisaSelect';
import JobType from '../inputs/JobType';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGE = 3,
	DESCRIPTION = 4,
	SALARY = 5,
}

const PostJobModal = () => {
	const router = useRouter();
	const postJobModal = usePostJobModal();

	const [step, setStep] = useState(STEPS.CATEGORY);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: '',
			location: null,
			imageSrc: '',
			xpCount: 1,
			employeeCount: 5,
			visaValue: null,
			xpLevelValue: null,
			jobTypeValue: null,
			salary: 1,
			title: '',
			description: '',
		},
	});

	const category = watch('category');
	const location = watch('location');
	const xpCount = watch('xpCount');
	const employeeCount = watch('employeeCount');
	const jobTypeValue = watch('jobTypeValue');
	const xpLevelValue = watch('xpLevelValue');
	const visaValue = watch('visaValue');
	const imageSrc = watch('imageSrc');

	const Map = useMemo(
		() => dynamic(() => import('../Map'), { ssr: false }),
		[location]
	);

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (step !== STEPS.SALARY) {
			return onNext();
		}

		setIsLoading(true);

		axios
			.post('/api/listings', data)
			.then(() => {
				toast.success('Listing Created!');
				router.refresh();
				reset();
				setStep(STEPS.CATEGORY);
				postJobModal.onClose();
			})
			.catch(() => {
				toast.error('Something went wrong.');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.SALARY) {
			return 'Create';
		}

		return 'Next';
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}

		return 'Back';
	}, [step]);

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Which of these best describes the main technology you are looking for?"
				subtitle="Pick a Category"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
				{categories.map((item) => (
					<div key={item.label} className="col-span-1">
						<CategoryInput
							onClick={(category) => setCustomValue('category', category)}
							selected={category === item.label}
							label={item.label}
							icon={item.icon}
						/>
					</div>
				))}
			</div>
		</div>
	);

	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Where is the job located?"
					subtitle="Help candidates find you!"
				/>
				<CountrySelect
					value={location}
					onChange={(value) => setCustomValue('location', value)}
				/>
				<Map center={location?.latlng} />
			</div>
		);
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8 max-h-[70vh] overflow-y-auto">
				<Heading
					title="What is the job?"
					subtitle="Share some information about your company and the job"
				/>
				<CounterTimes
					title="Company Size"
					subtitle="How many employees your company have?"
					value={employeeCount}
					onChange={(value) => setCustomValue('employeeCount', value)}
				/>
				<hr />
				<Counter
					title="Experience"
					subtitle="How many years of experience are you looking for?"
					value={xpCount}
					onChange={(value) => setCustomValue('xpCount', value)}
				/>
				<hr />
				<JobType
					title="Job Type"
					subtitle="What is the type of the job?"
					value={jobTypeValue}
					onChange={(value) => setCustomValue('jobTypeValue', value)}
				/>
				<hr />
				<ExperienceLevel
					title="Experience Level"
					subtitle="What is the experience level you are looking for?"
					value={xpLevelValue}
					onChange={(value) => setCustomValue('xpLevelValue', value)}
				/>
				<hr />
				<VisaSelect
					title="Visa Sponsorship"
					subtitle="Does it offer sponsorship?"
					value={visaValue}
					onChange={(value) => setCustomValue('visaValue', value)}
				/>
				<hr />
			</div>
		);
	}

	if (step === STEPS.IMAGE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Add a banner for your company"
					subtitle="Show your brand to the candidates!"
				/>
				<ImageUpload
					value={imageSrc}
					onChange={(value) => setCustomValue('imageSrc', value)}
				/>
			</div>
		);
	}

	if (step === STEPS.DESCRIPTION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="How would you describe the job?"
					subtitle="Short and objective works best!"
				/>
				<Input
					id="title"
					label="Title"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<hr />
				<Input
					id="description"
					label="Description"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}

	if (step === STEPS.SALARY) {
		bodyContent = (
			<div>
				<Heading
					title="Salary"
					subtitle="How much is the annual salary for this opening?"
				/>
				<Input
					id="salary"
					label="Salary"
					formatSalary
					type="number"
					register={register}
					disabled={isLoading}
					errors={errors}
					required
				/>
			</div>
		);
	}

	return (
		<Modal
			title="Post a Job"
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			isOpen={postJobModal.isOpen}
			onClose={postJobModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
		/>
	);
};

export default PostJobModal;
