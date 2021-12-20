import { Methods } from './Methods';

export type ControllerOptions = {
  method: Methods;
  path: string;
};

export const symbolPrefix = Symbol('prefix');

export const controller = (path: string) => (target: any) => {
  // TODO
};
