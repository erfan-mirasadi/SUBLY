import React, { useRef, useState, useEffect } from "react";

export default function Accordion({ show, children }) {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (show && contentRef.current) {
      // اول maxHeight رو ست می‌کنیم تا transition فعال بشه
      requestAnimationFrame(() => {
        setMaxHeight(`${contentRef.current.scrollHeight}px`);
        setOpacity(1);
      });
    } else {
      // وقتی بسته میشه اول height رو میذاریم 0
      setMaxHeight("0px");
      setOpacity(0);
    }
  }, [show]);

  return (
    <div
      ref={contentRef}
      className="w-full transition-all duration-500 ease-in-out overflow-hidden"
      style={{
        maxHeight,
        opacity,
      }}
    >
      {children}
    </div>
  );
}
