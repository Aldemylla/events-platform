export type EventMainBoxProps = {
  boxType: 'attend-event' | 'status-event'
  title?: string;
  submitText?: string;
  formInputs: InputType[];
}

export type FormInputs = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  terms: boolean;
};

export type SubmitFormInputs = Partial<FormInputs>

export type InputType = {
  title: string;
  name: 'name' | 'email' | 'cpf' | 'phone' | 'terms';
  type: string;
};