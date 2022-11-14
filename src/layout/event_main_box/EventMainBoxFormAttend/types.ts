import { Dispatch } from "react";
import { BoxType, InputType } from "../../../components/EventMainBox/types";
import { Event } from "../../../contexts/EventsContext/types";
import { User, UserReducerAction } from "../../../contexts/UserContext/types";

export type EventMainBoxFormAttendProps = {
  user: User,
  currentEvent: Event | null,
  userDispatch: Dispatch<UserReducerAction>,
  boxType: BoxType;
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