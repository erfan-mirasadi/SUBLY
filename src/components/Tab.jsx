// "use client";

// import { useState } from "react";

// function Tab({ list }) {
//   const [activeTab, setActiveTab] = useState(0);
//   return (
//     <div className=" flex flex-col justify-start">
//       <div className="relative  py-2 mb-4">
//         <div className="w-full flex">
//           {list.map((item, index) => (
//             <span
//               key={item.id}
//               onClick={() => setActiveTab(index)}
//               className={`px-3 flex justify-center w-[130px] text-center text-nowrap cursor-pointer select-none ${
//                 activeTab === index ? "text-[#f59e0b]" : "text-white"
//               }`}
//             >
//               {item.title}
//             </span>
//           ))}
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 w-full bg-white h-[2px]">
//           <span
//             style={{
//               position: "absolute",
//               left: 0,
//               top: 0,
//               height: "2px",
//               width: `${100 / list.length}%`,
//               backgroundColor: "#f59e0b",
//               transform: `translateX(${activeTab * 100}%)`,
//             }}
//             className="duration-200"
//           />
//         </div>
//       </div>
//       {list.find((_, index) => index === activeTab).component}
//     </div>
//   );
// }

// export default Tab;
