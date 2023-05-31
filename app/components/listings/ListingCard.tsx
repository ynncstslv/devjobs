'use client';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import { Listing, Reservation } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import HeartButton from '../HeartButton';
import Button from '../Button';

interface ListingCardProps {
	data: Listing;
	reservation?: Reservation;
	onAction?: (id: string) => void;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	currentUser: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
	data,
	reservation,
	onAction,
	disabled,
	actionLabel,
	actionId = '',
	currentUser,
}) => {
	const router = useRouter();
	const { getByValue } = useCountries();

	const location = getByValue(data.locationValue);

	// const handleCancel = useCallback(
	// 	(e: React.MouseEvent<HTMLButtonElement>) => {
	// 		e.stopPropagation();

	// 		if (disabled) {
	// 			return;
	// 		}

	// 		onAction?.(actionId);
	// 	},
	// 	[onAction, actionId, disabled]
	// );

	// const salary = useMemo(() => {
	// 	if (reservation) {
	// 		return reservation.totalPrice;
	// 	}

	// 	return data.salary;
	// }, [reservation, data.salary]);

	// const reservationDate = useMemo(() => {
	// 	if (!reservation) {
	// 		return null;
	// 	}

	// 	const start = new Date(reservation.startDate);
	// 	const end = new Date(reservation.endDate);
	// }, []);

	return (
		<div
			onClick={() => router.push(`/listings/${data.id}`)}
			className="col-span-1 cursor-pointer group"
		>
			<div className="flex flex-col gap-2 w-full">
				<div className="flex flex-row gap-3 items-center">
					<div className="aspect-square w-[100px] relative overflow-hidden rounded-xl">
						<Image
							alt="Listing"
							src={data.imageSrc}
							className="object-cover h-full w-full group-hover:scale-110 transition"
							fill
						/>
					</div>
					<div className="flex flex-col gap-2">
						<div className="font-bold text-lg">{data.title}</div>
						<hr />
						<div className="font-light text-neutral-500 text-sm">
							{location?.label}, {location?.region}
						</div>
						<div className="text-md font-semibold text-neutral-800/70">
							$ {data.salary} <span>/ Year</span>
						</div>
					</div>
				</div>
				<div className="font-light text-neutral-100 text-[10px] flex items-center justify-between gap-2 mt-2">
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
			</div>
		</div>
	);

	// return (
	// 	<div
	// 		onClick={() => router.push(`/listings/${data.id}`)}
	// 		className="col-span-1 cursor-pointer group"
	// 	>
	// 		<div className="flex flex-col gap-2 w-full">
	// 			<div className="aspect-square w-full relative overflow-hidden rounded-xl">
	// 				<Image
	// 					alt="Listing"
	// 					src={data.imageSrc}
	// 					className="object-cover h-full w-full group-hover:scale-110 transition"
	// 					fill
	// 				/>
	// 				<div className="absolute top-3 right-3">
	// 					<HeartButton listingId={data.id} currentUser={currentUser} />
	// 				</div>
	// 			</div>
	// 			<div className="font-semibold text-lg">
	// 				{location?.label}, {location?.region}
	// 			</div>
	// 			<div className="font-light text-neutral-500">{data.category}</div>
	// 			<div className="flex flex-row items-center gap-1">
	// 				<div className="font-semibold">$ {data.salary}</div>
	// 				<div className="font-light">/ Year</div>
	// 			</div>
	// 			{onAction && actionLabel && (
	// 				<Button
	// 					disabled={disabled}
	// 					small
	// 					label={actionLabel}
	// 					onClick={() => {}}
	// 				/>
	// 			)}
	// 		</div>
	// 	</div>
	// );
};

export default ListingCard;
