import { useState } from 'react';
import EventCardCarousel from '../../../components/EventCardCarousel';
import { Event, EventCategories } from '../../../contexts/EventsContext/types';

import './styles.scss';

type ListCategory = 'all' | EventCategories;

export default function HomeEventList({
  events,
  type,
}: {
  events: Event[];
  type: 'categories' | 'past';
}) {
  const [selectedCategory, setSelectedCategory] = useState<ListCategory>('all');
  const [selectedEvents, setSelectedEvents] = useState(events);

  function categoryHandler(category: ListCategory) {
    setSelectedCategory(category);

    if (category === 'all') {
      setSelectedEvents(events);
    } else {
      setSelectedEvents(events.filter((event) => event.categories.includes(category)));
    }
  }

  function categoryTranslate(category: ListCategory) {
    switch (category) {
      case 'all':
        return 'Todos';
      case 'presential':
        return 'Ao vivo';
      case 'online':
        return 'Online';
      case 'free':
        return 'Grátis';
    }
  }

  return (
    <section className={`home__events-list ${type}`}>
      {type === 'categories' ? (
        <ul>
          {(['all', 'presential', 'online', 'free'] as ListCategory[]).map((category) => (
            <li key={category} className={`${selectedCategory === category ? 'selected' : ''}`}>
              <h3 onClick={() => categoryHandler(category)}>{categoryTranslate(category)}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <h3>Eventos passados</h3>
      )}
      <EventCardCarousel events={selectedEvents} past={type === 'past'} />
    </section>
  );
}
