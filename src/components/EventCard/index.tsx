import { Icon } from '@iconify/react';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

type EventCardProps = {
  banner: string;
  date: string;
  title: string;
  local: string;
  companyName: string;
  totalVacancies: number;
  past: boolean;
  id: number;
  myEventType?: 'common' | 'empresarial';
  status?: 'pending' | 'confirmed' | 'canceled';
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
}: EventCardProps) {
  function copyEventLinkToClipboard(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    navigator.clipboard.writeText(`http://localhost:5173/event/${id}`);

    alert('Link compartilhável copiado!');
  }

  const statusIcons = {
    pending: 'ic:round-done',
    confirmed: 'ic:round-done-all',
    canceled: 'ic:round-close',
  };

  const statusIcon = status ? statusIcons[status] : '';

  return (
    <Link to={`/event/${id}`} className={`event_card ${past ? 'past' : ''}`}>
      <img src={`/images/mocks/events/${banner}`} alt='img' />
      <main className='infos'>
        <header>
          <h2>{date}</h2>
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
    </Link>
  );
}
