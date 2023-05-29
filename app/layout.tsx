import './globals.css';
import { Nunito } from 'next/font/google';

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
			<body className={nunito.className}>{children}</body>
		</html>
	);
}
