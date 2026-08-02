import { SeoReport } from "@/types/seo";

export async function analyzeWebsite(
  url: string
): Promise<SeoReport> {

  await new Promise((resolve) =>
    setTimeout(resolve, 1500)
  );

  return {
    url,
    score: 87,
    issues: 12,
    recommendations: 8,
    critical: 2,
    high: 4,
    medium: 5,
    low: 3,
  };
}