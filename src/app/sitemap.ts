import type { MetadataRoute } from "next";
import { getIssues, getPhases } from "@/content/loaders";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();
  const phases = await getPhases();
  const issues = await getIssues();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/issues`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const phaseRoutes: MetadataRoute.Sitemap = phases.map((p) => ({
    url: `${base}/phases/${encodeURIComponent(p.slug)}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const issueRoutes: MetadataRoute.Sitemap = issues.map((i) => ({
    url: `${base}/issues/${encodeURIComponent(i.slug)}`,
    lastModified: new Date(i.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...phaseRoutes, ...issueRoutes];
}
