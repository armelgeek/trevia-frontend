"use client";

import { useState, useRef } from "react";
import { Input } from "@/shared/components/atoms/ui/input";
import { Button } from "@/shared/components/atoms/ui/button";
import { DestinationCard } from "@/app/(ui)/ui/components/ui-destination-card";
import { DestinationCardHorizontal } from "@/app/(ui)/ui/components/ui-destination-card-horizontal";
import { DateTimePicker } from "@/shared/components/atoms/date-picker";

import { Search, Filter } from "lucide-react";

const allDestinations = [
    { from: "Paris", to: "Lyon", duration: "4h30", price: 35, isPopular: true, horaires: ["08:00", "10:30", "14:00", "18:00"] },
    { from: "Lyon", to: "Marseille", duration: "3h15", price: 28, isPopular: false, horaires: ["07:45", "12:00", "16:30"] },
    { from: "Paris", to: "Bordeaux", duration: "5h45", price: 42, isPopular: true, horaires: ["09:00", "13:00", "17:00"] },
    { from: "Lille", to: "Paris", duration: "2h30", price: 25, isPopular: false, horaires: ["06:30", "11:00", "15:30"] },
    { from: "Toulouse", to: "Montpellier", duration: "2h15", price: 22, isPopular: false, horaires: ["08:15", "12:45", "19:00"] },
    { from: "Paris", to: "Nice", duration: "8h30", price: 65, isPopular: true, isDirect: false, horaires: ["07:00", "14:00"] },
    { from: "Marseille", to: "Nice", duration: "2h45", price: 30, isPopular: false, horaires: ["10:00", "18:00"] },
    { from: "Bordeaux", to: "Toulouse", duration: "2h00", price: 20, isPopular: false, horaires: ["09:30", "13:30", "17:30"] },
    { from: "Lyon", to: "Grenoble", duration: "1h30", price: 18, isPopular: false, horaires: ["08:00", "12:00", "16:00"] },
];

const uniqueFrom = Array.from(new Set(allDestinations.map(d => d.from)));
const uniqueTo = Array.from(new Set(allDestinations.map(d => d.to)));

export default function DestinationsPage() {
    const [search, setSearch] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [view, setView] = useState<'grid' | 'list'>("list");
    const [dateStart, setDateStart] = useState<Date | undefined>(undefined);
    const [dateEnd, setDateEnd] = useState<Date | undefined>(undefined);
    const [passengers, setPassengers] = useState(1);
    const formRef = useRef<HTMLFormElement>(null);

    const filtered = allDestinations.filter(d => {
        const matchSearch =
            search === "" ||
            d.from.toLowerCase().includes(search.toLowerCase()) ||
            d.to.toLowerCase().includes(search.toLowerCase());
        const matchFrom = from === "" || d.from === from;
        const matchTo = to === "" || d.to === to;
        return matchSearch && matchFrom && matchTo;
    });

    return (
        <>
            {/* Header recherche et résultats */}
            <div className="w-full flex flex-col items-center justify-center my-5 border border-gray-200 bg-white/90 z-20 sticky top-14 pt-0">
                <form
                    ref={formRef}
                    className="flex flex-col md:flex-row items-center gap-4 w-full max-w-3xl mx-auto bg-white/90 rounded-2xl p-6 justify-center"
                    onSubmit={e => { e.preventDefault(); }}
                >
                    <div className="flex flex-col md:flex-row gap-4 w-full items-center flex-1 justify-center">
                        <div className="flex flex-col w-full md:w-auto min-w-[180px]">
                            <label htmlFor="dateStart" className="text-xs font-medium text-gray-600 mb-1">Date de départ</label>
                            <DateTimePicker
                                value={dateStart}
                                onChange={setDateStart}
                                placeholder="Choisir une date"
                                displayFormat={{ hour24: 'dd MMMM yyyy' }}
                                granularity="day"
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-auto min-w-[180px]">
                            <label htmlFor="dateEnd" className="text-xs font-medium text-gray-600 mb-1">Date de retour</label>
                            <DateTimePicker
                                value={dateEnd}
                                onChange={setDateEnd}
                                placeholder="Retour (optionnel)"
                                displayFormat={{ hour24: 'dd MMMM yyyy' }}
                                granularity="day"
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-auto min-w-[120px]">
                            <label htmlFor="passengers" className="text-xs font-medium text-gray-600 mb-1">Passagers</label>
                            <Input
                                id="passengers"
                                type="number"
                                min={1}
                                max={10}
                                value={passengers}
                                onChange={e => setPassengers(Number(e.target.value))}
                                className="min-w-[100px] border-2 border-red-500"
                                aria-label="Nombre de passagers"
                            />
                        </div>
                    </div>
                    <Button type="submit" className="px-6 font-semibold mt-2 md:mt-6 w-full md:w-auto">
                        Vérifier les disponibilités
                    </Button>
                </form>
            </div>
            {/* Layout responsive : sidebar sur desktop, filtres en haut sur mobile */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filtres (desktop) */}
                <aside className="hidden md:flex md:w-[300px] flex-col gap-6 bg-white/90 rounded-xl p-6 shadow-sm border h-fit sticky top-44 z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Filter className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-base">Filtres</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <span className="font-medium text-sm">Départ</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <Button
                                    size="sm"
                                    variant={from === "" ? "default" : "outline"}
                                    onClick={() => setFrom("")}
                                >
                                    Tous
                                </Button>
                                {uniqueFrom.map(city => (
                                    <Button
                                        key={city}
                                        size="sm"
                                        variant={from === city ? "default" : "outline"}
                                        onClick={() => setFrom(city)}
                                    >
                                        {city}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="font-medium text-sm">Arrivée</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <Button
                                    size="sm"
                                    variant={to === "" ? "default" : "outline"}
                                    onClick={() => setTo("")}
                                >
                                    Tous
                                </Button>
                                {uniqueTo.map(city => (
                                    <Button
                                        key={city}
                                        size="sm"
                                        variant={to === city ? "default" : "outline"}
                                        onClick={() => setTo(city)}
                                    >
                                        {city}
                                    </Button>
                                ))}
                            </div>
                        </div>
                       
                        
                    </div>
                </aside>
                {/* Filtres en haut (mobile) */}
                <div className="md:hidden bg-white/90 rounded-xl p-4 mb-8 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Filter className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-base">Filtres</span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div>
                            <span className="font-medium text-sm">Départ</span>
                            <div className="flex gap-2 overflow-x-auto pb-1 mt-2">
                                <Button
                                    size="sm"
                                    variant={from === "" ? "default" : "outline"}
                                    onClick={() => setFrom("")}
                                    className="min-w-[70px]"
                                >
                                    Tous
                                </Button>
                                {uniqueFrom.map(city => (
                                    <Button
                                        key={city}
                                        size="sm"
                                        variant={from === city ? "default" : "outline"}
                                        onClick={() => setFrom(city)}
                                        className="min-w-[70px]"
                                    >
                                        {city}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="font-medium text-sm">Arrivée</span>
                            <div className="flex gap-2 overflow-x-auto pb-1 mt-2">
                                <Button
                                    size="sm"
                                    variant={to === "" ? "default" : "outline"}
                                    onClick={() => setTo("")}
                                    className="min-w-[70px]"
                                >
                                    Tous
                                </Button>
                                {uniqueTo.map(city => (
                                    <Button
                                        key={city}
                                        size="sm"
                                        variant={to === city ? "default" : "outline"}
                                        onClick={() => setTo(city)}
                                        className="min-w-[70px]"
                                    >
                                        {city}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="font-medium text-sm">Recherche</span>
                            <div className="relative mt-2">
                                <Input
                                    placeholder="Ville de départ ou d'arrivée"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => { setFrom(""); setTo(""); setSearch(""); }}>
                            Réinitialiser
                        </Button>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="font-medium text-sm">Affichage :</span>
                            <Button
                                size="sm"
                                variant={view === "grid" ? "default" : "outline"}
                                onClick={() => setView("grid")}
                            >
                                Grille
                            </Button>
                            <Button
                                size="sm"
                                variant={view === "list" ? "default" : "outline"}
                                onClick={() => setView("list")}
                            >
                                Liste
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Liste des voyages */}
                <main className="flex-1 mb-10">
                    {view === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.length === 0 ? (
                                <div className="col-span-full text-center text-gray-500 py-16">
                                    Aucun voyage trouvé.
                                </div>
                            ) : (
                                filtered.map((dest, i) => (
                                    <DestinationCard key={i} {...dest} horaires={dest.horaires} />
                                ))
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {filtered.length === 0 ? (
                                <div className="text-center text-gray-500 py-16">
                                    Aucun voyage trouvé.
                                </div>
                            ) : (
                                filtered.map((dest, i) => (
                                    <DestinationCardHorizontal key={i} {...dest} />
                                ))
                            )}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
