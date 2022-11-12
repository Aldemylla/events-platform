import { Dispatch } from 'react';

export type EventStatus = 'pending' | 'confirmed' | 'canceled'

export type Event = {
  organizer: {
    name: string,
    email: string,
    phone: string
  },
  title: string,
  description: string,
  date: Date,
  local: string,
  banner: string,
  categories: string[],
  totalVacancies: number,
  ticketPrice: number,
  id: number
  status?: EventStatus
}

export type EventsContextType = {
  eventsReducer: EventsReducerState;
  eventsDispatch: Dispatch<EventsReducerAction>;
};

export type EventsReducerState = {
  events: Event[]
};

export type EventsReducerAction = { type: 'EVENT_CREATE'; payload: Event } | { type: 'RESET' };
