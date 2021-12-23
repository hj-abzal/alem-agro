import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { AppStateType } from '../../../App/store';
import { LogIn } from './loginReducer';
import { PATH } from '../../../components/routes/Pages';
import s from './Login.module.css';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import TextField from '@material-ui/core/TextField/TextField';
import { ErrorSnackbar } from '../../../components/ErrorSnackbar/ErrorSnackbar';

export const Login = () => {
	const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn);
	const dispatch = useDispatch();

	type FormErrorType = {
		email?: string
		password?: string
	};
	const formik = useFormik({
		initialValues: {
			email: 'admin@gmail.com',
			password: 'admin7777',
		},
		validate: (values) => {
			const errors: FormErrorType = {};
			if (!values.email) {
				errors.email = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}

			if (!values.password) {
				errors.password = 'Required';
			} else if (values.password.length < 3) {
				errors.password = 'Must be 3 characters at least';
			}
			return errors;
		},
		onSubmit: values => {
			const { email, password } = values;
			formik.resetForm();
			dispatch(LogIn(email, password));
		},
	});

	if (isLoggedIn) {
		return <Redirect to={PATH.MAIN} />;
	}
	return <div className={s.wrapper}>
		<div className={s.bgrImg} />
		<ErrorSnackbar />
		<div className={s.form}>
			<form onSubmit={formik.handleSubmit}>
				<FormControl>
					<FormLabel>
						<p>To sign up click
							<NavLink to={PATH.REGISTER}><b> here</b></NavLink>
						</p>
					</FormLabel>
					<FormGroup>
						<TextField
							className={s.inputStyle}
							label='Email'
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
							label='Password'
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
						<Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
					</FormGroup>
				</FormControl>
			</form>
		</div>

	</div>;
};

