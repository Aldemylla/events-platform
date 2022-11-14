import { Fragment, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormInput from '../../../components/form/FormInput';
import EventMainBoxTicketPrice from '../EventMainBoxTicketPrice';

import { CPF, PHONE_NUMBER } from '../../../utils/validations';

import { EventMainBoxFormAttendProps, FormInputs, SubmitFormInputs } from './types';
import { InputType } from '../../../components/EventMainBox/types';

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

export default function EventMainBoxFormAttend({
  user,
  formInputs,
  currentEvent,
  userDispatch,
}: EventMainBoxFormAttendProps) {
  const { register, handleSubmit, formState, watch } = useForm<FormInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;
  const eventTicketFree = currentEvent?.categories.includes('free');

  function onSubmit(formData: SubmitFormInputs) {
    const { name, email, cpf, phone, terms } = formData;

    if (!user.name && name && email && cpf && phone) {
      userDispatch({
        type: 'USER_CREATE',
        payload: { ...{ name, email, cpf, phone, terms }, type: 'common' },
      });
    }
    eventJoin();
  }

  function eventJoin() {
    if (currentEvent) {
      userDispatch({
        type: 'EVENT_JOIN',
        payload: currentEvent,
      });
    }
  }

  function onError() {
    const error = 'Ocorreu um erro no envio do formulário';

    alert(error);
    throw new Error(error);
  }

  return user.name ? (
    <div className='attend-event logged'>
      <section className='user-infos'>
        <p>Nome: {user.name}</p>
        <p>E-mail: {user.email}</p>
        <p>CPF: {user.cpf}</p>
        <p>Celular: {user.phone}</p>
      </section>
      <button className='forwarder-button' onClick={eventJoin} disabled={!user}>
        Participar
      </button>
    </div>
  ) : (
    <form className='attend-event' onSubmit={handleSubmit(onSubmit, onError)}>
      <fieldset>
        <ul className='inputs-list'>
          {formInputs.map(({ title, name, type }: InputType) => (
            <Fragment key={name}>
              {name === 'terms' && !eventTicketFree && <EventMainBoxTicketPrice />}
              <FormInput
                {...{ title, name, type }}
                register={register}
                errors={errors}
                filled={!!watch(name)}
              />
            </Fragment>
          ))}
        </ul>
        <button className='forwarder-button' type='submit' disabled={!formState.isValid}>
          Participar
        </button>
      </fieldset>
    </form>
  );
}
