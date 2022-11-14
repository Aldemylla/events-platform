import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormInput from '../form/FormInput';

import { UserContext, UserContextType } from '../../contexts/UserContext';
import { EventsContext, EventsContextType } from '../../contexts/EventsContext';
import { CPF, PHONE_NUMBER } from '../../utils/validations';

import { SubmitFormInputs, EventMainBoxProps, FormInputs, InputType } from './types';

import './styles.scss';

const validationSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.string().matches(CPF).required(),
    phone: yup.string().matches(PHONE_NUMBER).required(),
    terms: yup.boolean().oneOf([true]),
  })
  .required();

export default function EventMainBox({
  boxType,
  title,
  formInputs,
  submitText,
}: EventMainBoxProps) {
  const navigate = useNavigate();

  const { userReducer, userDispatch } = useContext(UserContext) as UserContextType;
  const { eventsReducer } = useContext(EventsContext) as EventsContextType;
  const { register, handleSubmit, formState, watch } = useForm<FormInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;
  const { currentEvent } = eventsReducer;
  const eventTicketFree = currentEvent?.categories.includes('free');

  function onSubmit(formData: SubmitFormInputs) {
    const { name, email, cpf, phone, terms } = formData;

    switch (boxType) {
      case 'attend-event':
        if (!userReducer.user && name && email && cpf && phone)
          userDispatch({
            type: 'USER_CREATE',
            payload: { ...{ name, email, cpf, phone, terms }, type: 'common' },
          });

        if (userReducer.user && currentEvent) {
          userDispatch({
            type: 'EVENT_JOIN',
            payload: currentEvent,
          });

          if (eventTicketFree) {
            navigate('/events/my');
          }
        }
        break;

      default:
        break;
    }
  }

  function onError() {
    const error = 'Ocorreu um erro no envio do formulário';

    alert(error);
    throw new Error(error);
  }

  return (
    <section className='event__main-box'>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <fieldset>
          {title && <legend>{title}</legend>}
          <ul className='inputs-list'>
            {formInputs.map(({ title, name, type }: InputType) => (
              <Fragment key={name}>
                {name === 'terms' && !eventTicketFree && (
                  <div className='ticketPrice'>
                    <h2>Total:</h2>
                    <p>
                      {currentEvent?.ticketPrice.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  </div>
                )}
                <FormInput
                  {...{ title, name, type }}
                  register={register}
                  errors={errors}
                  filled={!!watch(name)}
                />
              </Fragment>
            ))}
          </ul>
          {submitText && (
            <button type='submit' disabled={!formState.isValid}>
              {submitText}
            </button>
          )}
        </fieldset>
      </form>
    </section>
  );
}
