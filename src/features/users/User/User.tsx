import { IconButton, TextField } from '@material-ui/core';
import { EditRounded, SaveRounded, CancelOutlined } from '@material-ui/icons';
import { useState, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import { UsersResponseType } from '../../../api/api';
import userPng from '../../../assets/user.png';
import { updateUser } from '../users-reducer';
import s from './User.module.css';

type UserPropsType = {
	user: UsersResponseType
	isAdmin: boolean
	editUser: (id: number) => void
};

export const User = (props: UserPropsType) => {
	const dispatch = useDispatch();
	const { user } = props;
	const [editMode, setEditMode] = useState(false);
	const [name, setName] = useState(user.name);
	const [username, setUsername] = useState(user.username);
	const [email, setEmail] = useState(user.email);
	const [phone, setPhone] = useState(user.phone);
	const [website, setWebsite] = useState(user.website);
	const [city, setCity] = useState(user.address.city);
	const [street, setStreet] = useState(user.address.street);
	const [suite, setSuite] = useState(user.address.suite);
	const [companyName, setCompanyName] = useState(user.company.name);
	const [catchPhrase, setCatchPhrase] = useState(user.company.catchPhrase);
	const [error, setError] = useState<string | null>('');


	const validate = (arr: string[]) => {
		for (let i = 0; arr.length > i; i++) {
			const trimmed = arr[i].trim();
			if (trimmed.length < 100) {
				if (trimmed === '') {
					setError('required');
				}
			} else {
				setError('max value is no more then 100');
			}
		}
	};
	const onSave = () => {
		validate([name, username, email, phone, website, city, street, suite, companyName, catchPhrase]);
		if (error === null) {
			dispatch(updateUser({ id: user.id, name, username, email, phone, website, city, street, suite, companyName, catchPhrase }));
			setEditMode(false);
		}
	};
	const onCansel = () => {
		setEditMode(false);
		setName(user.name);
		setUsername(user.username);
		setEmail(user.email);
		setPhone(user.phone);
		setWebsite(user.website);
		setCity(user.address.city);
		setSuite(user.address.suite);
		setCompanyName(user.company.name);
		setCatchPhrase(user.company.catchPhrase);
	};
	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null) {
			setError(null);
		}
		if (e.charCode === 13) {
			onSave();
		}
	};
	return (
		<div className={s.wrapper}>
			<img className={s.picture} src={userPng} alt='' />
			{
				editMode
					? <div className={s.editIcon}>
						<div className={s.saveIcon}>
							<IconButton color={error ? 'secondary' : 'primary'} onClick={onSave}>
								<SaveRounded />
							</IconButton>
						</div>
						<IconButton color='primary' onClick={onCansel}>
							<CancelOutlined />
						</IconButton>
					</div >
					: <div className={s.editIcon} onClick={() => setEditMode(true)}>
						<IconButton color='primary'>
							<EditRounded />
						</IconButton>
					</div >

			}
			<div className={s.info}>
				{editMode
					?
					<div className={s.inputs}>
						<TextField
							label={'name'}
							value={name}
							onChange={(e) => setName(e.currentTarget.value)}
							autoFocus
							onKeyPress={onKeyPressHandler}
						/>
						<TextField
							label={'username'}
							value={username}
							onChange={(e) => setUsername(e.currentTarget.value)}
							autoFocus
							onKeyPress={onKeyPressHandler}
						/>
						<TextField
							label={'email'}
							value={email}
							onChange={(e) => setEmail(e.currentTarget.value)}
							onKeyPress={onKeyPressHandler}
						/>
						<TextField
							label={'phone'}
							value={phone}
							onChange={(e) => setPhone(e.currentTarget.value)}
							onKeyPress={onKeyPressHandler}
						/>
						<TextField
							label={'website'}
							value={website}
							onChange={(e) => setWebsite(e.currentTarget.value)}
							onKeyPress={onKeyPressHandler}
						/>
						<TextField
							label={'city'}
							value={city}
							onChange={(e) => setCity(e.currentTarget.value)}
							onKeyPress={onKeyPressHandler}
						/>
						<TextField
							label={'street'}
							value={street}
							onChange={(e) => setStreet(e.currentTarget.value)}
							onKeyPress={onKeyPressHandler}
						/>
						<TextField
							label={'suite'}
							value={suite}
							onChange={(e) => setSuite(e.currentTarget.value)}
							onKeyPress={onKeyPressHandler}
						/>
						<TextField
							label={'companyName'}
							value={companyName}
							onChange={(e) => setCompanyName(e.currentTarget.value)}
							onKeyPress={onKeyPressHandler}
						/>
						<TextField
							label={'catchPhrase'}
							value={catchPhrase}
							onChange={(e) => setCatchPhrase(e.currentTarget.value)}
							onKeyPress={onKeyPressHandler}
						/>
					</div>
					:
					<div>
						<div className={s.infoItem}>
							<div className={s.title}>Name: </div>{user.name}
						</div>
						<div className={s.infoItem}>
							<div className={s.title}>UserName: </div>{user.username}
						</div>
						<div className={s.infoItem}>
							<div className={s.title}>Email: </div>{user.email}
						</div>
						<div className={s.infoItem}>
							<div className={s.title}>Phone: </div>{user.phone}
						</div>
						<div className={s.infoItem}>
							<div className={s.title}>Website: </div>{user.website}
						</div>
						<div className={s.infoItem}>
							<div className={s.title}>City: </div>{user.address.city}
						</div>
						<div className={s.infoItem}>
							<div className={s.title}>Street: </div>{user.address.street}
						</div>
						<div className={s.infoItem}>
							<div className={s.title}>Suite: </div>{user.address.suite}
						</div>
						<div className={s.infoItem}>
							<div className={s.title}>Company name: </div>{user.company.name}
						</div>
						<div>
							<div className={s.title}>Company catchPhrase: </div>
							<div>
								{user.company.catchPhrase}
							</div>
						</div>
					</div>
				}
			</div>
		</div>
	);
};