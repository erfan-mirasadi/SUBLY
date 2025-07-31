import React, { useEffect, useState } from 'react'

export default function Timer() {
    const [animArr, setAnimArr] = useState([false, false, false, false, false]);
    const TIMER_SECONDS = 120;
    const [prevDigits, setPrevDigits] = useState(["0", "2", ":", "0", "0"]);
    const [secondsLeft, setSecondsLeft] = useState(null);
    useEffect(() => {
        setSecondsLeft(TIMER_SECONDS);
      }, []);
    const onTimeout = () => {
        console.log("timeout");
    }
      // Timer logic: decrease secondsLeft every second (only if timer started)
      useEffect(() => {
        if (secondsLeft === null) return;
        if (secondsLeft === 0) {
          onTimeout && onTimeout();
          return;
        }
        const timer = setInterval(() => {
          setSecondsLeft((s) => s - 1);
        }, 1000);
        return () => clearInterval(timer);
      }, [secondsLeft, onTimeout]);
    
      // Calculate timer digits (mm:ss as array)
      const min =
        secondsLeft !== null
          ? Math.floor(secondsLeft / 60)
              .toString()
              .padStart(2, "0")
          : "00";
      const sec =
        secondsLeft !== null
          ? (secondsLeft % 60).toString().padStart(2, "0")
          : "00";
      const timerArray = [min[0], min[1], ":", sec[0], sec[1]];
    
      // Animation: Only animate the digit that changes
      useEffect(() => {
        if (secondsLeft === null) return;
        let changed = [false, false, false, false, false];
        for (let i = 0; i < 5; i++) {
          if (timerArray[i] !== prevDigits[i]) {
            changed[i] = true;
          }
        }
        setAnimArr(changed);
        setPrevDigits(timerArray);
        // Remove animation class after 500ms
        const timeout = setTimeout(() => {
          setAnimArr([false, false, false, false, false]);
        }, 500);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line
      }, [secondsLeft]);
  return (
    <div className="flex gap-1 justify-center items-center">
    {timerArray.map((digit, idx) =>
      digit === ":" ? (
        <span
          key={idx}
          className="text-base font-bold font-code text-[#f5f5f5] mx-0.5 select-none"
        >
          :
        </span>
      ) : (
        <div
          key={idx}
          className={`w-9 h-10 flex items-center justify-center bg-[#0E0C15]/60 border-[1px] border-gray-300/40 rounded-md shadow text-[rgb(195,184,193)] text-base font-bold font-code select-none transition-all duration-300 ${
            animArr[idx] ? "animate-fade-scale" : ""
          }`}
        >
          {digit}
        </div>
      )
    )}
          <style jsx>{`
        @keyframes fadeScale {
          0% {
            opacity: 0;
            transform: scale(1.3);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-scale {
          animation: fadeScale 0.5s;
        }
      `}</style>
  </div>
  )
}
