import { useContext, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

import EventPagesHeader from '../../layout/EventPagesHeader';
import EventDetails from '../../components/EventDetails';
import EventMainBox from '../../components/EventMainBox';

import { EventsContext, EventsContextType } from '../../contexts/EventsContext';

import { InputType } from '../../components/EventMainBox/types';

const attendEventInputs = [
  {
    title: 'Nome',
    name: 'name',
    type: 'text',
  },
  {
    title: 'E-mail',
    name: 'email',
    type: 'email',
  },
  {
    title: 'CPF',
    name: 'cpf',
    type: 'text',
  },
  {
    title: 'Celular',
    name: 'phone',
    type: 'tel',
  },
  {
    title: 'Li e aceito os Termos de Uso',
    name: 'terms',
    type: 'checkbox',
  },
] as InputType[];

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
      <EventPagesHeader page='EVENTO' />
      <EventDetails
        {...{ banner, title, date, local, totalVacancies, description }}
        companyName={organizer?.name || ''}
      />
      <EventMainBox submitText='Participar' formInputs={attendEventInputs} boxType='attend-event' />
    </>
  );
}
