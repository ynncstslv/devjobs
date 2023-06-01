'use client';

import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import Button from '../Button';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Modal from './Modal';

const LoginModal = () => {
	const router = useRouter();

	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({ defaultValues: { email: '', password: '' } });

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		signIn('credentials', {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			if (callback?.ok) {
				toast.success('Logged In!');
				router.refresh();
				loginModal.onClose();
			}

			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	const toggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome Back!" subtitle="Login to Your Account." center />
			<Input
				id="email"
				label="Email"
				register={register}
				errors={errors}
				disabled={isLoading}
				required
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				register={register}
				errors={errors}
				disabled={isLoading}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				outline
				label="Sign In with Google"
				icon={FcGoogle}
				onClick={() => signIn('google')}
			/>
			<Button
				outline
				label="Sign In with Github"
				icon={AiFillGithub}
				onClick={() => signIn('github')}
			/>
			<div className="mt-4 font-light text-neutral-500 text-center">
				<div className="flex flex-row items-center justify-center gap-2">
					<div>First time using DevJobs?</div>
					<div
						className="text-neutral-800 cursor-pointer hover:underline"
						onClick={toggle}
					>
						Register!
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			title="Login"
			body={bodyContent}
			footer={footerContent}
			isOpen={loginModal.isOpen}
			actionLabel="Continue"
			onSubmit={handleSubmit(onSubmit)}
			disabled={isLoading}
			onClose={loginModal.onClose}
		/>
	);
};

export default LoginModal;
