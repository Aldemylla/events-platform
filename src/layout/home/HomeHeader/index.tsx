import { MouseEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { Icon } from '@iconify/react';

import citiesOptions from '../../../mocks/cities';

import './styles/styles.scss';

export default function HomeHeader() {
  const searchInput = useRef<HTMLInputElement>(null);
  const selectCityMaxLength = 30;

  function searchInputFocus() {
    searchInput.current?.focus();
  }

  function searchEvent(event: MouseEvent<SVGSVGElement>) {
    event.stopPropagation();
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
            onInputChange={(inputValue) =>
              inputValue.length <= selectCityMaxLength
                ? inputValue
                : inputValue.slice(0, selectCityMaxLength)
            }
            isSearchable
          />
        </div>
      </section>
      <section className='search-bar__container' onClick={searchInputFocus}>
        <input type='search' placeholder='Nome do evento...' ref={searchInput} maxLength={200} />
        <Icon icon='ic:search' onClick={searchEvent} />
      </section>
      <Link to='/event/new' className='new-event'>
        Registrar evento
      </Link>
    </header>
  );
}
