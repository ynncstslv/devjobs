'use client';

import { FC } from 'react';

import Image from 'next/image';

import useCountries from '@/app/hooks/useCountries';

import { SafeUser } from '@/app/types';
import { IconType } from 'react-icons';

import HeartButton from '../HeartButton';
import ListingCategory from './ListingCategory';

interface ListingHeadProps {
	currentUser?: SafeUser | null;
	id: string;
	imageSrc: string;
	title: string;
	company: string;
	employeeCount: number;
	locationValue: string;
	category: { icon: IconType; label: string };
	xpLevelValue: string;
	xpCount: number;
	jobTypeValue: string;
	visaValue: string;
	salary: number;
}

const ListingHead: FC<ListingHeadProps> = ({
	currentUser,
	id,
	imageSrc,
	title,
	company,
	employeeCount,
	locationValue,
	category,
	xpLevelValue,
	xpCount,
	jobTypeValue,
	visaValue,
	salary,
}) => {
	const { getByValue } = useCountries();
	const location = getByValue(locationValue);

	return (
		<>
			<div className="w-full h-full">
				<div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-6">
					<div className="aspect-square w-[300px] relative rounded-xl overflow-hidden md:w-[350px] lg:w-[500px]">
						<Image
							src={imageSrc}
							alt="Image"
							className="w-full object-cover"
							fill
						/>
					</div>
					<div className="flex flex-col gap-8">
						<div className="flex flex-row items-center justify-between">
							<div className="font-bold text-4xl lg:text-6xl">{title}</div>
							<HeartButton currentUser={currentUser} listingId={id} />
						</div>
						<hr />
						<div className="flex flex-col gap-4">
							<div className="flex flex-row items-center gap-6">
								<div className="font-semibold text-xl lg:text-2xl text-blue-950">
									{company}
								</div>
								<div className="font-medium text-sm text-neutral-500 lg:text-md">
									{employeeCount} Employees
								</div>
							</div>
							<div className="font-md text-sm text-neutral-500 lg:text-lg">
								{location?.label}, {location?.region}
							</div>
						</div>
						<hr />
						<div className="w-full p-6 rounded-xl bg-neutral-100 lg:p-8">
							<div className="mb-6 font-bold text-xl">Job Info:</div>
							<div className="w-full grid grid-cols-2 items-center justify-between gap-4 lg:gap-x-[3rem] lg:gap-y-4">
								{category && (
									<ListingCategory
										icon={category.icon}
										label={category.label}
									/>
								)}
								<div className="font-semibold text-sm text-blue-600 lg:text-base">
									<span className="text-xs text-neutral-500 lg:pr-1.5 lg:text-sm">
										Salary:{' '}
									</span>
									$ {salary}{' '}
									<span className="text-xs text-neutral-500 lg:pr-1.5 lg:text-sm">
										/ Year
									</span>
								</div>
								<div className="font-semibold text-sm text-blue-600 lg:text-base">
									<span className="text-xs text-neutral-500 lg:pr-1.5 lg:text-sm">
										Experience Level:{' '}
									</span>
									{xpLevelValue}
								</div>
								<div className="font-semibold text-sm text-blue-600 lg:text-base">
									<span className="text-xs text-neutral-500 lg:pr-1.5 lg:text-sm">
										Years of Experience:{' '}
									</span>
									{xpCount}
								</div>
								<div className="font-semibold text-sm text-blue-600 lg:text-base">
									<span className="text-xs text-neutral-500 lg:pr-1.5 lg:text-sm">
										Job Type:{' '}
									</span>
									{jobTypeValue}
								</div>
								<div className="font-semibold text-sm text-blue-600 lg:text-base">
									<span className="text-xs text-neutral-500 lg:pr-1.5 lg:text-sm">
										Visa Sponsorship:{' '}
									</span>
									{visaValue}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ListingHead;
