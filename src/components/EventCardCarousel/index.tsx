import { useCallback, useState } from 'react';

import EventCard from '../EventCard';
import { Event } from '../../contexts/EventsContext/types';
import { UserType } from '../../contexts/UserContext/types';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.scss';

export default function EventCardCarousel({
  events,
  past,
  myEventType,
}: {
  events: Event[];
  past?: boolean;
  myEventType?: UserType;
}) {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    dots: true,
  };

  const [swiped, setSwiped] = useState(false);

  const handleSwiped = useCallback(() => {
    setSwiped(true);
  }, [setSwiped]);

  const handleOnItemClick = useCallback(
    (event: MouseEvent) => {
      if (swiped) {
        event.stopPropagation();
        event.preventDefault();
        setSwiped(false);
      }
    },
    [swiped]
  );

  return events.length > 0 ? (
    <Slider {...settings} onSwipe={handleSwiped}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          banner={event.banner}
          date={event.date}
          title={event.title}
          local={event.local}
          companyName={event.organizer.name}
          totalVacancies={event.totalVacancies}
          id={event.id}
          past={!!past}
          myEventType={myEventType}
          status={event.status}
          onClickCapture={handleOnItemClick}
        />
      ))}
    </Slider>
  ) : (
    <h1>Nenhum evento encontrado.</h1>
  );
}
