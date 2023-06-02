import prisma from '@/app/libs/prismadb';

export interface IListingParams {
	userId?: string;
	category?: string;
	locationValue?: string;
	xpLevelValue?: string;
	visaValue?: string;
}

export default async function getListings(params: IListingParams) {
	try {
		const { userId, category, locationValue } = params;

		let query: any = {};

		if (userId) query.userId = userId;

		if (category) query.category = category;

		if (locationValue) query.locationValue = locationValue;

		const listings = await prisma.listing.findMany({
			where: query,
			orderBy: {
				createdAt: 'desc',
			},
		});

		const safeListings = listings.map((listing) => ({
			...listing,
			createdAt: listing.createdAt.toISOString(),
		}));

		return safeListings;
	} catch (error: any) {
		throw new Error(error);
	}
}
