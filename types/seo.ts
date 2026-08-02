export interface SeoReport {
  url: string;
  score: number;
  issues: number;
  recommendations: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}