"use client";

import { useCallback, useState } from "react";
import { SplashScreen } from "@/components/splash/SplashScreen";

interface SplashGateProps {
  restaurantName: string;
  tagline: string;
  children: React.ReactNode;
}

export function SplashGate({ restaurantName, tagline, children }: SplashGateProps) {
  const [showSplash, setShowSplash] = useState(true);

  const handleComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {!showSplash && children}
      {showSplash && (
        <SplashScreen
          restaurantName={restaurantName}
          tagline={tagline}
          onComplete={handleComplete}
        />
      )}
    </>
  );
}
