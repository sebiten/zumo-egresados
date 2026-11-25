"use client";

import { useSyncExternalStore } from "react";

const place = encodeURIComponent("Zummo Textil, Lerma 758, Salta, Argentina");
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${place}`;
const embedUrl = `https://www.google.com/maps?q=${place}&z=16&output=embed&hl=es`;

function subscribeToConnection(onChange: () => void) {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);

  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}

export function LocationMap() {
  const isOnline = useSyncExternalStore(
    subscribeToConnection,
    () => navigator.onLine,
    () => false,
  );

  return (
    <section className="section location" id="ubicacion" aria-labelledby="location-heading">
      <div className="location__copy">
        <p className="eyebrow">Zummo Textil</p>
        <h2 id="location-heading">Dónde encontrarnos</h2>
        <address className="location__address">
          <strong>Lerma 758</strong>
          <span>Salta Capital, Argentina</span>
        </address>
      </div>

      <div className="location__map">
        {isOnline ? (
          <iframe
            className="location__preview"
            src={embedUrl}
            title="Mapa de Zummo Textil en Salta"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
            aria-hidden="true"
          />
        ) : (
          <span className="location__preview location__preview--offline">
            El mapa requiere conexión a internet.
          </span>
        )}
        <a
          className="location__map-action"
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir la ubicación de Zummo Textil en Google Maps"
        >
          Abrir en Google Maps <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
