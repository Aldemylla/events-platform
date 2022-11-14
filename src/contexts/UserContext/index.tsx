import { createContext, ReactNode, useEffect, useReducer } from 'react';

import USER from './user';

import { UserContextType, UserReducerState, UserReducerAction, User } from './types';
export type { UserContextType } from './types';

const userContextDefault = {
  userReducer: {} as UserReducerState,
  userDispatch: () => {},
};

export const UserContext = createContext<UserContextType>(userContextDefault);

export default function UserContextProvider({ children }: { children: ReactNode }) {
  const initialState: UserReducerState = {
    user: JSON.parse(localStorage.getItem('user') || '{}') || USER,
  };

  function reducer(state: UserReducerState, action: UserReducerAction) {
    switch (action.type) {
      case 'USER_CREATE': {
        const { name, email, cpf, phone, type } = action.payload;

        return {
          ...state,
          user: {
            name,
            email,
            cpf,
            phone,
            type,
            events: [],
          },
        };
      }

      case 'EVENT_JOIN': {
        const event = action.payload;
        !action.payload.categories.includes('free')
          ? (event.status = 'pending')
          : (event.status = 'confirmed');

        return {
          ...state,
          user: {
            ...state.user,
            events: state.user.events ? [...state.user.events, event] : [event],
          },
        };
      }

      case 'EVENT_UPDATE_STATUS': {
        const { eventId, status } = action.payload;
        const event = state.user.events.find((event) => event.id === eventId);

        if (event) {
          event.status = status;

          return {
            ...state,
            user: {
              ...state.user,
              events: state.user.events ? [...state.user.events, event] : [event],
            },
          };
        }
      }

      case 'RESET':
        return initialState;

      default:
        throw new Error(`Unknown action type`);
    }
  }

  const [userReducer, userDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(userReducer.user));
  }, [userReducer]);

  return (
    <UserContext.Provider
      value={{
        userReducer,
        userDispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
