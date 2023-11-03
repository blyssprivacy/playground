export const metadata = {
  title: 'Blyss',
  description: 'The platform for confidential AI.'
};

import Hero from '@/components/hero'
import Clients from '@/components/clients'
import Features from '@/components/features'
import Features02 from '@/components/features-02'
import Examples from '@/components/examples';
import UseCases from '@/components/usecases';
import Features03 from '@/components/features-03';
import Features04 from '@/components/features-04';
import Pricing from '@/components/pricing';
import Cta from '@/components/cta';

export default function Home() {
  return (
    <>
      <Hero />
      {/* <Clients /> */}
      <Features />
      <Examples />
      <Features02 />
      <UseCases />

      {/* <Features03 /> */}
      {/* <Features04 /> */}
      {/* <Pricing /> */}
      <Cta />
    </>
  );
}
