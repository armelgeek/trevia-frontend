import { Button } from '@/shared/components/atoms/ui/button';
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
			<div className="flex items-center gap-2">
				<h3 className="text-3xl text-primary font-bold mb-1">{"Vue d'ensemble"}</h3>
				<CalendarDays className="w-7 h-7 text-primary/80" aria-hidden />
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
