import { createContext, ReactNode, useReducer } from 'react';

import USER from './user.json';

import { UserContextType, UserReducerState, UserReducerAction } from './types';
export type { UserContextType } from './types';

const userContextDefault = {
  userReducer: {} as UserReducerState,
  dispatchUserReducer: () => {},
};

export const UserContext = createContext<UserContextType>(userContextDefault);

export default function UserContextProvider({ children }: { children: ReactNode }) {
  const initialState: UserReducerState = {
    user: USER,
  };

  function reducer(state: UserReducerState, action: UserReducerAction) {
    switch (action.type) {
      case 'EVENT_JOIN':
        return {
          ...state,
          user: {
            ...state.user,
            events: [...state.user.events, action.payload],
          },
        };

      case 'RESET':
        return initialState;

      default:
        throw new Error(`Unknown action type`);
    }
  }

  const [userReducer, dispatchUserReducer] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider
      value={{
        userReducer,
        dispatchUserReducer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
