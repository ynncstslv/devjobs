import getCurrentUser from './actions/getCurrentUser';

import ToastProvider from './providers/ToasterProvider';

import ClientOnly from './components/ClientOnly';
import LoginModal from './components/modals/LoginModal';
import Navbar from './components/navbar/Navbar';
import PostJobModal from './components/modals/PostJobModal';
import RegisterModal from './components/modals/RegisterModal';

import './globals.css';

import { Nunito } from 'next/font/google';
import SearchModal from './components/modals/SearchModal';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
	title: 'DevJobs | Job Searching for Developers',
	description:
		'DevJobs makes it easy for developers to discover and apply for their next career move.',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();

	return (
		<html lang="en">
			<body className={nunito.className}>
				<ClientOnly>
					<ToastProvider />
					<LoginModal />
					<RegisterModal />
					<PostJobModal />
					<SearchModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				<div className="pb-20 pt-28">{children}</div>
			</body>
		</html>
	);
}
