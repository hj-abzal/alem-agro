import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import s from './AddUser.module.css';
import { addUser } from '../users-reducer';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { CancelOutlined } from '@material-ui/icons';

export const AddUser = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	type FormErrorType = {
		name?: string,
		username?: string,
		email?: string,
		street?: string,
		suite?: string,
		city?: string,
		phone?: string,
		website?: string,
		companyName?: string,
		catchPhrase?: string,
	};
	const formik = useFormik({
		initialValues: {
			name: '',
			username: '',
			email: '',
			street: '',
			suite: '',
			city: '',
			phone: '',
			website: '',
			companyName: '',
			catchPhrase: '',
		},
		validate: (values) => {
			const errors: FormErrorType = {};
			const { name, username, email, street, suite, city, phone, website, companyName, catchPhrase } = values;
			if (!name) {
				errors.name = 'required';
			} else if (!username) {
				errors.username = 'required';
			} else if (!email) {
				errors.email = 'required';
			} else if (!street) {
				errors.street = 'required';
			} else if (!suite) {
				errors.suite = 'required';
			} else if (!city) {
				errors.city = 'required';
			} else if (!phone) {
				errors.phone = 'required';
			} else if (!website) {
				errors.website = 'required';
			} else if (!companyName) {
				errors.companyName = 'required';
			} else if (!catchPhrase) {
				errors.catchPhrase = 'required';
			}
			return errors;
		},
		onSubmit: values => {
			formik.resetForm();
			dispatch(addUser(values));
			goBack();
		},
	});
	const goBack = () => {
		history.goBack();
	};
	return <div className={s.wrapper}>
		<div className={s.content}>
			<IconButton className={s.cancelBtn} onClick={goBack} color='primary'>
				<CancelOutlined />
			</IconButton>
			<form onSubmit={formik.handleSubmit}>
				<FormControl >
					<FormGroup>
						<div className={s.form}>
							<div className={s.left}>
								<TextField
									label='name'
									margin='normal'
									{...formik.getFieldProps('name')}
								/>
								{
									<div className={s.errorStyle}>
										{
											formik.touched.name && formik.errors.name
										}
									</div>
								}
								<TextField
									label='username'
									margin='normal'
									{...formik.getFieldProps('username')}
								/>
								{
									<div className={s.errorStyle}>
										{
											formik.touched.username && formik.errors.username
										}
									</div>
								}
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
									label='street'
									margin='normal'
									{...formik.getFieldProps('street')}
								/>
								{
									<div className={s.errorStyle}>
										{
											formik.touched.street && formik.errors.street
										}
									</div>
								}
								<TextField
									label='suite'
									margin='normal'
									{...formik.getFieldProps('suite')}
								/>
								{
									<div className={s.errorStyle}>
										{
											formik.touched.suite && formik.errors.suite
										}
									</div>
								}
							</div >
							<div className={s.right}>
								<TextField
									label='city'
									margin='normal'
									{...formik.getFieldProps('city')}
								/>
								{
									<div className={s.errorStyle}>
										{
											formik.touched.city && formik.errors.city
										}
									</div>
								}
								<TextField
									label='phone'
									margin='normal'
									{...formik.getFieldProps('phone')}
								/>
								{
									<div className={s.errorStyle}>
										{
											formik.touched.phone && formik.errors.phone
										}
									</div>
								}
								<TextField
									label='website'
									margin='normal'
									{...formik.getFieldProps('website')}
								/>
								{
									<div className={s.errorStyle}>
										{
											formik.touched.website && formik.errors.website
										}
									</div>
								}
								<TextField
									label='companyName'
									margin='normal'
									{...formik.getFieldProps('companyName')}
								/>
								{
									<div className={s.errorStyle}>
										{
											formik.touched.companyName && formik.errors.companyName
										}
									</div>
								}
								<TextField
									label='catchPhrase'
									margin='normal'
									{...formik.getFieldProps('catchPhrase')}
								/>
								{
									<div className={s.errorStyle}>
										{
											formik.touched.catchPhrase && formik.errors.catchPhrase
										}
									</div>
								}
							</div>
						</div>
						<Button type={'submit'} variant={'contained'} color={'primary'}>add</Button>
					</FormGroup>
				</FormControl>
			</form>
		</div>
	</div>;
};
