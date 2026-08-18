import { NextResponse } from "next/server";

type SeoIssue = {
  type: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = body?.url;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Website URL is required." },
        { status: 400 }
      );
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Please provide a valid website URL." },
        { status: 400 }
      );
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json(
        { error: "Only HTTP and HTTPS URLs are supported." },
        { status: 400 }
      );
    }

    const response = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent": "SEO-Audit-Dashboard/1.0",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Unable to fetch the website. Server returned ${response.status}.`,
        },
        { status: 502 }
      );
    }

    const html = await response.text();

    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const descriptionMatch = html.match(
      /<meta[^>]+name=["']description["'][^>]*>/i
    );
    const viewportMatch = html.match(
      /<meta[^>]+name=["']viewport["'][^>]*>/i
    );
    const canonicalMatch = html.match(
      /<link[^>]+rel=["']canonical["'][^>]*>/i
    );

    const h1Matches = html.match(/<h1\b[^>]*>/gi) || [];
    const imageMatches = html.match(/<img\b[^>]*>/gi) || [];

    const imagesWithoutAlt = imageMatches.filter(
      (image) => !/\balt\s*=/i.test(image)
    );

    const issues: SeoIssue[] = [];

    if (!titleMatch || !titleMatch[1].trim()) {
      issues.push({
        type: "critical",
        title: "Missing page title",
        description:
          "The page does not contain a meaningful HTML title element.",
      });
    } else {
      const titleLength = titleMatch[1].trim().length;

      if (titleLength < 30 || titleLength > 60) {
        issues.push({
          type: "medium",
          title: "Title length needs improvement",
          description: `The title contains ${titleLength} characters. Consider using a concise title around 30–60 characters.`,
        });
      }
    }

    if (!descriptionMatch) {
      issues.push({
        type: "high",
        title: "Missing meta description",
        description:
          "The page does not contain a meta description that can help search engines understand the page.",
      });
    }

    if (h1Matches.length === 0) {
      issues.push({
        type: "high",
        title: "Missing H1 heading",
        description:
          "The page does not contain an H1 heading that clearly identifies its primary topic.",
      });
    } else if (h1Matches.length > 1) {
      issues.push({
        type: "medium",
        title: "Multiple H1 headings",
        description:
          `The page contains ${h1Matches.length} H1 headings. Review the heading structure for a clear primary heading.`,
      });
    }

    if (imagesWithoutAlt.length > 0) {
      issues.push({
        type: "medium",
        title: "Images missing alt attributes",
        description:
          `${imagesWithoutAlt.length} image(s) do not have an alt attribute.`,
      });
    }

    if (!viewportMatch) {
      issues.push({
        type: "medium",
        title: "Missing viewport metadata",
        description:
          "The page does not contain a viewport meta tag, which can affect mobile rendering.",
      });
    }

    if (!canonicalMatch) {
      issues.push({
        type: "low",
        title: "Missing canonical URL",
        description:
          "The page does not declare a canonical URL.",
      });
    }

    const critical = issues.filter((issue) => issue.type === "critical").length;
    const high = issues.filter((issue) => issue.type === "high").length;
    const medium = issues.filter((issue) => issue.type === "medium").length;
    const low = issues.filter((issue) => issue.type === "low").length;

    const issueCount = issues.length;

    const score = Math.max(
      0,
      100 - critical * 20 - high * 12 - medium * 6 - low * 3
    );

    const recommendations = issues.length;

    return NextResponse.json({
      url: parsedUrl.toString(),
      score,
      issues: issueCount,
      recommendations,
      critical,
      high,
      medium,
      low,
      details: {
        title: titleMatch?.[1]?.trim() || null,
        hasMetaDescription: Boolean(descriptionMatch),
        h1Count: h1Matches.length,
        imageCount: imageMatches.length,
        imagesWithoutAlt: imagesWithoutAlt.length,
        hasViewport: Boolean(viewportMatch),
        hasCanonical: Boolean(canonicalMatch),
      },
      issueDetails: issues,
    });
  } catch (error) {
    console.error("SEO analysis failed:", error);

    return NextResponse.json(
      {
        error: "An unexpected error occurred while analyzing the website.",
      },
      { status: 500 }
    );
  }
}