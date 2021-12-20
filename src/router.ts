import { RequestHandler } from 'express';
import { ControllerOptions } from './Controller';
import { normalizePath } from './utils';

export const routersMap = new Map<ControllerOptions & { target: any }, RequestHandler[]>();

export const router = (config: ControllerOptions) => (target: any, key: string) => {
  config.path = normalizePath(config.path);

  routersMap.set({ target, ...config }, target[key]);
};
