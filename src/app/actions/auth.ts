'use server';

import { headers } from 'next/headers';
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';

export async function signUpAction(formData: FormData) {
	const name = formData.get('name') as string;
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	if (!email || !password) {
		throw new Error('Email and password are required');
	}

	console.log('Signup attempt:', { name, email });

	try {
		await auth.api.signUpEmail({
			body: {
				name,
				email,
				password,
			},
			headers: await headers(),
		});

		redirect('/signin');
	} catch (error) {
		console.error('Signup error:', error);
		throw error;
	}
}

export async function signInAction(formData: FormData) {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	if (!email || !password) {
		throw new Error('Email and password are required');
	}

	console.log('Signin attempt:', { email });

	try {
		await auth.api.signInEmail({
			body: {
				email,
				password,
			},
			headers: await headers(),
		});

		redirect('/dashboard');
	} catch (error) {
		console.error('Signin error:', error);
		throw error;
	}
}

export async function signOutAction() {
	try {
		await auth.api.signOut({
			headers: await headers(),
		});

		redirect('/signin');
	} catch (error) {
		console.error('Signout error:', error);
		throw error;
	}
}
