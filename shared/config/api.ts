export const API_ENDPOINTS = {
  trip: {
    base: '/api/trips',
    create: '/api/trips',
    list: (qs: string = '') => `/api/trips${qs ? `?${qs}` : ''}`,
    detail: (id: string) => `/api/trips/${id}`,
    update: (id: string) => `/api/trips/${id}`,
    delete: (id: string) => `/api/trips/${id}`,
    popular: () => `/api/trips/popular`,
    byDate: '/api/trips/by-date',
    seats: '/api/schedules/seats',
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
    delete: (id: string) => `/api/admin/bookings/${id}`,
    reservation: '/api/reservation',
  },
  vehicle: {
    base: '/api/vehicles',
    create: '/api/vehicles',
    list: (qs: string = '') => `/api/vehicles${qs ? `?${qs}` : ''}`,
    detail: (id: string) => `/api/vehicles/${id}`,
    update: (id: string) => `/api/vehicles/${id}`,
    delete: (id: string) => `/api/vehicles/${id}`
  },
  driver: {
    base: '/api/drivers',
    create: '/api/drivers',
    list: (qs: string = '') => `/api/drivers${qs ? `?${qs}` : ''}`,
    detail: (id: string) => `/api/drivers/${id}`,
    update: (id: string) => `/api/drivers/${id}`,
    delete: (id: string) => `/api/drivers/${id}`
  },
  route: {
    base: '/api/routes',
    create: '/api/routes',
    list: (qs: string = '') => `/api/routes${qs ? `?${qs}` : ''}`,
    detail: (id: string) => `/api/routes/${id}`,
    update: (id: string) => `/api/routes/${id}`,
    delete: (id: string) => `/api/routes/${id}`
  },
  schedule: {
    base: '/api/schedules',
    create: '/api/schedules',
    list: (qs: string = '') => `/api/schedules${qs ? `?${qs}` : ''}`,
    detail: (id: string) => `/api/schedules/${id}`,
    update: (id: string) => `/api/schedules/${id}`,
    delete: (id: string) => `/api/schedules/${id}`
  },
  dashboard: {
    base: '/api/admin/dashboard',
    bookingDistribution: '/api/admin/dashboard/booking-distribution',
    cancelledTrips: '/api/admin/dashboard/cancelled-trips',
    upcomingDepartures: '/api/admin/dashboard/upcoming-departures',
    topDestinations: '/api/admin/dashboard/top-destinations',
    cancelledDepartures: '/api/admin/dashboard/cancelled-departures',
    lowOccupancyTrips: '/api/admin/dashboard/low-occupancy-trips',
    cancelledBookings: '/api/admin/dashboard/cancelled-bookings',
    recentBookings: '/api/admin/dashboard/recent-bookings',
    kpis: '/api/admin/dashboard',
    alerts: '/api/admin/dashboard/alerts',
  },
  locations: {
    departureCities: '/api/locations/departure-cities',
    destinations: (city: string) => `/api/locations/destinations?city=${encodeURIComponent(city)}`
  },
  userBookings: '/api/user/bookings',
  retryPayment: '/api/retry-payment'
};
