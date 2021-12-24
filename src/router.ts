import type { RequestHandler } from 'express';
import type { Controller, ControllerOptions } from './Controller';
import { normalizePath } from './utils';

export const routersMap = new Map<ControllerOptions & { target: Controller }, RequestHandler[]>();

export const router = (config: ControllerOptions) => (target: Controller, key: string) => {
  config.path = normalizePath(config.path);

  routersMap.set({ target, ...config }, [target[key]]);
};
