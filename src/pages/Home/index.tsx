import { useContext } from 'react';

import EventsContextProvider, {
  EventsContext,
  EventsContextType,
} from '../../contexts/EventsContext';

function HomeContainer() {
  const { eventsReducer, eventsDispatch } = useContext(EventsContext) as EventsContextType;

  return <div></div>;
}

export default function Home() {
  return (
    <EventsContextProvider>
      <HomeContainer />
    </EventsContextProvider>
  );
}
