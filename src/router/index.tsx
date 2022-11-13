import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Event from '../pages/Event';
import EventsContextProvider from '../contexts/EventsContext';

export default function Router() {
  return (
    <BrowserRouter>
      <EventsContextProvider>
        <Switch>
          <Route path='/' element={<Home />} />
          <Route path='/event/new' element={<h1>New event</h1>}></Route>
          <Route path='/event/:eventId' element={<Event />}></Route>
          <Route path='*' element={<h1>Not Found!</h1>} />
        </Switch>
      </EventsContextProvider>
    </BrowserRouter>
  );
}
