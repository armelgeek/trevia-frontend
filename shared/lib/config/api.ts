export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

export const API_ENDPOINTS = {
  categories: {
    base: '/categories',
    list: (qs: string) => `/categories${qs}`,
    create: '/categories',
    detail: (slug: string) => `/categories/${slug}`,
    update: (slug: string) => `/categories/${slug}`,
    delete: (slug: string) => `/categories/${slug}`,
  },
  bookings: {
    base: '/api/admin/bookings',
    list: (qs: string) => `/api/admin/bookings${qs}`,
    create: '/api/admin/bookings',
    detail: (id: string) => `/api/admin/bookings/${id}`,
    update: (id: string) => `/api/admin/bookings/${id}`,
    delete: (id: string) => `/api/admin/bookings/${id}`,
  }
} as const;
