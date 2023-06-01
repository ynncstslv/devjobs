'use client';

import { FC, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';

import { SafeListing, SafeUser } from '@/app/types';

import useCountries from '@/app/hooks/useCountries';

import { Listing } from '@prisma/client';

import Button from '../Button';
import HeartButton from '../HeartButton';

interface ListingCardProps {
	currentUser: SafeUser | null;
	data: SafeListing;
	actionId?: string;
	actionLabel?: string;
	disabled?: boolean;
	onAction?: (id: string) => void;
}

const ListingCard: FC<ListingCardProps> = ({
	currentUser,
	data,
	actionId = '',
	actionLabel,
	disabled,
	onAction,
}) => {
	const router = useRouter();

	const { getByValue } = useCountries();

	const location = getByValue(data.locationValue);

	return (
		<div
			className="group col-span-1 cursor-pointer"
			onClick={() => router.push(`/listings/${data.id}`)}
		>
			<div className="w-full flex flex-col gap-2 p-4 border-[1px] border-neutral-200 rounded-lg shadow-sm group-hover:shadow-lg">
				<div className="flex flex-row items-center gap-5">
					<div className="aspect-square w-[100px] relative rounded-xl overflow-hidden">
						<Image
							src={data.imageSrc}
							alt="Listing Logo"
							className="w-full h-full object-cover transition group-hover:scale-110"
							fill
						/>
					</div>
					<div className="flex flex-col gap-1">
						<div className="font-light text-sm text-neutral-600">
							{data.company}
						</div>
						<div className="font-bold text-lg">{data.title}</div>
						<div className="font-light text-xs text-neutral-500">
							{location?.label}, {location?.region}
						</div>
						<div className="font-semibold text-md text-neutral-800/80">
							$ {data.salary}{' '}
							<span className="font-light text-neutral-500">/ Year</span>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between mt-6 text-[11px] font-light text-neutral-100">
					<div className="flex items-center justify-start gap-2">
						<div className="rounded-md bg-blue-950 py-2 px-3">
							{data.category}
						</div>
						<div className="rounded-md bg-blue-950 py-2 px-3">
							{data.xpLevelValue}
						</div>
						<div className="rounded-md bg-blue-950 py-2 px-3">
							{data.jobTypeValue}
						</div>
					</div>
					<div className="">
						<HeartButton listingId={data.id} currentUser={currentUser} />
					</div>
				</div>
			</div>
			{/* <div className="w-full flex flex-col gap-2">
				<div className="flex flex-row items-center gap-3">
					<div className="aspect-square w-[100px] relative rounded-xl overflow-hidden">
						<Image
							src={data.imageSrc}
							alt="Listing Logo"
							className="w-full h-full object-cover transition group-hover:scale-110"
							fill
						/>
					</div>
					<div className="flex flex-col gap-2">
						<div className="font-light text-sm text-neutral-700">
							{data.company}
						</div>
						<div className="font-bold text-lg">{data.title}</div>
						<hr />
						<div className="font-light text-sm text-neutral-500">
							{location?.label}, {location?.region}
						</div>
						<div className="font-semibold text-md text-neutral-800/70">
							$ {data.salary}{' '}
							<span className="font-light text-neutral-400">/ Year</span>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between gap-2 mt-2 text-[10px] font-light text-neutral-100">
					<div className="rounded-md bg-blue-600 py-2 px-3">
						{data.category}
					</div>
					<div className="rounded-md bg-blue-600 py-2 px-3">
						{data.xpLevelValue}
					</div>
					<div className="rounded-md bg-blue-600 py-2 px-3">
						{data.jobTypeValue}
					</div>
					<div className="">
						<HeartButton listingId={data.id} currentUser={currentUser} />
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default ListingCard;
