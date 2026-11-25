"use client";

import { useEffect } from "react";

export function CatalogWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) {
      return;
    }

    void navigator.serviceWorker.register("/sw.js").catch((error: unknown) => {
      console.warn("No se pudo preparar el catálogo sin conexión.", error);
    });
  }, []);

  return null;
}
