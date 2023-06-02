'use client';

import useSearchModal from '@/app/hooks/useSearchModal';

import { BiSearch } from 'react-icons/bi';

const Search = () => {
	const searchModal = useSearchModal();

	return (
		<div
			className="w-full px-4 py-2 border-[1px] rounded-full shadow-sm cursor-pointer transition hover:shadow-md md:w-auto"
			onClick={searchModal.onOpen}
		>
			<div className="w-[250px] flex flex-row items-center justify-between">
				<div className="px-2 font-semibold text-sm">Anywhere</div>
				<div className="p-2 text-white rounded-full bg-blue-600">
					<BiSearch size={14} />
				</div>
			</div>
		</div>
	);
};

export default Search;
