import { Dispatch } from "react"
import { Event } from "../../../contexts/EventsContext/types"
import { UserReducerAction } from "../../../contexts/UserContext/types"

export type EventMainBoxStatusProps = {
  currentUserEvent: Event,
  userDispatch: Dispatch<UserReducerAction>,
}