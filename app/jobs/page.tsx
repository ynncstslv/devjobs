import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';

import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import JobsClient from './JobsClient';

const JobsPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title="Unauthorized" subtitle="Please, login!" />
			</ClientOnly>
		);
	}

	const listings = await getListings({
		userId: currentUser.id,
	});

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="No jobs found..."
					subtitle="Looks like you haven't posted any jobs. "
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<JobsClient currentUser={currentUser} listings={listings} />
		</ClientOnly>
	);
};

export default JobsPage;
