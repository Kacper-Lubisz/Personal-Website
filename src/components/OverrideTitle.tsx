"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface OverrideTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function OverrideTitle({
  children,
  className,
}: OverrideTitleProps) {
  const router = useRouter();
  const [isCtrlAltPressed, setIsCtrlAltPressed] = useState(false);
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey) {
        setIsCtrlAltPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.ctrlKey || !e.altKey) {
        setIsCtrlAltPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleMouseDown = () => {
    if (!isCtrlAltPressed) return;

    pressTimerRef.current = setTimeout(() => {
      const url = new URL(window.location.href);
      url.searchParams.set("override", "true");
      router.push(url.pathname + url.search);
    }, 1000); // 1 second long press
  };

  const handleMouseUp = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ cursor: isCtrlAltPressed ? "pointer" : "default" }}
    >
      {children}
    </div>
  );
}
