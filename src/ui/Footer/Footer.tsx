'use client';

import { useActionState, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import styles from './Footer.module.scss';
import { submitFooterForm, type FooterFormState } from '@/app/actions/forms';

const INITIAL_STATE: FooterFormState = { ok: false };

export const Footer = () => {
	const [values, setValues] = useState({
		name: '',
		email: '',
		heard: '',
		message: '',
	});
	const [touched, setTouched] = useState({
		name: false,
		email: false,
		heard: false,
		message: false,
	});
	const [state, formAction, pending] = useActionState(
		submitFooterForm,
		INITIAL_STATE,
	);

	const isStepOneValid = useMemo(() => {
		const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
		return (
			values.name.trim().length > 0 &&
			emailOk &&
			values.heard.trim().length > 0 &&
			values.message.trim().length > 0
		);
	}, [values]);

	const handleChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = event.target;
		setValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleBlur = (
		event: ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name } = event.target;
		setTouched((prev) => ({ ...prev, [name]: true }));
	};

	const errors = useMemo(() => {
		const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
		return {
			name: values.name.trim().length > 0 ? '' : 'Name is required.',
			email: values.email.trim().length
				? emailOk
					? ''
					: 'Enter a valid email address.'
				: 'Email is required.',
			heard: values.heard.trim().length > 0 ? '' : 'Please select an option.',
			message: values.message.trim().length > 0 ? '' : 'Message is required.',
		};
	}, [values]);

	const showError = (field: keyof typeof touched) =>
		touched[field] && Boolean(errors[field]);
	// <p>
	// 	From new builds to evolving existing systems, I design and deliver scalable
	// 	frontends, intuitive workflows, and search-ready foundations - fast for
	// 	users, easy for teams to build on, and positioned to grow.
	// </p>;

	// <p>
	// 							From new builds to evolving existing systems and products, I
	// 							offer consulting for technical product strategy and UX direction - architecture engagements that define scalable patterns
	// 							and systems for delivering high-quality products that help businesses grow.</p>
	// 						<p>When you need execution, I step in as a contracted
	// 							builder to ship frontends, workflows, and search-optimized
	// 							foundations.
	// 						</p>
	// 						<p>
	// 							In both roles, I focus on creating solutions that are fast for
	// 							users, easy for teams to build on, and positioned to grow.
	// 						</p>
	return (
		<>
			<section className='w-full full-bleed-bg relative site-section py-24'>
				<div className='site-section-content'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-24'>
						<div className=''>
							<h2 className='text-5xl md:fluid-font xl:text-6xl md:h1 font-bold text-white mb-12'>
								Solutions that scale with your business.
							</h2>
							<p>
								I consult on technical product strategy and UX direction, and
								lead architecture engagements that transform complexity into
								scalable products - helping businesses grow.
							</p>
							<p>
								If you need hands-on delivery, I contract as a builder to ship
								frontends, workflows, and search-optimized foundations that
								improve a business's digital footprint.
							</p>
							<p>
								Across both, I focus on creating fast experiences, maintainable
								code, and room to scale.
							</p>
							<p>I'm open to new opportunities and collaborations.</p>
						</div>
						<div>
							{state.ok ? (
								<div className='rounded-lg border border-white/10 bg-white/5 p-6 text-white'>
									<h3 className='text-xl font-semibold'>
										Your message is on its way!
									</h3>
									<p className='text-sm text-white/70'>
										Thanks for reaching out. I will follow up soon.
									</p>
								</div>
							) : (
								<form
									action={formAction}
									className='flex flex-col space-y-6 bg-hatch p-6'>
									{state.error ? (
										<p className='rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200'>
											{state.error}
										</p>
									) : null}
									<fieldset
										disabled={pending}
										className={pending ? 'opacity-60' : ''}>
										<div className='flex flex-col space-y-4'>
											<label className='flex w-full flex-col text-sm text-white/80'>
												Name
												<input
													name='name'
													type='text'
													value={values.name}
													onChange={handleChange}
													onBlur={handleBlur}
													autoComplete='off'
													className={`mt-2 w-full rounded-md px-3 py-2 text-white ${
														showError('name')
															? styles.gradientBorderFieldError
															: styles.gradientBorderField
													}`}
													placeholder='Your name'
													required
												/>
												{showError('name') ? (
													<span className='mt-2 text-xs text-red-400'>
														{errors.name}
													</span>
												) : null}
											</label>
											<label className='flex w-full flex-col text-sm text-white/80'>
												Email
												<input
													name='email'
													type='email'
													value={values.email}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`mt-2 w-full rounded-md px-3 py-2 text-white ${
														showError('email')
															? styles.gradientBorderFieldError
															: styles.gradientBorderField
													}`}
													placeholder='you@email.com'
													required
													autoComplete='off'
												/>
												{showError('email') ? (
													<span className='mt-2 text-xs text-red-400'>
														{errors.email}
													</span>
												) : null}
											</label>
											<label className='flex w-full flex-col text-sm text-white/80'>
												How did you hear about me
												<select
													name='heard'
													value={values.heard}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`mt-2 w-full rounded-md px-3 py-2 text-white ${
														showError('heard')
															? styles.gradientBorderFieldError
															: styles.gradientBorderField
													}`}
													required>
													<option value=''>Select one</option>
													<option value='Referral'>Referral</option>
													<option value='Linkedin'>Linkedin</option>
													<option value='Search'>Search</option>
													<option value='Event'>Event</option>
													<option value='Other'>Other</option>
												</select>
												{showError('heard') ? (
													<span className='mt-2 text-xs text-red-400'>
														{errors.heard}
													</span>
												) : null}
											</label>
											<label className='flex w-full flex-col text-sm text-white/80'>
												Message
												<textarea
													name='message'
													value={values.message}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`mt-2 min-h-[140px] w-full rounded-md px-3 py-2 text-white ${
														showError('message')
															? styles.gradientBorderFieldError
															: styles.gradientBorderField
													}`}
													placeholder='Tell me about your project'
													required
													autoComplete='off'
												/>
												{showError('message') ? (
													<span className='mt-2 text-xs text-red-400'>
														{errors.message}
													</span>
												) : null}
											</label>
											<button
												type='submit'
												disabled={!isStepOneValid || pending}
												className={`self-start text-sm transition cursor-pointer disabled:cursor-not-allowed ${styles.submitButton}`}>
												Send message
											</button>
										</div>
									</fieldset>
								</form>
							)}
						</div>
					</div>
				</div>
			</section>
			<footer
				className={`${styles.footer} w-full full-bleed-bg py-20 site-section`}>
				<div className='site-section-content text-center text-white text-sm'>
					&copy; {new Date().getFullYear()} Justin McKee. All rights reserved.
				</div>
			</footer>
		</>
	);
};
