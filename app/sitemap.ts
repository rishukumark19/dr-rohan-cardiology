import type { MetadataRoute } from "next";
import { doctor } from "@/config/doctor";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = doctor.seo.domain;
  const now = new Date();

  return [
    { url: `${base}/`,            lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/book`,        lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${base}/locations`,   lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/faq`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/resources`,   lastModified: now, changeFrequency: "weekly",  priority: 0.75 },
    { url: `${base}/reviews`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/preparation`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/appointment`, lastModified: now, changeFrequency: "weekly",  priority: 0.5 },
    { url: `${base}/privacy`,     lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${base}/disclaimer`,  lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
  ];
}
