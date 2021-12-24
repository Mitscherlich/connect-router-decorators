import type { RequestHandler } from 'express';
import { Methods } from './Methods';

export type ControllerOptions = {
  method: Methods;
  path: string;
};

export const symbolPrefix = Symbol('prefix');

export interface Controller {
  new (): Controller;

  [handler: string]: RequestHandler;

  [symbolPrefix]?: string;
}

export const controller = (path: string) => (target: Controller) => {
  target[symbolPrefix] = path;
};
