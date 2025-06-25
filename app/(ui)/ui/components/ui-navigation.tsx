import { LabeledSection } from "./ui-section";

export function NavigationSample() {
    return (
        <div className="max-w-5xl space-y-6">
            <LabeledSection label="Transport Navigation">
                <nav className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-8">
                                <div className="text-transport-primary font-bold text-xl font-saira">
                                    TREVIA Transport
                                </div>
                                <div className="hidden md:flex space-x-6">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.id}
                                            href="#"
                                            className={`nav-link ${link.active ? 'active' : ''} px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-transport-primary`}
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </LabeledSection>

            <LabeledSection label="Hero Text Example">
                <div className="bg-gradient-to-r from-transport-primary to-transport-accent p-8 rounded-lg">
                    <h1 className="hero-text text-4xl font-bold text-white mb-4 font-saira">
                        Voyagez vers les étoiles
                    </h1>
                    <p className="text-white/90 text-lg">
                        Découvrez nos destinations cosmiques avec un style inspiré du design transport.
                    </p>
                </div>
            </LabeledSection>
        </div>
    );
}

const navLinks = [
    {
        id: "home",
        label: "Accueil",
        active: true
    },
    {
        id: "destinations",
        label: "Destinations",
        active: false
    },
    {
        id: "horaires",
        label: "Horaires",
        active: false
    },
    {
        id: "reservations",
        label: "Réservations",
        active: false
    },
    {
        id: "contact",
        label: "Contact",
        active: false
    }
];
