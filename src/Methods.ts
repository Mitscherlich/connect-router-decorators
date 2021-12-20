import { router } from './router';

export enum Methods {
  ALL = 'all',
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
  OPTIONS = 'options',
  HEAD = 'head',
}

export const get = (path: string) => router({ method: Methods.GET, path });

export const post = (path: string) => router({ method: Methods.POST, path });

export const put = (path: string) => router({ method: Methods.PUT, path });

export const del = (path: string) => router({ method: Methods.DELETE, path });

export const patch = (path: string) => router({ method: Methods.PATCH, path });

export const options = (path: string) => router({ method: Methods.OPTIONS, path });

export const head = (path: string) => router({ method: Methods.HEAD, path });

export const all = (path: string) => router({ method: Methods.ALL, path });
