"use client";

import { useEffect, useState } from "react";

export function useIdleMount(timeoutMs = 1500) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(() => setMounted(true), {
        timeout: timeoutMs,
      });

      return () => window.cancelIdleCallback(idleId);
    }

    const timerId = window.setTimeout(() => setMounted(true), 120);

    return () => window.clearTimeout(timerId);
  }, [timeoutMs]);

  return mounted;
}
