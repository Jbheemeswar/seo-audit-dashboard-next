import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const report = body?.report;

    if (!report) {
      return NextResponse.json(
        { error: "SEO report is required." },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert SEO consultant.

Analyze the following SEO audit report and provide practical recommendations.

IMPORTANT:
- Only use information contained in the report.
- Do not invent SEO problems.
- Prioritize the most important improvements.
- Explain recommendations in simple language.
- If there are no issues, explain why the website appears healthy and suggest general best practices.

Website:
${report.url}

SEO Score:
${report.score}

Issues:
${report.issues}

Recommendations:
${report.recommendations}

Critical:
${report.critical}

High:
${report.high}

Medium:
${report.medium}

Low:
${report.low}

SEO Details:
${JSON.stringify(report.details ?? {}, null, 2)}

Detected Issues:
${JSON.stringify(report.issueDetails ?? [], null, 2)}

Return your response using these sections:

Overall Assessment

Priority Recommendations

Action Plan

Next Steps
`;

    let response;

    // Gemini 3.6 Flash is the model currently recommended
    // by the API error returned for this account.
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(
          `Gemini request attempt ${attempt}/${maxAttempts}...`
        );

        response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
        });

        console.log("Gemini request succeeded.");

        break;
      } catch (error: any) {
        const status = error?.status;

        console.error(
          `Gemini attempt ${attempt} failed:`,
          error
        );

        // Only retry temporary server/capacity errors.
        if (status !== 503 || attempt === maxAttempts) {
          throw error;
        }

        // Exponential backoff:
        // 2 seconds → 4 seconds
        const delay = 2000 * Math.pow(2, attempt - 1);

        console.log(
          `Waiting ${delay}ms before retrying...`
        );

        await sleep(delay);
      }
    }

    if (!response) {
      throw new Error("Gemini did not return a response.");
    }

    return NextResponse.json({
      advice: response.text,
    });
  } catch (error) {
    console.error("Gemini AI advisor error:", error);

    return NextResponse.json(
      {
        error:
          "The AI advisor is temporarily unavailable. Please try again in a moment.",
      },
      { status: 503 }
    );
  }
}