import { emitter } from '../utils/bus'

const EVENT_NAME = 'modal:toggle'

export default function useModal () {
  function open (payload = {}) {
    emitter.emit(EVENT_NAME, { status: true, ...payload })
  }

  function close (payload = {}) {
    emitter.emit(EVENT_NAME, { status: false, ...payload })
  }

  function listen (fn: (payload: object) => void) {
    emitter.on(EVENT_NAME, fn)
  }

  function off (fn: (payload: object) => void) {
    emitter.off(EVENT_NAME, fn)
  }

  return { open, close, listen, off }
}
