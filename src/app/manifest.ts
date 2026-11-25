import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Zummo Textil | Ropa de Egresados",
    short_name: "Zummo",
    lang: "es",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8f3ec",
    theme_color: "#f8f3ec",
    icons: [
      { src: "/icons/zummo-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/zummo-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
