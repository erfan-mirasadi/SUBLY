import Link from "next/link";
import React from "react";
import SelectTab from "./SelectTab";

export default function PlanSwitchTab({
  month = true,
  threeMonth = true,
  sixMonth = true,
  year = true,
  length = 4,
  params,
}) {
    const data = [...(month ? [{plan:1,title:'۱ ماهه'}] : []),...(threeMonth ? [{plan:3,title:'۳ ماهه'}] : []),...(sixMonth ? [{plan:6,title:'۶ ماهه'}] : []),...(year ? [{plan:12,title:'۱ ساله'}] : [])]
  return (
    <div className="w-full max-w-[500px] mx-auto rounded-lg bg-amber-500  p-2">
      <div className="w-full flex items-center justify-center bg-yellow-500 relative">
        <SelectTab length={length} />
        {data.map((item,index)=>(
          <Link
            key={item.plan}
            href={`/products/${params}/?index=${index}&plan=${item.plan}`}
            scroll={false}
            dir="rtl"
            className={` border h-[70px] text-center flex justify-center items-center bg-red-500`}
            style={{ width: `calc(${100 / length}%)` }}
          >
                <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
