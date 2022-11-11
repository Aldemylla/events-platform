import { createContext, ReactNode, useReducer } from 'react';

import EVENTS from './events.json';

import { EventsContextType, EventsReducerState, EventsReducerAction } from './types';
export type { EventsContextType } from './types';

const eventsContextDefault = {
  eventsReducer: {} as EventsReducerState,
  eventsDispatch: () => {},
};

export const EventsContext = createContext<EventsContextType>(eventsContextDefault);

export default function EventsContextProvider({ children }: { children: ReactNode }) {
  const initialState: EventsReducerState = {
    events: EVENTS,
  };

  function reducer(state: EventsReducerState, action: EventsReducerAction) {
    switch (action.type) {
      case 'EVENT_CREATE':
        return {
          ...state,
          events: [...state.events, action.payload],
        };

      case 'RESET':
        return initialState;

      default:
        throw new Error(`Unknown action type`);
    }
  }

  const [eventsReducer, eventsDispatch] = useReducer(reducer, initialState);

  return (
    <EventsContext.Provider
      value={{
        eventsReducer,
        eventsDispatch,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
