export const API_ENDPOINTS = {
  trip: {
    base: '/api/trips',
    create: '/api/trips',
    list: (qs: string = '') => `/api/trips${qs ? `?${qs}` : ''}`,
    detail: (id: string) => `/api/trips/${id}`,
    update: (id: string) => `/api/trips/${id}`,
    delete: (id: string) => `/api/trips/${id}`
  }
};
