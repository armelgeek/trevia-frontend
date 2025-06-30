"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { parseAsString, useQueryState } from 'nuqs';

import { useScheduleSearch } from '@/features/schedule/hooks/use-schedule-search';
import { ScheduleSearchForm } from '@/features/schedule/components/schedule-search-form';
import { SearchSchedulesQuery } from "@/features/schedule/schedule-search.schema";
import { useDepartureCities, useDestinations } from '@/features/location/hooks/use-location';
import { DestinationsFilterSidebar } from '@/features/schedule/components/destinations-filter-sidebar';
import DestinationsList from '@/features/schedule/components/destinations-list';
import DestinationsPagination from '@/features/schedule/components/destinations-pagination';

export default function DestinationsPage() {
    // Etats locaux pour le formulaire
    const [form, setForm] = useState<{
      from: string;
      to: string;
      dateStart?: Date;
      dateEnd?: Date;
      passengers: number;
      search: string;
    }>({
      from: "",
      to: "",
      dateStart: undefined,
      dateEnd: undefined,
      passengers: 1,
      search: ""
    });
    const [view, setView] = useState<'grid' | 'list'>("list");
    // Filtres avancés
    const [selectedVehicleType, setSelectedVehicleType] = useState("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
    const [sort, setSort] = useState("");

    // Synchronisation nuqs (query params)
    const [departureCity, setDepartureCity] = useQueryState('departureCity', parseAsString.withDefault(''));
    const [arrivalCity, setArrivalCity] = useQueryState('arrivalCity', parseAsString.withDefault(''));
    const [date, setDate] = useQueryState('date', parseAsString.withDefault(''));
    const [passengersQ, setPassengersQ] = useQueryState('passengers', parseAsString.withDefault('1'));
    const [vehicleTypeQ, setVehicleTypeQ] = useQueryState('vehicleType', parseAsString.withDefault(''));
    const [minPriceQ, setMinPriceQ] = useQueryState('minPrice', parseAsString.withDefault('0'));
    const [maxPriceQ, setMaxPriceQ] = useQueryState('maxPrice', parseAsString.withDefault('200'));
    const [sortQ, setSortQ] = useQueryState('sort', parseAsString.withDefault(''));
    // Pagination
    const [pageQ, setPageQ] = useQueryState('page', parseAsString.withDefault('1'));

    // Query API
    const query = {
      departureCity,
      arrivalCity,
      date,
      passengers: passengersQ,
      vehicleType: vehicleTypeQ,
      minPrice: minPriceQ,
      maxPrice: maxPriceQ,
      sort: sortQ,
      page: pageQ,
      limit: '10'
    };

    const {
      data: searchResult,
      isLoading,
      isError
    } = useScheduleSearch(query as SearchSchedulesQuery, Boolean(query.departureCity || query.arrivalCity || query.date));

    const mappedResults = Array.isArray(searchResult)
      ? searchResult.map((item) => ({
          from: item.departureCity,
          to: item.arrivalCity,
          horaires: [item.departure],
          isPopular: false,
          distanceKm: item.distanceKm,
          ...item
        }))
      : [];

    const { data: departureCities = [] } = useDepartureCities();
    const { data: destinationCities = [] } = useDestinations(form.from);
    const vehicleTypes = ["Bus", "Minibus", "Van"];

    const handleFromChange = (city: string) => {
      setForm(f => ({ ...f, from: city }));
    };
    const handleToChange = (city: string) => {
      setForm(f => ({ ...f, to: city }));
    };
    const handleSearchChange = (val: string) => {
      setForm(f => ({ ...f, search: val }));
    };
    const handleVehicleTypeChange = (type: string) => {
      setSelectedVehicleType(type);
      setVehicleTypeQ(type);
    };
    const handlePriceRangeChange = (range: [number, number]) => {
      setPriceRange(range);
      setMinPriceQ(String(range[0]));
      setMaxPriceQ(String(range[1]));
    };
    const handleSortChange = (s: string) => {
      setSort(s);
      setSortQ(s);
    };
    const handleReset = () => {
      setForm({ from: "", to: "", dateStart: undefined, dateEnd: undefined, passengers: 1, search: "" });
      setSelectedVehicleType("");
      setPriceRange([0, 200]);
      setSort("");
      setDepartureCity("");
      setArrivalCity("");
      setVehicleTypeQ("");
      setMinPriceQ("0");
      setMaxPriceQ("200");
      setSortQ("");
      setDate("");
      setPassengersQ("1");
    };
    const handleViewChange = (v: 'grid' | 'list') => {
      setView(v);
    };

    const handleFormSubmit = (params: typeof form) => {
      setDepartureCity(params.from);
      setArrivalCity(params.to);
      setDate(params.dateStart ? params.dateStart.toISOString().slice(0, 10) : '');
      setPassengersQ(String(params.passengers));
   
    };

    // Pagination calculée à partir du résultat API (adapter selon le backend)
    const total = searchResult?.total ?? 0;
    const limit = 10;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    // Handler changement de page
    const handlePageChange = (newPage: number) => {
      setPageQ(String(newPage));
    };

    return (
        <>
            <ScheduleSearchForm
              from={form.from}
              to={form.to}
              dateStart={form.dateStart}
              dateEnd={form.dateEnd}
              passengers={form.passengers}
              search={form.search}
              uniqueFrom={departureCities}
              uniqueTo={destinationCities}
              onChange={params => setForm(params)}
              onSubmit={handleFormSubmit}
            />
            <div className="flex flex-col md:flex-row gap-8">
                <DestinationsFilterSidebar
                  from={form.from}
                  to={form.to}
                  search={form.search}
                  view={view}
                  departureCities={departureCities}
                  destinationCities={destinationCities}
                  vehicleTypes={vehicleTypes}
                  selectedVehicleType={selectedVehicleType}
                  minPrice={0}
                  maxPrice={200}
                  priceRange={priceRange}
                  sort={sort}
                  onFromChange={handleFromChange}
                  onToChange={handleToChange}
                  onSearchChange={handleSearchChange}
                  onVehicleTypeChange={handleVehicleTypeChange}
                  onPriceRangeChange={handlePriceRangeChange}
                  onSortChange={handleSortChange}
                  onReset={handleReset}
                  onViewChange={handleViewChange}
                />
                <div className="md:hidden bg-white/90 rounded-xl p-4 mb-8 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Search className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-base">Filtres</span>
                    </div>
                </div>
                <main className="flex-1 mb-10">
                  <DestinationsList
                    results={mappedResults}
                    isLoading={isLoading}
                    isError={isError}
                    view={view}
                  />
                  <DestinationsPagination
                    page={Number(pageQ)}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </main>
            </div>
        </>
    );
}
