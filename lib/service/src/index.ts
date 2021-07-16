export type ServiceHandler = Function;

export type ServiceHandlers = {
  [name: string]: ServiceHandler;
};

export class Service<H extends ServiceHandlers = any> {
  constructor(name: string, handlers: H, connect?: Function) {
    this.name = name;
    this.handlers = handlers;
    this.connect = connect;
  }
  name: string;
  handlers: H;
  connect: Function;
}
