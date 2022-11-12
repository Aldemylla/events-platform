import { Dispatch } from 'react';
import { Event } from '../EventsContext/types';

export type UserType = 'common' | 'empresarial';

export type User = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  type: UserType;
  events: Event[];
};

export type UserContextType = {
  userReducer: UserReducerState;
  dispatchUserReducer: Dispatch<UserReducerAction>;
};

export type UserReducerState = {
  user: User;
};

export type UserReducerAction = { type: 'EVENT_JOIN'; payload: Event } | { type: 'RESET' };
