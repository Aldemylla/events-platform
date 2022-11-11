import { Dispatch } from 'react';

export type Event = {
  organizer: {
    name: string,
    email: string,
    phone: string
  },
  title: string,
  description: string,
  date: string,
  local: string,
  banner: string,
  categories: string[],
  totalVacancies: number,
  ticketPrice: number,
  id: number
}

export type EventsContextType = {
  eventsReducer: EventsReducerState;
  eventsDispatch: Dispatch<EventsReducerAction>;
};

export type EventsReducerState = {
  events: Event[]
};

export type EventsReducerAction = { type: 'EVENT_CREATE'; payload: Event } | { type: 'RESET' };
