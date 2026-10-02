import { MetadataRoute } from "next";
import { site as doctor } from "@/config/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/book/confirmation"],
    },
    sitemap: `${doctor.seo.domain}/sitemap.xml`,
  };
}
