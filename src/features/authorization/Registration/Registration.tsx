import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { AppStateType } from '../../../App/store';
import { addUser, RegisteredUserType } from './registReducer';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import s from './Registration.module.css';
import { PATH } from '../../../components/routes/Pages';
import { FormLabel } from '@material-ui/core';

export const Registration = () => {
	const registeredUsers = useSelector<AppStateType, RegisteredUserType[]>(state => state.registration.registeredUsers);
	const [editMode, setEditMode] = useState(false);
	const dispatch = useDispatch();

	type FormErrorType = {
		email?: string
		password?: string
		passwordCheck?: string
	};
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			passwordCheck: ''
		},
		validate: (values) => {
			const errors: FormErrorType = {};
			const checkEmail = registeredUsers.find(u => u.email === values.email);
			if (!values.email) {
				errors.email = 'required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'not valid email';
			} else if (checkEmail !== undefined) {
				errors.email = 'this email is already in use';
			}
			if (!values.password) {
				errors.password = 'required';
			} else if (values.password.length < 7) {
				errors.password = 'needs to be more then 7';
			}
			if (values.password !== values.passwordCheck) {
				errors.passwordCheck = 'passwords do not match';
			}
			return errors;
		},
		onSubmit: values => {
			const { email, password, } = values;
			formik.resetForm();
			dispatch(addUser(email, password));
			setEditMode(true);
		},
	});

	if (editMode) {
		return <Redirect to={'/'} />;
	}
	return <div className={s.wrapper} >
		<div className={s.bgrImg} />
		<form onSubmit={formik.handleSubmit}>
			<FormControl >
				<FormLabel>
					<p>To login click
						<NavLink to={PATH.LOGIN}><b> here</b></NavLink>
					</p>
				</FormLabel>
				<FormGroup>

					<TextField
						label='email'
						margin='normal'
						{...formik.getFieldProps('email')}
					/>
					{
						<div className={s.errorStyle}>
							{
								formik.touched.email && formik.errors.email
							}
						</div>
					}
					<TextField
						type='password'
						label='password'
						margin='normal'
						{...formik.getFieldProps('password')}

					/>
					{
						<div className={s.errorStyle}>
							{
								formik.touched.password && formik.errors.password
							}
						</div>
					}
					<TextField
						type='password'
						label='password'
						margin='normal'
						{...formik.getFieldProps('passwordCheck')}

					/>
					{
						<div className={s.errorStyle}>
							{
								formik.touched.passwordCheck && formik.errors.passwordCheck
							}
						</div>
					}
					<Button type={'submit'} variant={'contained'} color={'primary'}>sign up</Button>
				</FormGroup>
			</FormControl>
		</form>
	</div>;
};
