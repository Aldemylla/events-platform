import { Dispatch } from 'react';
import { Event } from '../EventsContext/types';

export type User = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
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
