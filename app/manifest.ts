import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bunfire Burger & Grill",
    short_name: "Bunfire",
    start_url: "/",
    display: "standalone",
    background_color: "#FBE6D6",
    theme_color: "#2B4A42",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
