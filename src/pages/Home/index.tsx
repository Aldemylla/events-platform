import { useContext } from 'react';

import HomeHeader from '../../layout/home/HomeHeader';

import EventsContextProvider, {
  EventsContext,
  EventsContextType,
} from '../../contexts/EventsContext';

function HomeContainer() {
  const { eventsReducer, eventsDispatch } = useContext(EventsContext) as EventsContextType;

  return (
    <>
      <HomeHeader />
    </>
  );
}

export default function Home() {
  return (
    <EventsContextProvider>
      <HomeContainer />
    </EventsContextProvider>
  );
}
