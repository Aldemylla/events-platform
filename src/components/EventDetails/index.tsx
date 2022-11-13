import { useFormatDate } from '../../hooks/useFormatDate';

import { Icon } from '@iconify/react';

import { EventDetailsProps } from './types';

import './styles.scss';

export default function EventDetails({
  banner,
  title,
  date,
  local,
  companyName,
  totalVacancies,
  description,
}: EventDetailsProps) {
  const [formattedDate] = useFormatDate(date || new Date());

  return (
    <main className='event-details'>
      <img className='banner' src={`/images/mocks/events/${banner}`} alt={title} />
      <section className='infos'>
        <h1 className='title'>{title}</h1>
        <hgroup>
          <h2>{formattedDate}</h2>
          <h2>
            <Icon icon='ic:round-location-on' />
            {local}
          </h2>
          <h2>
            <Icon icon='ic:outline-business-center' />
            {companyName}
          </h2>
          <h2>
            <Icon icon='ic:round-people' />
            {totalVacancies} participantes
          </h2>
        </hgroup>
        <div className='description'>
          <h2>Sobre</h2>
          <p>{description}</p>
        </div>
      </section>
    </main>
  );
}
