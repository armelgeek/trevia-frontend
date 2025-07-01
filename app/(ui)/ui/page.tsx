import { Typography } from '@/shared/components/atoms/ui/typography'
import React from 'react'
import { Section } from './components/ui-section'
import { Sample } from './components/ui-sample';

export default function Page() {
    return (
        <div className="px-4">
            <div className="w-full container mx-auto px-12 py-20 grid gap-12">
                <div className="flex items-center justify-between">
                    <Typography as="h1">Notre design system</Typography>
                </div>
                <Section title="Logo Trevia">
                   <Sample.Logo />
                </Section>
                <Section title="Buttons">
                   <Sample.Button />
                </Section>

                <Section title="Cards">
                   <Sample.Card />
                </Section>

                <Section title="Navigation">
                   <Sample.Navigation />
                </Section>

                <Section title="Service Cards">
                   <Sample.ServiceCard />
                </Section>

                <Section title="Hero Sections">
                   <Sample.Hero />
                </Section>

                <Section title="Statistics">
                   <Sample.Stats />
                </Section>

                <Section title="Seat Selection">
                   <Sample.Seat />
                </Section>

                <Section title="Grid System">
                   <Sample.Grid />
                </Section>

                <Section title="Complete Transport Page">
                   <Sample.TransportPage />
                </Section>



                <Section title="Contact Forms">
                   <Sample.ContactForm />
                </Section>

                <Section title="Testimonials">
                   <Sample.Testimonials />
                </Section>

                <Section title="Footer">
                   <Sample.Footer />
                </Section>

                <Section title="User Profile">
                   <Sample.UserProfile />
                </Section>

                <Section title="User Reservations">
                   <Sample.UserReservations />
                </Section>

                <Section title="Checkout Process">
                   <Sample.Checkout />
                </Section>

                <Section title="Notifications & Alerts">
                   <Sample.Notifications />
                </Section>

                <Section title="Loading States">
                   <Sample.LoadingStates />
                </Section>

                <Section title="Search & Autocomplete">
                   <Sample.Search />
                </Section>

                {/* Admin Design System */}
                <div className="mt-16 pt-16 border-t">
                    <Typography as="h2" className="mb-12">Design System Admin</Typography>
                    <Section title="🚀 Admin Generator Ultra-Simplifié">
                        <Sample.AdminGenerator />
                    </Section>
                    <Section title="Admin Statistics">
                        <Sample.AdminStats />
                    </Section>
                    <Section title="Admin Tables">
                        <Sample.AdminTable />
                    </Section>
                    <Section title="Admin Forms">
                        <Sample.AdminForms />
                    </Section>
                    <Section title="Admin Dashboard">
                        <Sample.AdminDashboard />
                    </Section>
                    <Section title="Admin Settings">
                        <Sample.AdminSettings />
                    </Section>
                    <Section title="Admin Audit Log">
                        <Sample.AdminAuditLog />
                    </Section>
                    <Section title="Admin Resource List">
                        <Sample.AdminResourceList />
                    </Section>
                </div>
            </div>
        </div>
    )
}
