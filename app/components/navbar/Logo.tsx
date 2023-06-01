'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Logo = () => {
	const router = useRouter();

	return (
		<Image
			src="/images/devjobs-logo.png"
			alt="DevJobs Logo"
			className="hidden md:block cursor-pointer"
			height={100}
			width={100}
			onClick={() => router.push('/')}
		/>
	);
};

export default Logo;
