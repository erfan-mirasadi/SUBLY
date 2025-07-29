import Section from '@/src/components/section/Section'
import React from 'react'
import PlanSwitchTab from './PlanSwitchTab'

export default function PriceSection({params}) {
  return (
    <Section className="overflow-hidden" id="pricing">
    <div className="max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] relative z-2 flex flex-col items-center">
      <div className="relative w-full">
        <PlanSwitchTab params={params}/>
        {/* <StyleLines /> */}
      </div>
      <div className="cursor-pointer  flex justify-center mt-10">
        <a href="/pricing" className="text-xs font-code font-bold tracking-wider uppercase border-b ">See the full details</a>
      </div>
    </div>
  </Section>
  )
}
