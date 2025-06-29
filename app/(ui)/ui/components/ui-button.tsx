import { LabeledSection } from "./ui-section";
import { Button } from '@/shared/components/atoms/ui/button';

export function ButtonSample() {
    return (
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {btnData.map((btn) => (
                <LabeledSection label={btn.id} key={`b-${btn.id}`}>
                    <Button variant={btn.variant} size={btn.size}>
                        {btn.label}
                    </Button>
                </LabeledSection>
            ))}
        </div>
    );
}

const btnData = [
    {
        id: "primary normal",
        variant: "primary" as const,
        size: "lg" as const,
        label: "Primary Button",
    },
    {
        id: "default normal",
        variant: "default" as const,
        size: "lg" as const,
        label: "Default Button",
    },
    {
        id: "secondary normal",
        variant: "secondary" as const,
        size: "lg" as const,
        label: "Secondary Button",
    },
    {
        id: "destructive normal",
        variant: "destructive" as const,
        size: "sm" as const,
        label: "Destructive Button",
    },
    {
        id: "outline normal",
        variant: "outline" as const,
        size: "sm" as const,
        label: "Outline Button",
    },
    {
        id: "ghost normal",
        variant: "ghost" as const,
        size: "lg" as const,
        label: "Ghost Button",
    },
];