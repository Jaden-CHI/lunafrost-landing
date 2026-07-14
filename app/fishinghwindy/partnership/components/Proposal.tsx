'use client'

import Nav from './Nav'
import Hero from './sections/Hero'
import Summary from './sections/Summary'
import ServiceIntro from './sections/ServiceIntro'
import CoreAssets from './sections/CoreAssets'
import Journey from './sections/Journey'
import PartnerGroups from './sections/PartnerGroups'
import PartnerScenarios from './sections/PartnerScenarios'
import RevenueModel from './sections/RevenueModel'
import TechTrust from './sections/TechTrust'
import Roadmap from './sections/Roadmap'
import ExpectedEffects from './sections/ExpectedEffects'
import About from './sections/About'
import NextStep from './sections/NextStep'
import GradientBar from './ui/GradientBar'

export default function Proposal() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Summary />
        <ServiceIntro />
        <CoreAssets />
        <Journey />
        <PartnerGroups />
        <PartnerScenarios />
        <RevenueModel />
        <TechTrust />
        <Roadmap />
        <ExpectedEffects />
        <About />
        <NextStep />
      </main>

      <footer className="bg-navy py-10 text-center text-white">
        <div className="fw-container">
          <p className="text-[14px] font-bold">© 2026 Lunafrost Inc. All rights reserved.</p>
          <p className="mt-2 text-[13px] text-white/60">
            Fishing Windy by Lunafrost · moonyth.contact@gmail.com ·{' '}
            <a href="https://moonyth.app" target="_blank" rel="noreferrer" className="text-sky hover:underline">
              moonyth.app
            </a>
          </p>
          <a
            href="https://apps.apple.com/kr/app/fishing-windy/id6780916105"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-full border border-white/25 px-5 py-2 text-[13px] font-bold text-white/90 transition hover:border-gold hover:text-gold"
          >
             App Store에서 보기
          </a>
        </div>
      </footer>
      <GradientBar />
    </>
  )
}
