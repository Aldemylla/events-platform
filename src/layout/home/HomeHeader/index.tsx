import { KeyboardEventHandler, MouseEvent, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { Icon } from '@iconify/react';

import citiesOptions from '../../../mocks/cities';

import './styles/styles.scss';
import { EventsContext, EventsContextType } from '../../../contexts/EventsContext';

export default function HomeHeader() {
  const { eventsDispatch } = useContext(EventsContext) as EventsContextType;
  const searchInput = useRef<HTMLInputElement>(null);
  const selectCityMaxLength = 30;

  function searchInputFocus() {
    searchInput.current?.focus();
  }

  function searchEventByLocal(value: string) {
    eventsDispatch({ type: 'EVENT_SEARCH', searchBy: 'local', payload: value });
  }

  function searchEventByTitle() {
    eventsDispatch({
      type: 'EVENT_SEARCH',
      searchBy: 'title',
      payload: searchInput.current?.value || '',
    });
  }

  return (
    <header className='home__header'>
      <section className='city-select__container'>
        <p>Encontre eventos em</p>
        <div className='city-select'>
          <Icon icon='ic:round-location-on' />
          <Select
            className='city-select__input__container'
            classNamePrefix='city-select'
            placeholder='Selecione uma cidade...'
            noOptionsMessage={() => 'Sem resultados.'}
            options={citiesOptions}
            onChange={(event) => searchEventByLocal(event?.label || '')}
            onInputChange={(inputValue) =>
              inputValue.length <= selectCityMaxLength
                ? inputValue
                : inputValue.slice(0, selectCityMaxLength)
            }
            isSearchable
            isClearable
          />
        </div>
      </section>
      <section className='search-bar__container' onClick={searchInputFocus}>
        <input
          type='search'
          placeholder='Nome do evento...'
          ref={searchInput}
          maxLength={200}
          onKeyDown={(event) => event.key === 'Enter' && searchEventByTitle()}
        />
        <Icon
          icon='ic:search'
          onClick={(event) => {
            event.stopPropagation();
            searchEventByTitle();
          }}
        />
      </section>
      <Link to='/event/new' className='new-event'>
        Registrar evento
      </Link>
    </header>
  );
}
