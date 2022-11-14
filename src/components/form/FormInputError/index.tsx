import errors from '../../../utils/errors.json';
import { FormInputField } from '../../form/types';

import './styles.scss';

type InputErrorProps = {
  type: string;
  field: FormInputField;
};

export default function FormInputError({ type, field }: InputErrorProps) {
  // @ts-expect-error
  return errors[field][type] && <span className='field-error'>{errors[field][type]}</span>;
}
