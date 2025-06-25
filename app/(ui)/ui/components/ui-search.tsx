"use client";

import { LabeledSection } from "./ui-section";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, MapPin, Clock, Users, X, Filter } from "lucide-react";
import { useState } from "react";

interface SearchResult {
  id: string;
  type: "city" | "station" | "route";
  name: string;
  description?: string;
  meta?: string;
}

interface AutocompleteProps {
  placeholder?: string;
  data: SearchResult[];
  onSelect?: (result: SearchResult) => void;
  variant?: "simple" | "with-icon" | "detailed";
}

const citiesData: SearchResult[] = [
  { id: "1", type: "city", name: "Paris", description: "Capitale de la France", meta: "Île-de-France" },
  { id: "2", type: "city", name: "Lyon", description: "Deuxième ville de France", meta: "Auvergne-Rhône-Alpes" },
  { id: "3", type: "city", name: "Marseille", description: "Cité phocéenne", meta: "PACA" },
  { id: "4", type: "city", name: "Toulouse", description: "Ville rose", meta: "Occitanie" },
  { id: "5", type: "city", name: "Nice", description: "Perle de la Côte d'Azur", meta: "PACA" },
  { id: "6", type: "city", name: "Nantes", description: "Capitale des Pays de la Loire", meta: "Pays de la Loire" },
  { id: "7", type: "city", name: "Strasbourg", description: "Capitale européenne", meta: "Grand Est" },
  { id: "8", type: "city", name: "Montpellier", description: "Ville dynamique du Sud", meta: "Occitanie" },
  { id: "9", type: "city", name: "Bordeaux", description: "Capitale mondiale du vin", meta: "Nouvelle-Aquitaine" },
  { id: "10", type: "city", name: "Lille", description: "Capitale des Flandres", meta: "Hauts-de-France" }
];

const stationsData: SearchResult[] = [
  { id: "s1", type: "station", name: "Gare de Lyon Part-Dieu", description: "Station principale", meta: "Lyon" },
  { id: "s2", type: "station", name: "Gare de Paris Bercy", description: "Station centrale", meta: "Paris" },
  { id: "s3", type: "station", name: "Gare de Marseille Saint-Charles", description: "Gare principale", meta: "Marseille" }
];

const routesData: SearchResult[] = [
  { id: "r1", type: "route", name: "Paris - Lyon", description: "4h30 • Direct", meta: "35€" },
  { id: "r2", type: "route", name: "Lyon - Marseille", description: "3h15 • Direct", meta: "28€" },
  { id: "r3", type: "route", name: "Paris - Marseille", description: "7h45 • 1 arrêt", meta: "45€" }
];

function Autocomplete({ placeholder = "Rechercher...", data, onSelect, variant = "simple" }: AutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.description?.toLowerCase().includes(query.toLowerCase()) ||
    item.meta?.toLowerCase().includes(query.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch (type) {
      case "city": return <MapPin className="w-4 h-4" />;
      case "station": return <MapPin className="w-4 h-4 text-blue-600" />;
      case "route": return <Clock className="w-4 h-4 text-green-600" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "city": return "Ville";
      case "station": return "Gare";
      case "route": return "Trajet";
      default: return "";
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? data.find((item) => item.id === value)?.name
            : placeholder}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput 
            placeholder={placeholder}
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup>
              {filteredData.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    onSelect?.(item);
                  }}
                  className="flex items-center space-x-3"
                >
                  {variant !== "simple" && getIcon(item.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{item.name}</span>
                      {variant === "detailed" && (
                        <Badge variant="secondary" className="text-xs">
                          {getTypeLabel(item.type)}
                        </Badge>
                      )}
                    </div>
                    {variant === "detailed" && item.description && (
                      <p className="text-sm text-gray-500">{item.description}</p>
                    )}
                  </div>
                  {variant === "detailed" && item.meta && (
                    <span className="text-sm text-gray-400">{item.meta}</span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function AdvancedSearch() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const availableFilters = [
    "Direct seulement",
    "Moins de 5h",
    "Wifi disponible",
    "Prises électriques",
    "Bagages inclus",
    "Animaux autorisés"
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Ville de départ</Label>
          <Autocomplete
            placeholder="Rechercher une ville..."
            data={citiesData}
            variant="with-icon"
            onSelect={(result) => console.log("From:", result)}
          />
        </div>

        <div className="space-y-2">
          <Label>Ville d&apos;arrivée</Label>
          <Autocomplete
            placeholder="Rechercher une ville..."
            data={citiesData}
            variant="with-icon"
            onSelect={(result) => console.log("To:", result)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Filtres avancés</Label>
        <div className="flex flex-wrap gap-2">
          {availableFilters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilters.includes(filter) ? "default" : "outline"}
              size="sm"
              onClick={() => 
                activeFilters.includes(filter) 
                  ? removeFilter(filter) 
                  : addFilter(filter)
              }
            >
              <Filter className="w-3 h-3 mr-1" />
              {filter}
            </Button>
          ))}
        </div>

        {activeFilters.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Filtres actifs :</Label>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center space-x-1">
                  <span>{filter}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => removeFilter(filter)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchHistory() {
  const recentSearches = [
    "Paris → Lyon",
    "Marseille → Nice", 
    "Toulouse → Montpellier",
    "Bordeaux → Nantes"
  ];

  const popularSearches = [
    "Paris → Lyon",
    "Lyon → Marseille",
    "Paris → Marseille",
    "Nice → Monaco",
    "Toulouse → Barcelona"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Recherches récentes</h3>
        <div className="space-y-2">
          {recentSearches.map((search, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-600 hover:text-gray-900"
            >
              <Clock className="w-4 h-4 mr-2" />
              {search}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Recherches populaires</h3>
        <div className="space-y-2">
          {popularSearches.map((search, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-600 hover:text-gray-900"
            >
              <Users className="w-4 h-4 mr-2" />
              {search}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SearchSample() {
  return (
    <div className="space-y-8">
      <LabeledSection label="Autocomplete Simple">
        <div className="max-w-md space-y-4">
          <div>
            <Label>Recherche de ville</Label>
            <Autocomplete
              placeholder="Tapez le nom d'une ville..."
              data={citiesData}
              variant="simple"
              onSelect={(result) => console.log("Selected:", result)}
            />
          </div>
        </div>
      </LabeledSection>

      <LabeledSection label="Autocomplete avec Icônes">
        <div className="max-w-md space-y-4">
          <div>
            <Label>Recherche de gare</Label>
            <Autocomplete
              placeholder="Rechercher une gare..."
              data={stationsData}
              variant="with-icon"
              onSelect={(result) => console.log("Selected:", result)}
            />
          </div>
        </div>
      </LabeledSection>

      <LabeledSection label="Autocomplete Détaillé">
        <div className="max-w-md space-y-4">
          <div>
            <Label>Recherche de trajet</Label>
            <Autocomplete
              placeholder="Rechercher un trajet..."
              data={[...citiesData, ...stationsData, ...routesData]}
              variant="detailed"
              onSelect={(result) => console.log("Selected:", result)}
            />
          </div>
        </div>
      </LabeledSection>

      <LabeledSection label="Recherche Avancée">
        <AdvancedSearch />
      </LabeledSection>

      <LabeledSection label="Historique de Recherche">
        <div className="max-w-md">
          <SearchHistory />
        </div>
      </LabeledSection>
    </div>
  );
}
