// api.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = isDevMode()
    ? 'http://localhost:5182'
    : 'https://task-web-api.azurewebsites.net';

  const token = localStorage.getItem('token');

  let modifiedReq = req;

  if (!req.url.startsWith('http')) {
    const url = req.url.startsWith('/') ? req.url.substring(1) : req.url;
    modifiedReq = req.clone({
      url: `${baseUrl}/${url}`,
    });
  }

  if (token) {
    modifiedReq = modifiedReq.clone({
      headers: modifiedReq.headers.set('Authorization', 'Bearer ' + token),
    });
  }

  return next(modifiedReq);
};
