export const API_ENDPOINTS = {
  trip: {
    base: '/api/trips',
    create: '/api/trips',
    list: (qs: string = '') => `/api/trips${qs ? `?${qs}` : ''}`,
    detail: (id: string) => `/api/trips/${id}`,
    update: (id: string) => `/api/trips/${id}`,
    delete: (id: string) => `/api/trips/${id}`
  },
  lesson: {
    base: '/api/lessons',
    create: '/api/lessons',
    list: (qs: string = '') => `/api/lessons${qs ? `?${qs}` : ''}`,
    detail: (id: string) => `/api/lessons/${id}`,
    update: (id: string) => `/api/lessons/${id}`,
    delete: (id: string) => `/api/lessons/${id}`
  },
  booking: {
    base: '/api/admin/bookings',
    create: '/api/admin/bookings',
    list: (qs: string = '') => `/api/admin/bookings${qs ? `?${qs}` : ''}`,
    detail: (id: string) => `/api/admin/bookings/${id}`,
    update: (id: string) => `/api/admin/bookings/${id}`,
    delete: (id: string) => `/api/admin/bookings/${id}`
  }
};
