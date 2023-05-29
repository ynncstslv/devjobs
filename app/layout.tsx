import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import ToastProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';

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
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				{children}
			</body>
		</html>
	);
}
