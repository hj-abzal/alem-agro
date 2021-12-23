const initialState = {
  status: 'idle' as AppStatusType,
  error: null as string | null
};

export const appReducer = (state: InitialStateType = initialState, action: AppActionTypes): InitialStateType => {
  switch (action.type) {
    case appReducerActions.IS_INITIALIZED:
      return { ...state, status: action.status };
    case appReducerActions.SET_VALIDATION:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

//AC
const appReducerActions = {
  IS_INITIALIZED: 'app/IS_INITIALIZED',
  SET_VALIDATION: 'app/SET_VALIDATION',
} as const;
export const setAppStatusAC = (status: AppStatusType) =>
({
  type: appReducerActions.IS_INITIALIZED,
  status,
} as const);

export const setAppErrorAC = (error: string | null) =>
  ({ type: appReducerActions.SET_VALIDATION, error } as const);

//types
type InitialStateType = typeof initialState;
export type AppActionTypes = IsInitializedType;
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>;

export type IsInitializedType = SetAppStatusAT | SetAppErrorAT;

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
