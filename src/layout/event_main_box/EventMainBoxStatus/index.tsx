import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import EventMainBoxTicketPrice from '../EventMainBoxTicketPrice';

import { EventMainBoxStatusProps } from './types';

import './styles.scss';

export default function EventMainBoxStatus({
  currentUserEvent,
  userDispatch,
}: EventMainBoxStatusProps) {
  const currentUserEventStatus = currentUserEvent.status;
  const eventIsOnline = currentUserEvent.categories.includes('online');
  const statusConfirmed = currentUserEventStatus === 'confirmed';
  const statusPending = currentUserEventStatus === 'pending';
  const statusCanceled = currentUserEventStatus === 'canceled';

  function updateEventStatusToConfirmed() {
    userDispatch({
      type: 'EVENT_UPDATE_STATUS',
      payload: { eventId: currentUserEvent.id, status: 'confirmed' },
    });
  }

  function statusForwarderButtonHandler() {
    switch (currentUserEventStatus) {
      case 'confirmed':
        window.print();
        break;

      case 'canceled':
        userDispatch({
          type: 'EVENT_UPDATE_STATUS',
          payload: { eventId: currentUserEvent.id, status: 'pending' },
        });
        break;

      default:
        break;
    }
  }

  return (
    <div className={`status ${currentUserEventStatus}`}>
      <h1>
        Status:{' '}
        <strong className='dynamically-status'>
          {statusCanceled
            ? 'Cancelado'
            : statusConfirmed
            ? 'Confirmado'
            : statusPending
            ? 'Pendente'
            : 'Inválido'}
        </strong>
      </h1>
      {statusPending && (
        <>
          <h2>Forma de pagamento:</h2>
          <div className='pix__container'>
            <Icon icon='ic:baseline-pix' />
            <p>Pix</p>
          </div>
          <img className='qr-code' src='/images/mocks/events/qr_code.png' alt='QR code' />
          <h2>Enviaremos a confirmação por e-mail</h2>
          <EventMainBoxTicketPrice />
          <button className='mock-payment' onClick={updateEventStatusToConfirmed}>
            (Simular confirmação de pagamento)
          </button>
        </>
      )}
      {statusCanceled && <h2>Tempo esgotado</h2>}
      {((statusConfirmed && !eventIsOnline) || statusCanceled) && (
        <button className='forwarder-button' onClick={statusForwarderButtonHandler}>
          {statusCanceled ? 'Tentar novamente' : 'Imprimir comprovante'}
          {statusCanceled && <Icon icon='ic:round-autorenew' />}
        </button>
      )}
      {statusConfirmed && eventIsOnline && (
        <Link to='/' target='_blank' className='forwarder-button'>
          Ir para evento <Icon icon='ic:round-launch' />
        </Link>
      )}
    </div>
  );
}
