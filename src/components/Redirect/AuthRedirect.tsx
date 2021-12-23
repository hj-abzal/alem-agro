import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../App/store';
import { PATH } from '../routes/Pages';

type DivPropsType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type AuthRedirectPropsType = DivPropsType & {};

export const AuthRedirect: React.FC<AuthRedirectPropsType> = React.memo(({
	children,
	...restProps
}) => {
	const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn);

	if (!isLoggedIn) {
		return <Redirect to={PATH.LOGIN} />;
	}
	return (
		<>
			<div {...restProps}>
				{children}
			</div>
		</>
	);
});