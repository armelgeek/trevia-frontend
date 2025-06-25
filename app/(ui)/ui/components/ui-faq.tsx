"use client";

import { LabeledSection } from "./ui-section";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock,
  CreditCard,
  MapPin,
  Users,
  HelpCircle
} from "lucide-react";
import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags?: string[];
}

interface FAQProps {
  faqs: FAQItem[];
  variant?: "accordion" | "grid" | "searchable";
  showCategories?: boolean;
}

function FAQ({ faqs, variant = "accordion", showCategories = true }: FAQProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));
  
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchTerm === "" || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === null || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "réservation": return <CreditCard className="w-4 h-4" />;
      case "voyage": return <MapPin className="w-4 h-4" />;
      case "paiement": return <CreditCard className="w-4 h-4" />;
      case "compte": return <Users className="w-4 h-4" />;
      case "horaires": return <Clock className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  if (variant === "grid") {
    return (
      <div className="space-y-6">
        {showCategories && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Toutes les questions
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="flex items-center space-x-1"
              >
                {getCategoryIcon(category)}
                <span>{category}</span>
              </Button>
            ))}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFAQs.map(faq => (
            <Card key={faq.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 leading-tight">
                    {faq.question}
                  </h3>
                  <Badge variant="secondary" className="ml-2 flex-shrink-0">
                    {faq.category}
                  </Badge>
                </div>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                {faq.tags && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {faq.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "searchable") {
    return (
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher dans la FAQ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {showCategories && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Tout
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="flex items-center space-x-1"
              >
                {getCategoryIcon(category)}
                <span>{category}</span>
              </Button>
            ))}
          </div>
        )}
        
        <Accordion type="single" collapsible className="w-full">
          {filteredFAQs.map(faq => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center justify-between w-full pr-4">
                  <span>{faq.question}</span>
                  <Badge variant="secondary" className="ml-2">
                    {faq.category}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2">
                  <p className="text-gray-600 leading-relaxed mb-3">{faq.answer}</p>
                  {faq.tags && (
                    <div className="flex flex-wrap gap-1">
                      {faq.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {filteredFAQs.length === 0 && (
          <div className="text-center py-8">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucune question trouvée pour votre recherche.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {filteredFAQs.map(faq => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="text-left">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function FAQSample() {
  const sampleFAQs: FAQItem[] = [
    {
      id: "1",
      question: "Comment réserver un billet ?",
      answer: "Vous pouvez réserver votre billet directement sur notre site web en sélectionnant votre ville de départ, votre destination, et la date de voyage. Suivez ensuite les étapes de paiement sécurisé.",
      category: "Réservation",
      tags: ["réservation", "billet", "en ligne"]
    },
    {
      id: "2",
      question: "Puis-je modifier ou annuler ma réservation ?",
      answer: "Oui, vous pouvez modifier ou annuler votre réservation jusqu'à 2 heures avant le départ. Des frais peuvent s'appliquer selon les conditions tarifaires de votre billet.",
      category: "Réservation",
      tags: ["modification", "annulation", "frais"]
    },
    {
      id: "3",
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal, et les virements bancaires. Tous les paiements sont sécurisés par cryptage SSL.",
      category: "Paiement",
      tags: ["paiement", "carte bancaire", "paypal", "sécurité"]
    },
    {
      id: "4",
      question: "Que faire si j'arrive en retard ?",
      answer: "Si vous arrivez après l'heure de départ, votre billet sera considéré comme non utilisé. Nous vous conseillons d'arriver 15 minutes avant le départ pour l'enregistrement.",
      category: "Voyage",
      tags: ["retard", "départ", "enregistrement"]
    },
    {
      id: "5",
      question: "Y a-t-il du WiFi dans les bus ?",
      answer: "Oui, tous nos bus sont équipés du WiFi gratuit. Vous trouverez également des prises électriques pour recharger vos appareils durant le voyage.",
      category: "Voyage",
      tags: ["wifi", "gratuit", "prises", "confort"]
    },
    {
      id: "6",
      question: "Puis-je voyager avec des bagages ?",
      answer: "Chaque passager peut emporter gratuitement 1 bagage en soute (20kg max) et 1 bagage à main. Des bagages supplémentaires peuvent être ajoutés moyennant un supplément.",
      category: "Voyage",
      tags: ["bagages", "soute", "bagage à main", "poids"]
    },
    {
      id: "7",
      question: "Comment créer un compte ?",
      answer: "Cliquez sur 'S'inscrire' en haut de la page et remplissez le formulaire avec vos informations. Un compte vous permet de gérer vos réservations et de bénéficier d'offres exclusives.",
      category: "Compte",
      tags: ["inscription", "compte", "offres", "gestion"]
    },
    {
      id: "8",
      question: "À quelle heure puis-je récupérer mon billet ?",
      answer: "Les billets sont disponibles immédiatement après le paiement dans votre espace client. Vous pouvez les imprimer ou les présenter sur votre smartphone.",
      category: "Réservation",
      tags: ["billet", "impression", "smartphone", "espace client"]
    },
    {
      id: "9",
      question: "Que faire en cas de retard du bus ?",
      answer: "En cas de retard supérieur à 30 minutes, vous serez automatiquement informé par SMS/email. Nous proposons un dédommagement selon notre politique de ponctualité.",
      category: "Horaires",
      tags: ["retard", "information", "dédommagement", "ponctualité"]
    },
    {
      id: "10",
      question: "Les animaux sont-ils autorisés ?",
      answer: "Les chiens guides et d'assistance sont autorisés gratuitement. Pour les autres animaux, ils doivent voyager dans une cage de transport adaptée avec un supplément de 10€.",
      category: "Voyage",
      tags: ["animaux", "chien guide", "cage", "transport"]
    }
  ];

  return (
    <div className="space-y-8">
      <LabeledSection label="FAQ Accordéon Simple">
        <FAQ faqs={sampleFAQs.slice(0, 5)} variant="accordion" showCategories={false} />
      </LabeledSection>

      <LabeledSection label="FAQ avec Recherche et Filtres">
        <FAQ faqs={sampleFAQs} variant="searchable" />
      </LabeledSection>

      <LabeledSection label="FAQ en Grille">
        <FAQ faqs={sampleFAQs.slice(0, 6)} variant="grid" />
      </LabeledSection>

      <LabeledSection label="Section FAQ Complète">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions fréquemment posées
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trouvez rapidement les réponses à vos questions sur nos services de transport.
            </p>
          </div>

          <FAQ faqs={sampleFAQs} variant="searchable" />

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Vous ne trouvez pas votre réponse ?
              </h3>
              <p className="text-gray-600 mb-6">
                Notre équipe de support est là pour vous aider 24h/24 et 7j/7.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+33 1 23 45 67 89</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@trevia-transport.com</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat en direct</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </LabeledSection>
    </div>
  );
}
