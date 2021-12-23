import { GetAppStateType } from './../../../App/store';
import { Dispatch } from 'redux';
import { setAppErrorAC } from '../../../App/app-reducer';

const initialState = {
	isLoggedIn: false,
	loggedId: 0,
};

export const loginReducer = (
	state: InitialStateType = initialState,
	action: LoginReducerActionTypes
): InitialStateType => {
	switch (action.type) {
		case loginReducerActions.SET_IS_LOGGED_IN:
			return {
				...state,
				loggedId: action.id,
				isLoggedIn: action.value,
			};
		case loginReducerActions.LOG_OUT:
			return {
				...state,
				isLoggedIn: false,
				loggedId: 0,
			};
		default:
			return state;
	}
};

// AC
const loginReducerActions = {
	SET_IS_LOGGED_IN: 'login/SET_IS_LOGGED_IN',
	LOG_OUT: 'login/LOG_OUT',
} as const;

export const setIsLoggedIn = (id: number, value: boolean) =>
	({ type: loginReducerActions.SET_IS_LOGGED_IN, id, value } as const);

export const logOut = () => ({ type: loginReducerActions.LOG_OUT } as const);


//Thunks
export const LogIn =
	(email: string, password: string) =>
		(dispatch: Dispatch, getState: GetAppStateType) => {
			const registeredUsers = getState().registration.registeredUsers;
			const user = registeredUsers.find(
				u => u.email === email && u.password === password
			);
			if (user !== undefined) {
				dispatch(setIsLoggedIn(user.id, true));
			} else {
				dispatch(setAppErrorAC('Not currect email or password'));
			}
		};

//types
type InitialStateType = typeof initialState;

export type LoginReducerActionTypes =
	| ReturnType<typeof setIsLoggedIn>
	| ReturnType<typeof logOut>;
