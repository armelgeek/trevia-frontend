"use client";

import { LabeledSection } from "./ui-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterButtonsProps {
  title?: string;
  options: FilterOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: "buttons" | "pills" | "tabs";
}

function FilterButtons({ 
  title = "Filtrer par :", 
  options, 
  defaultValue, 
  onChange,
  variant = "buttons"
}: FilterButtonsProps) {
  const [selected, setSelected] = useState(defaultValue || options[0]?.value);

  const handleChange = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  const baseClasses = "transition-all duration-200";
  
  const variantClasses = {
    buttons: {
      container: "flex flex-wrap gap-3",
      button: "px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:border-primary hover:text-primary",
      active: "bg-primary text-white border-primary hover:bg-accent hover:border-accent"
    },
    pills: {
      container: "flex flex-wrap gap-2",
      button: "px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-full hover:border-primary hover:text-primary",
      active: "bg-primary text-white border-primary hover:bg-accent hover:border-accent"
    },
    tabs: {
      container: "flex border-b border-gray-200",
      button: "px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-primary hover:text-primary",
      active: "border-primary text-primary"
    }
  };

  const classes = variantClasses[variant];

  return (
    <div className="space-y-4">
      {title && (
        <span className="text-gray-700 font-medium">{title}</span>
      )}
      <div className={classes.container}>
        {options.map((option) => (
          <Button
            key={option.value}
            variant="ghost"
            size="sm"
            onClick={() => handleChange(option.value)}
            className={`${baseClasses} ${classes.button} ${
              selected === option.value ? classes.active : ""
            }`}
          >
            <span>{option.label}</span>
            {option.count && (
              <Badge 
                variant="secondary" 
                className={`ml-2 text-xs ${
                  selected === option.value 
                    ? "bg-white/20 text-white" 
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {option.count}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function FilterButtonsSample() {
  const regionOptions: FilterOption[] = [
    { value: "all", label: "Toutes les destinations", count: 25 },
    { value: "ile-de-france", label: "Île-de-France", count: 8 },
    { value: "rhone-alpes", label: "Auvergne-Rhône-Alpes", count: 6 },
    { value: "paca", label: "PACA", count: 4 },
    { value: "occitanie", label: "Occitanie", count: 7 }
  ];

  const priceOptions: FilterOption[] = [
    { value: "all", label: "Tous les prix" },
    { value: "0-30", label: "0€ - 30€" },
    { value: "30-50", label: "30€ - 50€" },
    { value: "50-100", label: "50€ - 100€" },
    { value: "100+", label: "100€ +" }
  ];

  const timeOptions: FilterOption[] = [
    { value: "all", label: "Tous les horaires" },
    { value: "morning", label: "Matin (6h-12h)" },
    { value: "afternoon", label: "Après-midi (12h-18h)" },
    { value: "evening", label: "Soir (18h-23h)" }
  ];

  return (
    <div className="space-y-8">
      <LabeledSection label="Filtres par Région (Buttons)">
        <div className="bg-gray-50 p-6 rounded-lg">
          <FilterButtons
            title="Filtrer par région :"
            options={regionOptions}
            defaultValue="all"
            variant="buttons"
            onChange={(value) => console.log("Region selected:", value)}
          />
        </div>
      </LabeledSection>

      <LabeledSection label="Filtres par Prix (Pills)">
        <div className="bg-white p-6 border border-gray-200 rounded-lg">
          <FilterButtons
            title="Filtrer par prix :"
            options={priceOptions}
            defaultValue="all"
            variant="pills"
            onChange={(value) => console.log("Price selected:", value)}
          />
        </div>
      </LabeledSection>

      <LabeledSection label="Filtres par Horaire (Tabs)">
        <div className="bg-white p-6 border border-gray-200 rounded-lg">
          <FilterButtons
            title="Filtrer par horaire :"
            options={timeOptions}
            defaultValue="all"
            variant="tabs"
            onChange={(value) => console.log("Time selected:", value)}
          />
        </div>
      </LabeledSection>

      <LabeledSection label="Filtres Multiples">
        <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
          <FilterButtons
            title="Région :"
            options={regionOptions}
            defaultValue="all"
            variant="pills"
          />
          <FilterButtons
            title="Prix :"
            options={priceOptions}
            defaultValue="all"
            variant="pills"
          />
          <FilterButtons
            title="Horaire :"
            options={timeOptions}
            defaultValue="all"
            variant="pills"
          />
        </div>
      </LabeledSection>
    </div>
  );
}
