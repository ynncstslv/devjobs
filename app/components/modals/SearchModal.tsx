'use client';

import { useCallback, useMemo, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from '@/app/hooks/useSearchModal';

import qs from 'query-string';

import Modal from './Modal';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import Heading from '../Heading';
import ExperienceLevel, {
	ExperienceLevelValue,
} from '../inputs/ExperienceLevel';
import VisaSelect, { VisaSelectValue } from '../inputs/VisaSelect';
import { FieldValues, useForm } from 'react-hook-form';

const SearchModal = () => {
	const router = useRouter();

	const params = useSearchParams();

	const searchModal = useSearchModal();

	const [location, setLocation] = useState<CountrySelectValue>();

	const Map = useMemo(
		() => dynamic(() => import('../Map'), { ssr: false }),
		[]
	);

	const onSubmit = useCallback(async () => {
		let currentQuery = {};

		if (params) currentQuery = qs.parse(params.toString());

		const updatedQuery: any = {
			...currentQuery,
			locationValue: location?.value,
		};

		const url = qs.stringifyUrl(
			{
				url: '/',
				query: updatedQuery,
			},
			{ skipNull: true }
		);

		searchModal.onClose();

		router.push(url);
	}, [searchModal, location, router, params]);

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Find the perfect location!"
				subtitle="Where do you want to go?"
			/>
			<CountrySelect
				value={location}
				onChange={(value) => setLocation(value as CountrySelectValue)}
			/>
			<hr />
			<Map center={location?.latlng} />
		</div>
	);

	return (
		<Modal
			title="Filters"
			body={bodyContent}
			actionLabel="Search"
			isOpen={searchModal.isOpen}
			onSubmit={onSubmit}
			onClose={searchModal.onClose}
		/>
	);
};

export default SearchModal;
