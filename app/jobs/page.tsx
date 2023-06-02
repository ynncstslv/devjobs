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

	return (
		<ClientOnly>
			<div>Jobs</div>
		</ClientOnly>
	);
};

export default JobsPage;
