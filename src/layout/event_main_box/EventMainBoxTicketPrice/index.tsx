import { useContext } from 'react';
import { EventsContext, EventsContextType } from '../../../contexts/EventsContext';

import './styles.scss';

export default function EventMainBoxTicketPrice() {
  const { eventsReducer } = useContext(EventsContext) as EventsContextType;

  const { currentEvent } = eventsReducer;

  return (
    <div className='ticket-price'>
      <h2>Total:</h2>
      <p>
        {currentEvent?.ticketPrice.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </p>
    </div>
  );
}
