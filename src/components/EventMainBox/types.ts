export type BoxType = 'attend-event' | 'status-event'

export type EventMainBoxProps = {
  boxType: BoxType;
  formInputs: InputType[];
}

export type InputType = {
  title: string;
  name: 'name' | 'email' | 'cpf' | 'phone' | 'terms';
  type: string;
};