// api.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Define your base URL
  const baseUrl = 'http://localhost:5182';

  // Get the stored token
  const token = localStorage.getItem('token');

  // Start with the original request
  let modifiedReq = req;

  // Only prepend baseUrl if the URL doesn't already include it
  // This prevents double prefixing if full URLs are used
  if (!req.url.startsWith('http')) {
    // Remove leading slash if present to avoid double slashes
    const url = req.url.startsWith('/') ? req.url.substring(1) : req.url;
    modifiedReq = req.clone({
      url: `${baseUrl}/${url}`,
    });
  }

  // Add the auth token if it exists
  if (token) {
    modifiedReq = modifiedReq.clone({
      headers: modifiedReq.headers.set('Authorization', 'Bearer ' + token),
    });
  }

  // Pass the modified request to the next handler
  return next(modifiedReq);
};
