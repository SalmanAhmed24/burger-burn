import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bunfire.example";
  const pages: [string, number][] = [["", 1], ["/menu", 0.9], ["/locations", 0.8], ["/how-we-cook", 0.6]];
  return pages.map(([path, priority]) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "weekly", priority }));
}
