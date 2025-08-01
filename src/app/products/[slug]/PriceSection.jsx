import Section from '@/src/components/section/Section'
import React from 'react'
import PlanSwitchTab from './PlanSwitchTab'
import PlanCards from './PlanCards';

export default function PriceSection({params ,data,plan,month=true,threeMonth=true,sixMonth=true,year=true,length}) {
  return (
    <Section className="overflow-hidden" id="pricing">
    <div className="max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] relative z-2 flex flex-col items-center">
      <div className="relative w-full">
        <PlanSwitchTab params={params} month={month} threeMonth={threeMonth} sixMonth={sixMonth} year={year} length={length}/>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10'>
          {data.product_entry.map((item)=>(<PlanCards key={item.id} data={{...item,title:data.title,image:data.image_small_url}} plan={plan}/>))}
        </div>
        {/* <StyleLines /> */}
      </div>
      <div className="cursor-pointer  flex justify-center mt-10">
        <a href="/pricing" className="text-xs font-code font-bold tracking-wider uppercase border-b ">See the full details</a>
      </div>
    </div>
  </Section>
  )
}
