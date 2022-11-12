import { useContext } from 'react';

import HomeHeader from '../../layout/home/HomeHeader';

import EventsContextProvider, {
  EventsContext,
  EventsContextType,
} from '../../contexts/EventsContext';
import HomeEventList from '../../layout/home/HomeEventList';

function HomeContainer() {
  const { eventsReducer } = useContext(EventsContext) as EventsContextType;
  const { events } = eventsReducer;
  const pastEvents = events.filter((event) => isInThePast(event.date));

  function isInThePast(initialDate: Date) {
    function parseDate(date: Date) {
      return Date.parse(String(date));
    }

    const today = parseDate(new Date());
    const date = parseDate(initialDate);

    return date < today;
  }

  return (
    <>
      <HomeHeader />
      <main>
        <HomeEventList type='categories' events={events} />
        <HomeEventList type='past' events={pastEvents} />
      </main>
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
