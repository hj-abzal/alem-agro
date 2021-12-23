import { Dispatch } from 'redux';



const initialState = {
  registeredUsers: [
    { id: 1, email: 'admin@gmail.com', password: 'admin7777' }
  ] as RegisteredUserType[],
};

export const registrationReducer = (
  state: InitialStateType = initialState,
  action: RegistrationActionTypes
): InitialStateType => {
  switch (action.type) {
    case registrationReducerActions.ADD_REGISTERED_USER:
      return {
        ...state,
        registeredUsers: [...state.registeredUsers, action.payload],
      };
    case registrationReducerActions.UPDATE_REGISTERED_USER:
      return {
        ...state,
        registeredUsers: state.registeredUsers.map(u =>
          u.id === action.payload.id ? { ...u, ...action.payload } : u
        ),
      };
    default:
      return state;
  }
};

// AC
const registrationReducerActions = {
  ADD_REGISTERED_USER: 'reg/ADD_REGISTERED_USER',
  UPDATE_REGISTERED_USER: 'reg/UPDATE_REGISTERED_USER',
} as const;

export const addRegisteredUser = (payload: RegisteredUserType) => {
  return {
    type: registrationReducerActions.ADD_REGISTERED_USER,
    payload,
  } as const;
};

export const updateRegisteredUser = (
  id: number,
  firstName: string,
  lastName: string,
  email: string
) => {
  return {
    type: registrationReducerActions.UPDATE_REGISTERED_USER,
    payload: { id, firstName, lastName, email },
  } as const;
};

//Thunks
export const addUser =
  (email: string, password: string) =>
    (dispatch: Dispatch) => {
      const id = Date.now();
      dispatch(addRegisteredUser({ id, email, password }));
    };

//types
type InitialStateType = typeof initialState;

export type RegistrationActionTypes =
  | ReturnType<typeof addRegisteredUser>
  | ReturnType<typeof updateRegisteredUser>;

export type RegisteredUserType = {
  id: number
  email: string
  password: string
};
