import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';

const FILTERS = [
	{ label: 'Jour', value: 'day' },
	{ label: 'Mois', value: 'month' },
	{ label: 'Année', value: 'year' },
];

export interface DashboardPeriodFilterProps {
	value: 'day' | 'month' | 'year';
	onChange: (value: 'day' | 'month' | 'year') => void;
}

export default function DashboardPeriodFilter({ value, onChange }: DashboardPeriodFilterProps) {
	return (
		<div className="flex flex-row justify-between gap-2 mb-4" role="radiogroup" aria-label="Filtrer par période">
			<div className="flex flex-col mb-2">
				<div className="flex items-center gap-3 mb-1">
					<CalendarDays className="w-8 h-8 text-primary" aria-hidden />
					<h3 className="text-3xl  font-bold">{"Vue d'ensemble"}</h3>
				</div>
				<p className="text-muted-foreground text-base ml-1">Statistiques et synthèse de l&rsquo;activité sur la période sélectionnée.</p>
			</div>
			<div className="flex gap-2">
				{FILTERS.map((filter) => (
					<Button
						key={filter.value}
						variant={value === filter.value ? 'primary' : 'outline'}
						size="sm"
						aria-checked={value === filter.value}
						aria-label={`Filtrer par ${filter.label.toLowerCase()}`}
						role="radio"
						tabIndex={0}
						onClick={() => onChange(filter.value as 'day' | 'month' | 'year')}
					>
						{filter.label}
					</Button>
				))}
			</div>
		</div>
	);
}
