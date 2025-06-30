import { z } from 'zod';

export const tripPopularitySchema = z.object({
    tripId: z.string(),
    routeLabel: z.string(),
    departureDate: z.string().nullable(),
    distanceKm: z.number().nullable(),
    bookingsCount: z.number(),
    price: z.number().nullable(),
    availableTimes: z.array(z.string()),
    duration: z.number().nullable(),
    driverName: z.string().nullable(),
    vehicleModel: z.string().nullable(),
    departureCity: z.string().nullable(),
    arrivalCity: z.string().nullable(),
});

export const tripPopularityListSchema = z.object({
    data: z.array(tripPopularitySchema),
    page: z.number(),
    limit: z.number(),
    total: z.number(),
});
