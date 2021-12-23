import {
  registrationReducer,
  RegistrationActionTypes,
} from './../features/authorization/Registration/registReducer';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { ThunkAction } from 'redux-thunk';
import thunk from 'redux-thunk';
import { loginReducer } from '../features/authorization/Login/loginReducer';
import { UsersActionTypes, usersReducer } from '../features/users/users-reducer';
import { AppActionTypes, appReducer } from './app-reducer';


const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  registration: registrationReducer,
  users: usersReducer
});

export type StoreType = typeof store;

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;
export type GetAppStateType = () => AppStateType;

export type AppActionsType =
  | RegistrationActionTypes | UsersActionTypes | AppActionTypes;

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AppActionsType
>;
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);


