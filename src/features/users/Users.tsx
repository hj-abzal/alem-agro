import { IconButton } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UsersResponseType } from '../../api/api';
import { AppStateType } from '../../App/store';
import { PATH } from '../../components/routes/Pages';
import { User } from './User/User';

export const Users = () => {
	const users = useSelector<AppStateType, UsersResponseType[]>(state => state.users);
	const isAdmin = useSelector<AppStateType, number>(state => state.login.loggedId);
	const history = useHistory();


	const routeChange = () => {
		history.push(PATH.ADD_USER);
	};
	const editUser = (id: number) => {

	};
	return (
		<div>
			<h2 style={{ color: 'blue' }}>Users</h2>
			<IconButton onClick={routeChange} color='primary'>
				<AddCircleOutline /> add user
			</IconButton>
			{
				users && users.map((u: UsersResponseType) => <User key={u.id} user={u} isAdmin={isAdmin === 1} editUser={editUser} />)
			}
		</div>
	);
};

