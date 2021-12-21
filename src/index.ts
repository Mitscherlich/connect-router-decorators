import express, { RequestHandler } from 'express';
import glob from 'glob';
import { resolve } from 'path';
import { symbolPrefix } from './Controller';
import { routersMap } from './router';
import { normalizePath, toArray } from './utils';

export interface RouterOptions extends express.RouterOptions {
  searchPattern?: string;
}

export class Router {
  private apiPath: string;
  private options: RouterOptions;
  private router: express.Router;
  private beforeHooks: RequestHandler[] = [];
  private afterHooks: RequestHandler[] = [];
  private __init__: boolean = false;

  constructor(path: string, options: RouterOptions = {}) {
    this.apiPath = path;
    this.options = options;
    this.router = express.Router(options);
  }

  beforeAll(...hooks: RequestHandler[]): Router {
    this.beforeHooks = this.beforeHooks.concat(hooks);
    return this;
  }

  afterAll(...hooks: RequestHandler[]): Router {
    this.afterHooks = this.afterHooks.concat(hooks);
    return this;
  }

  routes(): RequestHandler[] {
    if (!this.__init__) {
      this.loadRoutes();
      this.__init__ = true;
    }

    return [...this.beforeHooks, this.router, ...this.afterHooks];
  }

  private loadRoutes() {
    glob.sync(resolve(this.apiPath, this.options.searchPattern || '**/*.{js,ts}')).forEach(require);

    routersMap.forEach((controller, config) => {
      const controllers = toArray(controller);

      let prefixPath = config.target[symbolPrefix];
      if (prefixPath) {
        prefixPath = normalizePath(prefixPath);
      }

      const routerPath = prefixPath + config.path;

      this.router[config.method](routerPath, ...controllers);
    });
  }
}

export { Methods, get, post, put, del, patch, options, all } from './Methods';

export { ControllerOptions, controller } from './Controller';
