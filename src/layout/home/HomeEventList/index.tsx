import { useContext, useEffect, useState } from 'react';
import EventCardCarousel from '../../../components/EventCardCarousel';
import { EventsContext } from '../../../contexts/EventsContext';
import { EventCategories, EventsContextType } from '../../../contexts/EventsContext/types';

import './styles.scss';

type ListCategory = 'all' | EventCategories;

export default function HomeEventList({ type }: { type: 'categories' | 'past' }) {
  const { eventsReducer } = useContext(EventsContext) as EventsContextType;
  const { events } = eventsReducer;
  const pastEvents = events.filter((event) => isInThePast(event.date));

  const [selectedCategory, setSelectedCategory] = useState<ListCategory>('all');
  const [selectedEvents, setSelectedEvents] = useState(events);

  useEffect(() => {
    categoryHandler(selectedCategory);
  }, [events]);

  function isInThePast(initialDate: Date) {
    function parseDate(date: Date) {
      return Date.parse(String(date));
    }

    const today = parseDate(new Date());
    const date = parseDate(initialDate);

    return date < today;
  }

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
      <EventCardCarousel
        events={type === 'past' ? pastEvents : selectedEvents}
        past={type === 'past'}
      />
    </section>
  );
}
