import { useContext } from 'react';

import { UserContext, UserContextType } from '../../contexts/UserContext';
import { EventsContext, EventsContextType } from '../../contexts/EventsContext';

import EventMainBoxStatus from '../../layout/event_main_box/EventMainBoxStatus';
import EventMainBoxFormAttend from '../../layout/event_main_box/EventMainBoxFormAttend';

import { EventMainBoxProps } from './types';

import './styles.scss';

export default function EventMainBox({ boxType, formInputs }: EventMainBoxProps) {
  const { userReducer, userDispatch } = useContext(UserContext) as UserContextType;
  const { eventsReducer } = useContext(EventsContext) as EventsContextType;

  const { currentEvent } = eventsReducer;
  const currentUserEvent =
    currentEvent && userReducer.user.events?.find((event) => event.id === currentEvent.id);

  return (
    <section className='event__main-box'>
      {!!currentUserEvent ? (
        <EventMainBoxStatus {...{ currentUserEvent, userDispatch }} />
      ) : (
        <EventMainBoxFormAttend
          {...{ formInputs, currentEvent, boxType, userDispatch }}
          user={userReducer.user}
        />
      )}
    </section>
  );
}
