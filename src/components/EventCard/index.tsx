import { Icon } from '@iconify/react';
import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { EventStatus } from '../../contexts/EventsContext/types';
import { UserType } from '../../contexts/UserContext/types';

import './styles.scss';

type EventCardProps = {
  banner: string;
  date: Date;
  title: string;
  local: string;
  companyName: string;
  totalVacancies: number;
  past: boolean;
  id: number;
  myEventType?: UserType;
  status?: EventStatus;
  onClickCapture: (event: any) => void;
};

export default function EventCard({
  banner,
  date,
  title,
  local,
  companyName,
  totalVacancies,
  past,
  id,
  myEventType,
  status,
  onClickCapture,
}: EventCardProps) {
  const navigate = useNavigate();

  const statusIcons = {
    pending: 'ic:round-done',
    confirmed: 'ic:round-done-all',
    canceled: 'ic:round-close',
  };

  const statusIcon = status ? statusIcons[status] : '';

  function copyEventLinkToClipboard(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    navigator.clipboard.writeText(`http://localhost:5173/event/${id}`);

    alert('Link compartilhável copiado!');
  }

  function navigateToEventDetails() {
    navigate(`/event/${id}`);
  }

  return (
    <div
      role='link'
      className={`event_card ${past ? 'past' : ''}`}
      onClick={navigateToEventDetails}
      onClickCapture={onClickCapture}
    >
      <img src={`/images/mocks/events/${banner}`} alt='img' />
      <main className='infos'>
        <header>
          <h2>{String(date)}</h2>
          <h1>{title}</h1>
        </header>
        <section className='more-infos'>
          <hgroup>
            <h2>
              <Icon icon='ic:round-location-on' />
              {local}
            </h2>
            <h2>
              <Icon icon='ic:outline-business-center' />
              {companyName} • {totalVacancies} participantes
            </h2>
          </hgroup>
          <nav>
            {myEventType === 'empresarial' ? (
              <Icon icon='ic:round-delete-forever' />
            ) : status ? (
              <Icon icon={statusIcon} className={`status--${status}`} />
            ) : (
              <Link to='/'>
                <Icon icon='ic:round-shopping-cart' />
              </Link>
            )}
            <button className='share-button' onClick={copyEventLinkToClipboard}>
              <Icon icon='ic:round-share' />
            </button>
          </nav>
        </section>
      </main>
    </div>
  );
}
