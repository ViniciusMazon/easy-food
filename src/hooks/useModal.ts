import bus from '../utils/bus'

const EVENT_NAME = 'modal:toggle'

export default function useModal () {
  function open (payload = {}) {
    console.log('useModal: open')
    bus.emit(EVENT_NAME, { status: true, ...payload })
  }

  function close (payload = {}) {
    console.log('useModal: close')
    bus.emit(EVENT_NAME, { status: false, ...payload })
  }

  function listen (fn: (payload: object) => void) {
    console.log('useModal: listen')
    bus.on(EVENT_NAME, fn)
  }

  function off (fn: (payload: object) => void) {
    console.log('useModal: off')
    bus.off(EVENT_NAME, fn)
  }

  return { open, close, listen, off }
}
