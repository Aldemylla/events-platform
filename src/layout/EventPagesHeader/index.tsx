import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import './styles.scss';

export default function EventPagesHeader({ page }: { page: string }) {
  return (
    <header className='event__header'>
      <Link to={'/'} className='back'>
        <Icon icon='ic:round-arrow-back-ios-new' />
      </Link>
      <h1>{page}</h1>
    </header>
  );
}
