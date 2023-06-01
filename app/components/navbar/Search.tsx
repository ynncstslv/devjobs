'use client';

import { BiSearch } from 'react-icons/bi';

const Search = () => {
	return (
		<div className="w-full py-2 border-[1px] rounded-full shadow-sm cursor-pointer transition hover:shadow-md md:w-auto">
			<div className="flex flex-row items-center justify-between">
				<div className="px-6 font-semibold text-sm">Anywhere</div>
				<div className="hidden flex-1 px-6 font-semibold text-sm text-center border-x-[1px] sm:block">
					Any Level
				</div>
				<div className="flex flex-row items-center gap-3 pr-2 pl-6 text-sm text-gray-600">
					<div className="hidden sm:block">Visa</div>
					<div className="p-2 text-white rounded-full bg-blue-600">
						<BiSearch size={14} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
