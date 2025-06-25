import { LabeledSection } from "./ui-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function CardSample() {
    return (
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cardData.map((card) => (
                <LabeledSection label={card.id} key={`c-${card.id}`}>
                    <Card className={card.className}>
                        <CardHeader>
                            <CardTitle className={card.titleClassName}>
                                {card.icon && <i className={card.icon}></i>}
                                {card.title}
                            </CardTitle>
                            {card.description && (
                                <CardDescription className={card.descriptionClassName}>
                                    {card.description}
                                </CardDescription>
                            )}
                        </CardHeader>
                        <CardContent>
                            <p className={card.contentClassName}>{card.content}</p>
                        </CardContent>
                    </Card>
                </LabeledSection>
            ))}
        </div>
    );
}

const cardData = [
    {
        id: "service-card",
        className: "service-card hover:transform hover:translate-y-[-5px] hover:shadow-lg transition-all duration-300 border border-gray-200",
        titleClassName: "text-transport-primary font-bold flex items-center gap-2",
        descriptionClassName: "text-gray-600",
        contentClassName: "text-gray-700",
        icon: "fas fa-rocket",
        title: "Service Card",
        description: "Card with hover effect like in transport design",
        content: "This is a service card with transport-inspired styling and hover animations."
    },
    {
        id: "destination-card",
        className: "destination-card hover:transform hover:translate-y-[-5px] hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100",
        titleClassName: "text-transport-accent font-bold",
        descriptionClassName: "text-gray-500",
        contentClassName: "text-gray-600",
        title: "Destination Card",
        description: "Card for destinations with enhanced hover",
        content: "This destination card features smooth hover transitions and shadow effects from the design."
    },
    {
        id: "basic-card",
        className: "border border-gray-200 shadow-sm",
        titleClassName: "text-gray-900 font-semibold",
        descriptionClassName: "text-gray-600",
        contentClassName: "text-gray-700",
        title: "Basic Card",
        description: "Simple card without special effects",
        content: "A simple card component with basic styling."
    },
    {
        id: "highlight-card",
        className: "border-2 border-transport-highlight bg-red-50 hover:bg-red-100 transition-colors duration-200",
        titleClassName: "text-transport-primary font-bold",
        descriptionClassName: "text-transport-accent",
        contentClassName: "text-gray-800",
        title: "Highlight Card",
        description: "Card with highlight border and background",
        content: "This card uses the highlight color from the transport design system."
    }
];
