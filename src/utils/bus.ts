import { TypedEmitter } from 'tiny-typed-emitter'

interface IStatusPayload {
  id: number;
  status: string;
}

interface MyClassEvents {
  'modal:toggle': (props: object) => void;
  'status:change': (props: IStatusPayload) => void;
}

const emitter = new TypedEmitter<MyClassEvents>()

export {
  emitter,
  IStatusPayload
}
