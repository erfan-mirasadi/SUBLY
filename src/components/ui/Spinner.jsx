import React from "react";
import { PiSpinnerGapThin } from "react-icons/pi";

export default function Spinner({size=30}) {
  return (
    <PiSpinnerGapThin size={size} className="animate-spin text-white text-[24px]" />
  );
}
