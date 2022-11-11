import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';

import Home from '../pages/Home';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<h1>Not Found!</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
