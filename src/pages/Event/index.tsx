import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EventsContext, EventsContextType } from '../../contexts/EventsContext';

export default function Event() {
  const { eventsReducer, eventsDispatch } = useContext(EventsContext) as EventsContextType;
  const { eventId } = useParams();

  useEffect(() => {
    eventsDispatch({ type: 'EVENT_CURRENT_UPDATE', payload: 1 });
  }, []);
  return <div>{eventsReducer.currentEvent?.title}</div>;
}
