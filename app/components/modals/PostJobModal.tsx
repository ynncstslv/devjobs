'use client';

import { useMemo, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { toast } from 'react-hot-toast';

import usePostJobModal from '@/app/hooks/usePostJobModal';

import axios from 'axios';

import Heading from '../Heading';
import Modal from './Modal';

import { categories } from '../navbar/Categories';

import CategoryInput from '../inputs/CategoryInput';
import Counter from '../inputs/Counter';
import CounterFive from '../inputs/CounterFive';
import CountrySelect from '../inputs/CountrySelect';
import ExperienceLevel from '../inputs/ExperienceLevel';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import JobType from '../inputs/JobType';
import Textarea from '../inputs/Textarea';
import VisaSelect from '../inputs/VisaSelect';

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	COMPANY = 3,
	IMAGE = 4,
	DESCRIPTION = 5,
	SALARY = 6,
}

const PostJobModal = () => {
	const router = useRouter();

	const postJobModal = usePostJobModal();

	const [isLoading, setIsLoading] = useState(false);
	const [step, setStep] = useState(STEPS.CATEGORY);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			title: '',
			description: '',
			imageSrc: '',
			category: '',
			company: '',
			employeeCount: 5,
			xpCount: 1,
			location: null,
			visaValue: null,
			xpLevelValue: null,
			jobTypeValue: null,
			salary: 1,
		},
	});

	const imageSrc = watch('imageSrc');
	const category = watch('category');
	const employeeCount = watch('employeeCount');
	const xpCount = watch('xpCount');
	const location = watch('location');
	const visaValue = watch('visaValue');
	const xpLevelValue = watch('xpLevelValue');
	const jobTypeValue = watch('jobTypeValue');

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
		if (step !== STEPS.SALARY) return onNext();

		setIsLoading(true);

		axios
			.post('/api/listings', data)
			.then(() => {
				toast.success('Job Created!');
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
		if (step === STEPS.SALARY) return 'Create';

		return 'Next';
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) return undefined;

		return 'Back';
	}, [step]);

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Pick a Category!"
				subtitle="Which of these best describes the main technology you are looking for?"
				center
			/>
			<div className="max-h-[50vh] grid grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
				{categories.map((item) => (
					<div key={item.label} className="col-span-1">
						<CategoryInput
							icon={item.icon}
							label={item.label}
							selected={category === item.label}
							onClick={(category) => setCustomValue('category', category)}
						/>
					</div>
				))}
			</div>
		</div>
	);

	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading title="Location" subtitle="Where is the job located?" center />
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
			<div className="flex flex-col gap-8">
				<Heading
					title="Job Information"
					subtitle="Share some information about this position."
					center
				/>
				<JobType
					title="Job Type"
					subtitle="What type of job is this?"
					value={jobTypeValue}
					onChange={(value) => setCustomValue('jobTypeValue', value)}
				/>
				<hr />
				<ExperienceLevel
					title="Experience Level"
					subtitle="What experience level would suit this position?"
					value={xpLevelValue}
					onChange={(value) => setCustomValue('xpLevelValue', value)}
				/>
				<hr />
				<Counter
					title="Experience"
					subtitle="How many years of experience a candidate should have for this job?"
					value={xpCount}
					onChange={(value) => setCustomValue('xpCount', value)}
				/>
			</div>
		);
	}

	if (step === STEPS.COMPANY) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Company"
					subtitle="Share a little about your company."
					center
				/>
				<Input
					id="company"
					label="Company Name"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<hr />
				<VisaSelect
					title="Visa Sponsorship"
					subtitle="Does your company offer visa sponsorship?"
					value={visaValue}
					onChange={(value) => setCustomValue('visaValue', value)}
				/>
				<hr />
				<CounterFive
					title="Company Size"
					subtitle="How many employees does your company have?"
					value={employeeCount}
					onChange={(value) => setCustomValue('employeeCount', value)}
				/>
			</div>
		);
	}

	if (step === STEPS.IMAGE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Company's Logo"
					subtitle="Sharing your logo makes it easier to identify you!"
					center
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
					title="Job Description"
					subtitle="A short name works best (E.g.: Software Engineer)."
					center
				/>
				<Input
					id="title"
					label="Job Title"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<Textarea
					id="description"
					label="Job Description"
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
					subtitle="How much is the annual income for this position?"
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
			body={bodyContent}
			isOpen={postJobModal.isOpen}
			actionLabel={actionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			secondaryActionLabel={secondaryActionLabel}
			onSubmit={handleSubmit(onSubmit)}
			onClose={postJobModal.onClose}
		/>
	);
};

export default PostJobModal;
