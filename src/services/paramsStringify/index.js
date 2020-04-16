export const paramStringify = (params) => Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&');
