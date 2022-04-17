import { TypedEmitter } from 'tiny-typed-emitter'

interface MyClassEvents {
  'modal:toggle': (props: object) => void;
}

const emitter = new TypedEmitter<MyClassEvents>()

export default emitter
