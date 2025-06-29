import { LabeledSection } from "./ui-section";
import { Grid } from '@/shared/components/atoms/ui/grid';

export function GridSample() {
    return (
        <div className="space-y-8">
            <LabeledSection label="Grid 3 Columns">
                <Grid cols={3} gap="lg">
                    <div className="bg-gray-100 h-24 rounded flex items-center justify-center">Item 1</div>
                    <div className="bg-gray-100 h-24 rounded flex items-center justify-center">Item 2</div>
                    <div className="bg-gray-100 h-24 rounded flex items-center justify-center">Item 3</div>
                    <div className="bg-gray-100 h-24 rounded flex items-center justify-center">Item 4</div>
                    <div className="bg-gray-100 h-24 rounded flex items-center justify-center">Item 5</div>
                    <div className="bg-gray-100 h-24 rounded flex items-center justify-center">Item 6</div>
                </Grid>
            </LabeledSection>

            <LabeledSection label="Grid 4 Columns">
                <Grid cols={4} gap="md">
                    <div className="bg-primary/10 h-16 rounded flex items-center justify-center text-primary font-bold">1</div>
                    <div className="bg-primary/10 h-16 rounded flex items-center justify-center text-primary font-bold">2</div>
                    <div className="bg-primary/10 h-16 rounded flex items-center justify-center text-primary font-bold">3</div>
                    <div className="bg-primary/10 h-16 rounded flex items-center justify-center text-primary font-bold">4</div>
                </Grid>
            </LabeledSection>

            <LabeledSection label="Grid 2 Columns">
                <Grid cols={2} gap="xl">
                    <div className="bg-accent/10 h-32 rounded flex items-center justify-center text-accent font-bold">Large Item A</div>
                    <div className="bg-accent/10 h-32 rounded flex items-center justify-center text-accent font-bold">Large Item B</div>
                </Grid>
            </LabeledSection>
        </div>
    );
}
