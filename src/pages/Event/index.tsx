import { useContext, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import EventDetails from '../../components/EventDetails';
import { EventsContext, EventsContextType } from '../../contexts/EventsContext';

export default function Event() {
  const { eventsReducer, eventsDispatch } = useContext(EventsContext) as EventsContextType;
  const { eventId } = useParams();

  const { banner, title, date, local, organizer, totalVacancies, description } =
    eventsReducer.currentEvent || {};

  useLayoutEffect(() => {
    if (eventId) eventsDispatch({ type: 'EVENT_CURRENT_UPDATE', payload: +eventId });
  }, []);

  return (
    <>
      <header></header>
      <EventDetails
        {...{ banner, title, date, local, totalVacancies, description }}
        companyName={organizer?.name || ''}
      />
      <section>
        <form action=''></form>
      </section>
    </>
  );
}
