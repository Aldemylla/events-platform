import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';

import EventsContextProvider from '../contexts/EventsContext';
import UserContextProvider from '../contexts/UserContext';

import Home from '../pages/Home';
import Event from '../pages/Event';

export default function Router() {
  return (
    <BrowserRouter>
      <EventsContextProvider>
        <UserContextProvider>
          <Switch>
            <Route path='/' element={<Home />} />
            <Route path='/events/new' element={<h1>New event</h1>}></Route>
            <Route path='/events/:eventId' element={<Event />}></Route>
            <Route path='/events/my' element={<h1>My events</h1>}></Route>
            <Route path='*' element={<h1>Not Found!</h1>} />
          </Switch>
        </UserContextProvider>
      </EventsContextProvider>
    </BrowserRouter>
  );
}
