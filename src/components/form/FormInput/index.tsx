import { FormInputField } from '../types';
import FormInputError from '../FormInputError';

type FormInputProps = {
  name: FormInputField;
  title: string;
  type: string;
  filled: boolean;
  register: any;
  errors: any;
};

import './styles.scss';

export default function FormInput({ name, title, type, filled, register, errors }: FormInputProps) {
  return (
    <>
      <li>
        <div className={`event__form-input ${type === 'checkbox' ? 'checkbox' : ''}`}>
          <input className={filled ? 'filled' : ''} type={type} id={name} {...register(name)} />
          {type !== 'checkbox' && (
            <span>
              <i></i>
            </span>
          )}
          <label htmlFor={name}>{title}</label>
        </div>
        {errors?.[name]?.type && <FormInputError type={errors[name].type} field={name} />}
      </li>
    </>
  );
}
