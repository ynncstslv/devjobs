'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import CategoryBox from '../CategoryBox';
import Container from '../Container';

import { FaJava } from 'react-icons/fa';
import {
	SiHtml5,
	SiCss3,
	SiTailwindcss,
	SiSass,
	SiJavascript,
	SiTypescript,
	SiReact,
	SiSvelte,
	SiAngular,
	SiVuedotjs,
	SiNodedotjs,
	SiNextdotjs,
	SiRust,
	SiZig,
	SiGoland,
	SiC,
	SiCsharp,
	SiCplusplus,
	SiKotlin,
	SiPython,
	SiDjango,
	SiPhp,
	SiSwift,
	SiR,
	SiRuby,
	SiDocker,
} from 'react-icons/si';

export const categories = [
	{
		label: 'HTML5',
		icon: SiHtml5,
	},
	{
		label: 'CSS3',
		icon: SiCss3,
	},
	{
		label: 'Tailwind',
		icon: SiTailwindcss,
	},
	{
		label: 'Sass',
		icon: SiSass,
	},
	{
		label: 'JavaScript',
		icon: SiJavascript,
	},
	{
		label: 'TypeScript',
		icon: SiTypescript,
	},
	{
		label: 'React',
		icon: SiReact,
	},
	{
		label: 'Svelte',
		icon: SiSvelte,
	},
	{
		label: 'Angular',
		icon: SiAngular,
	},
	{
		label: 'Vue',
		icon: SiVuedotjs,
	},
	{
		label: 'Node.js',
		icon: SiNodedotjs,
	},
	{
		label: 'Next.js',
		icon: SiNextdotjs,
	},
	{
		label: 'Rust',
		icon: SiRust,
	},
	{
		label: 'Zig',
		icon: SiZig,
	},
	{
		label: 'Go',
		icon: SiGoland,
	},
	{
		label: 'C',
		icon: SiC,
	},
	{
		label: 'C#',
		icon: SiCsharp,
	},
	{
		label: 'C++',
		icon: SiCplusplus,
	},
	{
		label: 'Java',
		icon: FaJava,
	},
	{
		label: 'Kotlin',
		icon: SiKotlin,
	},
	{
		label: 'Python',
		icon: SiPython,
	},
	{
		label: 'Django',
		icon: SiDjango,
	},
	{
		label: 'PHP',
		icon: SiPhp,
	},
	{
		label: 'Swift',
		icon: SiSwift,
	},
	{
		label: 'R',
		icon: SiR,
	},
	{
		label: 'Ruby',
		icon: SiRuby,
	},
	{
		label: 'Docker',
		icon: SiDocker,
	},
];

const Categories = () => {
	const pathname = usePathname();
	const params = useSearchParams();

	const category = params?.get('category');

	const isMainPage = pathname === '/';

	if (!isMainPage) return null;

	return (
		<Container>
			<div className="flex flex-row items-center justify-between pt-4 overflow-x-auto">
				{categories.map((item) => (
					<CategoryBox
						key={item.label}
						icon={item.icon}
						label={item.label}
						selected={category === item.label}
					/>
				))}
			</div>
		</Container>
	);
};

export default Categories;
