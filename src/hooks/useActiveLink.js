"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const useActiveLink = () => {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState(pathname);

  useEffect(() => {
    setActiveHash(pathname);
  }, [pathname]); //apdate activeHash when pathname changes

  return activeHash;
};

export default useActiveLink;
