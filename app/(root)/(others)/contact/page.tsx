"use client";
import React from 'react';
import { ContactForm } from '../../../../shared/components/organisms/contact-form';
import { Section } from '@/shared/components/atoms/ui/section';

export default function Home() {
  return (
   <Section
      title="Contactez-nous"
      subtitle="Nous sommes là pour vous aider"
      backgroundVariant="white"
    >
          <ContactForm
            variant="detailed"
            onSubmit={(data) => console.log("Contact form data:", data)}
          />
   </Section>
  );
}
