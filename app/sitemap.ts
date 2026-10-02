import type { MetadataRoute } from "next";
import { site as doctor } from "@/config/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = doctor.seo.domain;
  const now = new Date();

  return [
    { url: `${base}/`,            lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/book`,        lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${base}/locations`,   lastModified: now, changeFrequency: "monthly", priority: 0.85 },

    { url: `${base}/privacy`,     lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${base}/disclaimer`,  lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
  ];
}
