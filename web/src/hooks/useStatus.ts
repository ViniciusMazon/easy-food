import { emitter, IStatusPayload } from '../utils/bus'

const EVENT_NAME = 'status:change'

export default function useStatus () {
  function change (payload: IStatusPayload) {
    emitter.emit(EVENT_NAME, payload)
  }

  function listen (fn: (payload: IStatusPayload) => void) {
    emitter.on(EVENT_NAME, fn)
  }

  return {
    change,
    listen
  }
}
