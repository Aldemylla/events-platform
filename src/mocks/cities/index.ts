import CITIES from './cities.json'

export interface CityOption {
  readonly value: string;
  readonly label: string;
}

const citiesOptions: readonly CityOption[] =
  CITIES.map((city) => ({ value: city, label: city }));

export default citiesOptions;