'use client';

import { FC } from 'react';
import { IconType } from 'react-icons';

interface ListingCategoryProps {
	icon: IconType;
	label: string;
}

const ListingCategory: FC<ListingCategoryProps> = ({ icon: Icon, label }) => {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-row items-center gap-3">
				<Icon size={26} className="text-blue-600" />
				<div className="font-semibold text-blue-600">{label}</div>
			</div>
		</div>
	);
};

export default ListingCategory;
