import { Dispatch } from 'react';

import { Event, EventStatus } from '../EventsContext/types';

export type UserType = 'common' | 'empresarial';

export type UserInfos = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  type: UserType | null;
};

export interface User extends UserInfos {
  events: Event[];
}

export type UserContextType = {
  userReducer: UserReducerState;
  userDispatch: Dispatch<UserReducerAction>;
};

export type UserReducerState = {
  user: User;
};

export type UserReducerAction =
  | { type: 'USER_CREATE'; payload: UserInfos }
  | { type: 'EVENT_JOIN'; payload: Event }
  | { type: 'EVENT_UPDATE_STATUS'; payload: { eventId: number; status: EventStatus } }
  | { type: 'RESET' };
