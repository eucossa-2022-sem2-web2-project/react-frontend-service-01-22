/* eslint-disable react/no-unescaped-entities */
import { AxiosError } from 'axios';
import InputElement from '../components/InputElement';
import { Link } from 'react-router-dom';
import PasswordElement from '../components/PasswordElement';
import React from 'react';
import { authQuery } from '../api';
import { useLocation } from 'react-router-dom';

type UserDataInputs = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const pathState = useLocation().state as unknown as {
		from: string | undefined;
	};

	const [userData, setUserData] = React.useState<UserDataInputs>(
		{} as UserDataInputs
	);
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		e.preventDefault();
		setUserData((initial) => ({ ...initial, [e.target.name]: e.target.value }));
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (userData.email && userData.password) {
			try {
				const res = await authQuery.post('/login',userData);
				console.log(res.data);
				
			} catch (err) {
				if (err instanceof AxiosError) console.log(err);
			}
		}
	};

	return (
		<div className="flex justify-center items-center mt-10 flex-col h-full">
			<form
				className="flex flex-col mt-5 gap-4 sm:m-8 px-4 w-full bg-white p-5 md:p-12 rounded-md max-w-[40rem]"
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<div>
					<img
						src="/logo.svg"
						alt=""
						className="mx-auto h-30 w-30 object-cover"
					/>
				</div>
				<InputElement
					placeholder={'User Name/Email'}
					type={'email'}
					name={'email'}
					onChange={handleChange}
					value={userData['email']}
				/>
				<PasswordElement
					type="password"
					placeholder={'Password'}
					name={'password'}
					onChange={handleChange}
					value={userData['password']}
				/>
				<div className="flex items-center gap-5">
					<input
						className=""
						type="checkbox"
						id="rememberMe"
						name="rememberMe"
						value="remember"
					/>
					<label htmlFor="vehicle3"> Remember Me</label>
				</div>
				<button className="mb-3 rounded-full bg-primary p-2" type="submit">
					Sign In
				</button>
			</form>
			<p className="mb-7 text-center">
				Don't have an account?{' '}
				<Link to={'/signup'} className="text-primary font-bold">
					Sign up
				</Link>
			</p>
		</div>
	);
};

export default LoginPage;
