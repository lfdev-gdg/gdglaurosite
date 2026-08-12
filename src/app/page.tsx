import { Navbar } from '@/components/organisms/navbar'
import HeroSection from '@/components/organisms/hero-section'
import InitiativesSection from '@/components/organisms/initiatives-section'
import { SocialTechSection } from '@/components/organisms/social-tech-section'
import { OrganizersSection } from '@/components/organisms/organizers-section'
import { AISection } from '@/components/organisms/ai-section'
import { TimelineSection } from '@/components/organisms/timeline-section'
import { JobsSection } from '@/components/organisms/jobs-section'
import { ContactSection } from '@/components/organisms/contact-section'

import { Footer } from '@/components/organisms/footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <InitiativesSection />
        <SocialTechSection />
        <OrganizersSection />
        <AISection />
        <TimelineSection />
        <JobsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
