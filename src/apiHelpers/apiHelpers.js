import { API_BASE_URL } from 'constants.js';

const buildRequest = async ({ url, method, body, headers, signal }) => {
  try {
    return await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        ...(headers || {}),
      },
      method,
      signal,
      body: JSON.stringify(body),
    });
  } catch (error) {
    return { error, hasError: true, status: error.status || null };
  }
};

export const get = (params) => buildRequest({ method: 'GET', ...params });
export const post = (params) => buildRequest({ method: 'POST', ...params });
export const put = (params) => buildRequest({ method: 'PUT', ...params });
export const del = (params) => buildRequest({ method: 'DELETE', ...params });
export const options = (params) =>
  buildRequest({ method: 'OPTIONS', ...params });
