import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import ToastProvider from './providers/ToasterProvider';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
	title: 'DevJobs | Job Searching for Developers',
	description:
		'DevJobs makes it easy for developers to discover and apply for their next career move.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={nunito.className}>
				<ClientOnly>
					<ToastProvider />
					<RegisterModal />
					<Navbar />
				</ClientOnly>
				{children}
			</body>
		</html>
	);
}
