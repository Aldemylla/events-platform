import { createContext, ReactNode, useReducer } from 'react';

import EVENTS from '../../mocks/events';

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
    currentEvent: null,
  };

  function reducer(state: EventsReducerState, action: EventsReducerAction) {
    switch (action.type) {
      case 'EVENT_CREATE':
        return {
          ...state,
          events: [...state.events, action.payload],
        };

      case 'EVENT_SEARCH':
        if (action.searchBy === 'local') {
          return {
            ...state,
            events: initialState.events.filter((event) =>
              event.local.toLowerCase().includes(action.payload.toLowerCase())
            ),
          };
        }
        if (action.searchBy === 'title') {
          return {
            ...state,
            events: initialState.events.filter((event) =>
              event.title.toLowerCase().includes(action.payload.toLowerCase())
            ),
          };
        }

      case 'EVENT_CURRENT_UPDATE':
        return {
          ...state,
          currentEvent: state.events.find((event) => event.id === action.payload) || null,
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
