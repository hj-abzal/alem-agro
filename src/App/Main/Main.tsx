import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../store';
import s from './Main.module.css';
import { AppBar, Button, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import { GroupWork } from '@material-ui/icons';
import { Users } from '../../features/users/Users';
import { getAllUsers } from '../../features/users/users-reducer';
import { AppStatusType } from '../app-reducer';
import { logOut } from '../../features/authorization/Login/loginReducer';
import { ErrorSnackbar } from '../../components/ErrorSnackbar/ErrorSnackbar';


export const Main = () => {
	const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn);
	const status = useSelector<AppStateType, AppStatusType>(state => state.app.status);

	const dispatch = useDispatch();

	const logOutUser = () => {
		dispatch(logOut());
	};
	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);


	return (
		<div className={s.wrapper}>
			<ErrorSnackbar />
			<div className={s.header}>
				<AppBar position='static'>
					<Toolbar className={s.header}>
						<IconButton edge='start' color='inherit' aria-label='menu'>
							<GroupWork />
						</IconButton>
						<Typography variant='h6' >
							AlemAgro
						</Typography>
						{isLoggedIn && <Button color='inherit' onClick={logOutUser}>Log out</Button>}
					</Toolbar>
					{status === 'loading' && <LinearProgress />}
				</AppBar>
			</div>
			<div className={s.container}>
					<Users />
			</div>
		</div>

	);
};