import HomeHeader from '../../layout/home/HomeHeader';

import EventsContextProvider from '../../contexts/EventsContext';
import HomeEventList from '../../layout/home/HomeEventList';

function HomeContainer() {
  return (
    <>
      <HomeHeader />
      <main>
        <HomeEventList type='categories' />
        <HomeEventList type='past' />
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
